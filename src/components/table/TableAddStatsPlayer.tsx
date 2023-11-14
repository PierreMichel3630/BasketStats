import { Grid } from "@mui/material";
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
  "3ptspassed": null | number;
  "2ptsintpassed": null | number;
  "2ptsextpassed": null | number;
  lfpassed: null | number;
  fouls: null | number;
  idStats: number | null;
}
export const TableAddStatsPlayer = ({ game, players }: Props) => {
  const [rows, setRows] = useState<Array<Row>>(
    players.map((player) => ({
      id: player.id,
      licence: player.licence,
      number: null,
      lastname: player.lastname,
      firstname: player.firstname,
      startingfive: false,
      minutes: null,
      points: null,
      "3ptspassed": null,
      "2ptsintpassed": null,
      "2ptsextpassed": null,
      lfpassed: null,
      fouls: null,
      idStats: null,
    }))
  );

  const columns: Array<GridColDef> = [
    { field: "licence", headerName: "Licence", flex: 1, editable: true },
    { field: "lastname", headerName: "Nom", flex: 1, editable: true },
    { field: "firstname", headerName: "Prénom", flex: 1, editable: true },
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
      field: "3ptspassed",
      headerName: "3PTS Réussis",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "2ptsintpassed",
      headerName: "2PTS Int Réussis",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "2ptsextpassed",
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
      field: "fouls",
      headerName: "Fautes",
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
          startingfive: statsPlayer ? statsPlayer.startingfive : false,
          minutes: statsPlayer ? statsPlayer.minutes : null,
          points: statsPlayer ? statsPlayer.points : null,
          "3ptspassed": statsPlayer ? statsPlayer["3ptspassed"] : null,
          "2ptsintpassed": statsPlayer ? statsPlayer["2ptsintpassed"] : null,
          "2ptsextpassed": statsPlayer ? statsPlayer["2ptsextpassed"] : null,
          lfpassed: statsPlayer ? statsPlayer.lfpassed : null,
          fouls: statsPlayer ? statsPlayer.fouls : null,
          idStats: statsPlayer ? statsPlayer.id : null,
        };
      })
    );
  }, [statsPlayers]);

  const getStats = () => {
    getStatsPlayerByGameId(game.id).then((res) => {
      console.log(res);
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
        startingfive: newRow.startingfive,
        minutes: newRow.minutes,
        points: newRow.points,
        "3ptspassed": newRow["3ptspassed"],
        "2ptsintpassed": newRow["2ptsintpassed"],
        "2ptsextpassed": newRow["2ptsextpassed"],
        lfpassed: newRow.lfpassed,
        fouls: newRow.fouls,
      };
      const { error } = await updateStatsPlayer(statsPlayerUpdate);
      if (error) return oldRow;
    } else {
      const statsPlayerInsert: StatsPlayerInsert = {
        player: newRow.id,
        game: game.id,
        number: newRow.number,
        startingfive: newRow.startingfive,
        minutes: newRow.minutes,
        points: newRow.points,
        "3ptspassed": newRow["3ptspassed"],
        "2ptsintpassed": newRow["2ptsintpassed"],
        "2ptsextpassed": newRow["2ptsextpassed"],
        lfpassed: newRow.lfpassed,
        fouls: newRow.fouls,
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
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          processRowUpdate={onRowEditCommit}
          hideFooter
        />
      </Grid>
    </Grid>
  );
};
