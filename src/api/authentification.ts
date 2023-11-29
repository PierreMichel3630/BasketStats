import { supabase } from "./supabaseClient";

const URLPROD = "https://basketstats-853f3.web.app"; //"http://localhost:5173"; //

export const signUpWithGoogle = () =>
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: URLPROD },
  });

export const signUpWithEmail = (
  email: string,
  password: string,
  username: string,
  avatar: number
) =>
  supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        avatar,
      },
    },
  });

export const signInWithEmail = (email: string, password: string) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const updatePassword = (password: string) =>
  supabase.auth.updateUser({ password: password });

export const signOut = () => supabase.auth.signOut();

export const passwordReset = (email: string) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${URLPROD}/resetpassword`,
  });
