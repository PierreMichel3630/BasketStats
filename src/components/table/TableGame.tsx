import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { Game } from "src/models/Game";
import { Colors } from "src/style/Colors";

import AddchartIcon from "@mui/icons-material/Addchart";
import { groupBy } from "lodash";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "src/context/AuthProviderSupabase";
import { sortByDateDesc } from "src/utils/sort";
import { MessageSnackbar } from "../Snackbar";

interface Props {
  games: Array<Game>;
  isRight?: boolean;
}

const hoverCell = {
  color: "inherit",
};

export const TableGame = ({ games, isRight = false }: Props) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const gamesSort = games.sort(sortByDateDesc);
  const gamesGroupByMonth = groupBy(gamesSort, (el) =>
    moment(el.date).format("MMMM")
  );

  const addStat = (id: number) => {
    if (user) {
      if (isRight) {
        navigate(`/game/${id}/addstats`);
      } else {
        setMessage(t("commun.errorrightteam"));
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <Paper variant="outlined" sx={{ bgcolor: "background.paper" }}>
      <Grid container>
        <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1 }}>
          <Typography variant="h4" color="white" textTransform="uppercase">
            {t("commun.teamcalendar")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table size="small">
              <TableHead sx={{ bgcolor: Colors.subprimary }}>
                <TableRow>
                  <TableCell>
                    <Typography variant="h4" color="white">
                      {t("commun.date")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h4" color="white">
                      {t("commun.opponent")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h4" color="white">
                      {t("commun.result")}
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(gamesGroupByMonth).map(([key, value]) => (
                  <Fragment key={key}>
                    <TableRow sx={{ bgcolor: Colors.subprimary2 }}>
                      <TableCell colSpan={4}>
                        <Typography variant="h6" color="white">
                          {key}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    {value.map((game) => (
                      <TableRow
                        component={Link}
                        key={game.id}
                        sx={{
                          "&:hover": {
                            bgcolor: "secondary.main",
                            cursor: "pointer",
                            color: Colors.black,
                          },
                        }}
                        to={`/game/${game.id}/stats`}
                      >
                        <TableCell sx={hoverCell}>
                          <Typography variant="body1">
                            {moment(game.date).format("DD/MM/YYYY")}
                          </Typography>
                        </TableCell>
                        <TableCell sx={hoverCell}>
                          <Typography variant="body1">
                            {`${
                              game.is_outside
                                ? t("commun.in")
                                : t("commun.against")
                            } ${game.opponent}`}
                          </Typography>
                        </TableCell>
                        <TableCell sx={hoverCell}>
                          {game.opponent_score && game.team_score ? (
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Typography
                                variant="h4"
                                sx={{
                                  color:
                                    game.team_score > game.opponent_score
                                      ? Colors.green
                                      : Colors.red,
                                }}
                              >
                                {game.team_score > game.opponent_score
                                  ? t("commun.victoryabbreviation")
                                  : t("commun.defeatabbreviation")}
                              </Typography>
                              <Typography
                                variant="body1"
                                noWrap
                              >{`${game.team_score} - ${game.opponent_score}`}</Typography>
                            </Box>
                          ) : (
                            <Typography variant="body1">
                              {t("commun.notspecified")}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Tooltip title={t("commun.addmodifystatistics")}>
                            <IconButton
                              size="small"
                              onClick={(event) => {
                                event.preventDefault();
                                addStat(game.id);
                              }}
                            >
                              <AddchartIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <MessageSnackbar
        open={message !== ""}
        handleClose={() => setMessage("")}
        message={message}
        severity="error"
      />
    </Paper>
  );
};

export const TableGameEdit = ({ games }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    { field: "date", headerName: t("commun.date"), flex: 1 },
    { field: "opponent", headerName: t("commun.opponent"), flex: 2 },
    { field: "score", headerName: t("commun.score"), flex: 1 },
    {
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<AddchartIcon />}
          label="AddchartIcon"
          onClick={() => navigate(`/game/${params.id}/addstats`)}
        />,
      ],
    },
  ];

  const rows: Array<any> = games.map((game) => ({
    id: game.id,
    date: moment(game.date).format("DD/MM/YYYY"),
    opponent: game.opponent,
    score:
      game.opponent_score && game.team_score
        ? `${game.team_score} - ${game.opponent_score}`
        : "Non renseigné",
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        disableRowSelectionOnClick
      />
    </Box>
  );
};
