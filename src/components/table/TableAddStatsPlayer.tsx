import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { insertStatsPlayer, updateStatsPlayer } from "src/api/statistique";
import {
  StatsPlayer,
  StatsPlayerInsert,
  StatsPlayerUpdate,
} from "src/models/Statistique";
import { AddStatsContext } from "src/pages/PageAddStatsGameV3";

interface Row {
  id: number;
  is_play: boolean;
  number: null | number;
  lastname: string;
  firstname: string;
  startingfive: boolean;
  fouls_0lf: null | number;
  fouls_1lf: null | number;
  fouls_2lf: null | number;
  fouls_3lf: null | number;
  q1lf: number;
  q2lf: number;
  q3lf: number;
  q4lf: number;
  plf: number;
  idStats: number | null;
}
export const TableAddStatsPlayer = () => {
  const { game, players, statsPlayers, updateStatsPlayers } =
    useContext(AddStatsContext);
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<Row>>([]);

  const columns: Array<GridColDef> = [
    {
      field: "is_play",
      headerName: t("commun.isplay"),
      width: 80,
      type: "boolean",
      editable: true,
      sortable: false,
    },
    {
      field: "lastname",
      headerName: t("commun.lastname"),
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: false,
    },
    {
      field: "firstname",
      headerName: t("commun.firstname"),
      maxWidth: 150,
      flex: 1,
      editable: false,
      sortable: false,
    },
    {
      field: "number",
      headerName: t("commun.numberabbreviation"),
      width: 50,
      type: "number",
      editable: true,
      sortable: false,
    },
    {
      field: "startingfive",
      headerName: t("commun.startingfive"),
      flex: 1,
      type: "boolean",
      editable: true,
      sortable: false,
    },
    {
      field: "fouls_0lf",
      headerName: t("commun.fouls0lf"),
      flex: 1,
      type: "number",
      editable: true,
      sortable: false,
    },
    {
      field: "fouls_1lf",
      headerName: t("commun.fouls1lf"),
      flex: 1,
      type: "number",
      editable: true,
      sortable: false,
    },
    {
      field: "fouls_2lf",
      headerName: t("commun.fouls2lf"),
      flex: 1,
      type: "number",
      editable: true,
      sortable: false,
    },
    {
      field: "fouls_3lf",
      headerName: t("commun.fouls3lf"),
      flex: 1,
      type: "number",
      editable: true,
      sortable: false,
    },
    {
      field: "q1lf",
      headerName: t("commun.lfq1"),
      flex: 1,
      type: "number",
      editable: true,
      sortable: false,
    },
    {
      field: "q2lf",
      headerName: t("commun.lfq2"),
      flex: 1,
      type: "number",
      editable: true,
      sortable: false,
    },
    {
      field: "q3lf",
      headerName: t("commun.lfq3"),
      flex: 1,
      type: "number",
      editable: true,
      sortable: false,
    },
    {
      field: "q4lf",
      headerName: t("commun.lfq4"),
      flex: 1,
      type: "number",
      editable: true,
      sortable: false,
    },
  ];

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
          fouls_0lf: statsPlayer ? statsPlayer.fouls_0lf : 0,
          fouls_1lf: statsPlayer ? statsPlayer.fouls_1lf : 0,
          fouls_2lf: statsPlayer ? statsPlayer.fouls_2lf : 0,
          fouls_3lf: statsPlayer ? statsPlayer.fouls_3lf : 0,
          q1lf: statsPlayer ? statsPlayer.q1lf : 0,
          q2lf: statsPlayer ? statsPlayer.q2lf : 0,
          q3lf: statsPlayer ? statsPlayer.q3lf : 0,
          q4lf: statsPlayer ? statsPlayer.q4lf : 0,
          plf: statsPlayer ? statsPlayer.plf : 0,
          idStats: statsPlayer ? statsPlayer.id : null,
        };
      })
    );
  }, [statsPlayers, players]);

  const onRowEditCommit = async (newRow: Row, oldRow: Row) => {
    if (game) {
      if (newRow.idStats) {
        const statsPlayerUpdate: StatsPlayerUpdate = {
          player: newRow.id,
          game: game.id,
          id: newRow.idStats,
          number: newRow.number,
          is_play: newRow.is_play,
          startingfive: newRow.startingfive,
          fouls_0lf: newRow.fouls_0lf,
          fouls_1lf: newRow.fouls_1lf,
          fouls_2lf: newRow.fouls_2lf,
          fouls_3lf: newRow.fouls_3lf,
          q1lf: newRow.q1lf,
          q2lf: newRow.q2lf,
          q3lf: newRow.q3lf,
          q4lf: newRow.q4lf,
          plf: newRow.plf,
        };
        const { data, error } = await updateStatsPlayer(statsPlayerUpdate);
        if (error) return oldRow;
        if (data) {
          updateStatsPlayers(data as StatsPlayer);
        }
      } else {
        const statsPlayerInsert: StatsPlayerInsert = {
          player: newRow.id,
          game: game.id,
          number: newRow.number,
          is_play: newRow.is_play,
          startingfive: newRow.startingfive,
          fouls_0lf: newRow.fouls_0lf,
          fouls_1lf: newRow.fouls_1lf,
          fouls_2lf: newRow.fouls_2lf,
          fouls_3lf: newRow.fouls_3lf,
          q1lf: newRow.q1lf,
          q2lf: newRow.q2lf,
          q3lf: newRow.q3lf,
          q4lf: newRow.q4lf,
        };
        const { data, error } = await insertStatsPlayer(statsPlayerInsert);
        if (data) {
          updateStatsPlayers(data as StatsPlayer);
        }
        if (error) {
          return oldRow;
        } else {
          return { ...newRow, idStats: data.id };
        }
      }
    }
    return newRow;
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      editMode="row"
      processRowUpdate={onRowEditCommit}
      disableRowSelectionOnClick
      disableColumnMenu
      hideFooter
    />
  );
};
