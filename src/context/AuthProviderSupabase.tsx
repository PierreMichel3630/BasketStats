import {
  AuthError,
  AuthTokenResponse,
  User,
  UserResponse,
} from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import {
  passwordReset,
  signInWithEmail,
  signOut,
  updatePassword,
} from "src/api/authentification";
import { getProfil } from "src/api/profile";
import { getMyRightTeam } from "src/api/right";
import { supabase } from "src/api/supabaseClient";
import { Profile } from "src/models/Profile";
import { RightTeam } from "src/models/Right";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const AuthContext = createContext<{
  user: User | null;
  profile: Profile | null;
  rightTeam: Array<RightTeam>;
  setProfile: (value: Profile) => void;
  login: (email: string, password: string) => Promise<AuthTokenResponse>;
  logout: () => Promise<{ error: AuthError | null }>;
  passwordReset: (
    email: string
  ) => Promise<{ data: {}; error: null } | { data: null; error: AuthError }>;
  updatePassword: (password: string) => Promise<UserResponse>;
}>({
  user:
    localStorage.getItem("user") !== null
      ? (JSON.parse(localStorage.getItem("user")!) as User)
      : null,
  profile: null,
  rightTeam: [],
  setProfile: (value: Profile) => {},
  login: (email: string, password: string) => signInWithEmail(email, password),
  logout: () => signOut(),
  passwordReset: (email: string) => passwordReset(email),
  updatePassword: (password: string) => updatePassword(password),
});

export const useAuth = () => useContext(AuthContext);

const login = (email: string, password: string) =>
  signInWithEmail(email, password);

const logout = () => signOut();

export const AuthProviderSupabase = ({ children }: Props) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [rightTeam, setRightTeam] = useState<Array<RightTeam>>([]);
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user") !== null
      ? (JSON.parse(localStorage.getItem("user")!) as User)
      : null
  );
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    getProfilUser();
    getRight();
  }, [user]);

  const getProfilUser = async () => {
    if (user !== null) {
      const { data } = await getProfil(user.id);
      setProfile(data as Profile);
    }
  };

  const getRight = () => {
    if (user !== null) {
      getMyRightTeam(user.id).then((res) => {
        if (res.data) {
          setRightTeam(res.data as Array<RightTeam>);
        }
      });
    }
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        setAuth(false);
      } else if (event === "SIGNED_IN") {
        setUser(session !== null ? session.user : null);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
        setRightTeam([]);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        profile,
        setProfile,
        user,
        login,
        logout,
        passwordReset,
        updatePassword,
        rightTeam,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
