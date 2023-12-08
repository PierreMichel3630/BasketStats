import { Navigate } from "react-router-dom";
import { PageAddStatsGameV3 } from "src/pages/PageAddStatsGameV3";
import { PageStatsGame } from "src/pages/PageStatsGame";
import { ComparePlayerPage } from "src/pages/player/ComparePlayerPage";
import { GamesPlayerPage } from "src/pages/player/GamesPlayerPage";
import { PlayerPage } from "src/pages/player/PlayerPage";
import { ProfilPlayerPage } from "src/pages/player/ProfilPlayerPage";
import { ShootsPlayerPage } from "src/pages/player/ShootsPlayerPage";
import { StatsPlayerPage } from "src/pages/player/StatsPlayerPage";
import { SearchPage } from "src/pages/SearchPage";
import { CompareTeamPage } from "src/pages/team/CompareTeamPage";
import { GameTeamPage } from "src/pages/team/GameTeamPage";
import { HomeTeamPage } from "src/pages/team/HomeTeamPage";
import { PlayersTeamPage } from "src/pages/team/PlayersTeamPage";
import { ShootsTeamPage } from "src/pages/team/ShootsTeamPage";
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
        path: "/team/:id/shoots",
        element: <ShootsTeamPage />,
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
      {
        path: "/team/:id/compare",
        element: <CompareTeamPage />,
      },
    ],
  },
  {
    path: "/game/:id/addstatsv2",
    element: <PageAddStatsGameV3 />,
  },
  {
    path: "/game/:id/stats",
    element: <PageStatsGame />,
  },
  {
    path: "/player/:id",
    element: <PlayerPage />,
    children: [
      {
        path: "/player/:id",
        element: <Navigate to="profil" replace />,
      },
      {
        path: "/player/:id/profil",
        element: <ProfilPlayerPage />,
      },
      {
        path: "/player/:id/shoots",
        element: <ShootsPlayerPage />,
      },
      {
        path: "/player/:id/stats",
        element: <StatsPlayerPage />,
      },
      {
        path: "/player/:id/compare",
        element: <ComparePlayerPage />,
      },
      {
        path: "/player/:id/games",
        element: <GamesPlayerPage />,
      },
    ],
  },
];
