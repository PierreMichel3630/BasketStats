import { Navigate } from "react-router-dom";
import { PageAddStatsGame } from "src/pages/PageAddStatsGame";
import { PageStatsGame } from "src/pages/PageStatsGame";
import { SearchPage } from "src/pages/SearchPage";
import { GameTeamPage } from "src/pages/team/GameTeamPage";
import { HomeTeamPage } from "src/pages/team/HomeTeamPage";
import { PlayersTeamPage } from "src/pages/team/PlayersTeamPage";
import { StatsTeamPage } from "src/pages/team/StatsTeamPage";
import { TeamPage } from "src/pages/team/TeamPage";

export const CommunRoutes = [
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/team/:id",
    element: <TeamPage />,
    children: [
      {
        path: "/team/:id",
        element: <Navigate to="home" replace />,
      },
      {
        path: "/team/:id/home",
        element: <HomeTeamPage />,
      },
      {
        path: "/team/:id/games",
        element: <GameTeamPage />,
      },
      {
        path: "/team/:id/players",
        element: <PlayersTeamPage />,
      },
      {
        path: "/team/:id/stats",
        element: <StatsTeamPage />,
      },
    ],
  },
  {
    path: "/game/:id/addstats",
    element: <PageAddStatsGame />,
  },
  {
    path: "/game/:id/stats",
    element: <PageStatsGame />,
  },
];
