import { Grid, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import {
  getStatsPlayerByGameId,
  insertStatsPlayer,
  updateStatsPlayer,
} from "src/api/statistique";
import { Game } from "src/models/Game";
import { Player } from "src/models/Player";
import {
  StatsPlayer,
  StatsPlayerInsert,
  StatsPlayerUpdate,
} from "src/models/Statistique";

interface Props {
  game: Game;
  players: Array<Player>;
}

interface Row {
  id: number;
  licence: string;
  number: null | number;
  lastname: string;
  firstname: string;
  startingfive: boolean;
  minutes: null | number;
  points: null | number;
  threeptspassed: null | number;
  twoptsintpassed: null | number;
  twoptsextpassed: null | number;
  lfpassed: null | number;
  fouls_0lf: null | number;
  fouls_1lf: null | number;
  fouls_2lf: null | number;
  fouls_3lf: null | number;
  idStats: number | null;
  is_play: boolean;
}
export const TableAddStatsPlayer = ({ game, players }: Props) => {
  const [rows, setRows] = useState<Array<Row>>(
    players.map((player) => ({
      id: player.id,
      licence: player.licence,
      number: null,
      lastname: player.lastname,
      firstname: player.firstname,
      is_play: true,
      startingfive: false,
      minutes: null,
      points: null,
      threeptspassed: null,
      twoptsintpassed: null,
      twoptsextpassed: null,
      lfpassed: null,
      fouls_0lf: null,
      fouls_1lf: null,
      fouls_2lf: null,
      fouls_3lf: null,
      idStats: null,
    }))
  );

  const columns: Array<GridColDef> = [
    {
      field: "is_play",
      headerName: "A Joué ?",
      flex: 1,
      type: "boolean",
      editable: true,
    },
    { field: "licence", headerName: "Licence", flex: 1, editable: false },
    { field: "lastname", headerName: "Nom", flex: 1, editable: false },
    { field: "firstname", headerName: "Prénom", flex: 1, editable: false },
    { field: "number", headerName: "N°", flex: 1, editable: true },
    {
      field: "startingfive",
      headerName: "5 de départ",
      flex: 1,
      type: "boolean",
      editable: true,
    },
    {
      field: "minutes",
      headerName: "Temps de jeu",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "points",
      headerName: "Points",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "threeptspassed",
      headerName: "3PTS Réussis",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "twoptsintpassed",
      headerName: "2PTS Int Réussis",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "twoptsextpassed",
      headerName: "2PTS Ext Réussis",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "lfpassed",
      headerName: "LF Réussis",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "fouls_0lf",
      headerName: "Fautes 0LF",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "fouls_1lf",
      headerName: "Fautes 1LF",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "fouls_2lf",
      headerName: "Fautes 2LF",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "fouls_3lf",
      headerName: "Fautes 3LF",
      flex: 1,
      type: "number",
      editable: true,
    },
  ];

  const [statsPlayers, setStatsPlayers] = useState<Array<StatsPlayer>>([]);

  useEffect(() => {
    getStats();
  }, [game]);

  useEffect(() => {
    setRows(
      players.map((player) => {
        const statsPlayer = statsPlayers.find(
          (el) => el.player.id === player.id
        );
        return {
          id: player.id,
          licence: player.licence,
          lastname: player.lastname,
          firstname: player.firstname,
          number: statsPlayer ? statsPlayer.number : null,
          is_play: statsPlayer ? statsPlayer.is_play : true,
          startingfive: statsPlayer ? statsPlayer.startingfive : false,
          minutes: statsPlayer ? statsPlayer.minutes : null,
          points: statsPlayer ? statsPlayer.points : null,
          threeptspassed: statsPlayer ? statsPlayer.threeptspassed : null,
          twoptsintpassed: statsPlayer ? statsPlayer.twoptsintpassed : null,
          twoptsextpassed: statsPlayer ? statsPlayer.twoptsextpassed : null,
          lfpassed: statsPlayer ? statsPlayer.lfpassed : null,
          fouls_0lf: statsPlayer ? statsPlayer.fouls_0lf : null,
          fouls_1lf: statsPlayer ? statsPlayer.fouls_1lf : null,
          fouls_2lf: statsPlayer ? statsPlayer.fouls_2lf : null,
          fouls_3lf: statsPlayer ? statsPlayer.fouls_3lf : null,
          idStats: statsPlayer ? statsPlayer.id : null,
        };
      })
    );
  }, [statsPlayers]);

  const getStats = () => {
    getStatsPlayerByGameId(game.id).then((res) => {
      const stats = res.data as Array<StatsPlayer>;
      setStatsPlayers(stats);
    });
  };

  const onRowEditCommit = async (newRow: Row, oldRow: Row) => {
    if (newRow.idStats) {
      const statsPlayerUpdate: StatsPlayerUpdate = {
        player: newRow.id,
        game: game.id,
        id: newRow.idStats,
        number: newRow.number,
        is_play: newRow.is_play,
        startingfive: newRow.startingfive,
        minutes: newRow.minutes,
        points: newRow.points,
        threeptspassed: newRow.threeptspassed,
        twoptsintpassed: newRow.twoptsintpassed,
        twoptsextpassed: newRow.twoptsextpassed,
        lfpassed: newRow.lfpassed,
        fouls_0lf: newRow.fouls_0lf,
        fouls_1lf: newRow.fouls_1lf,
        fouls_2lf: newRow.fouls_2lf,
        fouls_3lf: newRow.fouls_3lf,
      };
      const { error } = await updateStatsPlayer(statsPlayerUpdate);
      if (error) return oldRow;
    } else {
      const statsPlayerInsert: StatsPlayerInsert = {
        player: newRow.id,
        game: game.id,
        number: newRow.number,
        is_play: newRow.is_play,
        startingfive: newRow.startingfive,
        minutes: newRow.minutes,
        points: newRow.points,
        threeptspassed: newRow.threeptspassed,
        twoptsintpassed: newRow.twoptsintpassed,
        twoptsextpassed: newRow.twoptsextpassed,
        lfpassed: newRow.lfpassed,
        fouls_0lf: newRow.fouls_0lf,
        fouls_1lf: newRow.fouls_1lf,
        fouls_2lf: newRow.fouls_2lf,
        fouls_3lf: newRow.fouls_3lf,
      };
      const { data, error } = await insertStatsPlayer(statsPlayerInsert);
      if (error) {
        return oldRow;
      } else {
        return { ...newRow, idStats: data.id };
      }
    }
    return newRow;
  };

  return (
    <Paper elevation={3} sx={{ width: "100%", bgcolor: "background.paper" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        processRowUpdate={onRowEditCommit}
        hideFooter
      />
    </Paper>
  );
};
