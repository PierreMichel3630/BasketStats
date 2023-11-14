import { useRoutes } from "react-router-dom";
import { MainRoutes } from "./mainRoutes";
import { Home } from "src/pages/Home";
import { CommunRoutes } from "./communRoutes";

export default function ThemeRoutes() {
  const HomeRoute = {
    path: "/",
    element: <Home />,
    children: [...CommunRoutes],
  };

  return useRoutes([HomeRoute, ...MainRoutes]);
}
