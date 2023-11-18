import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BasicSearchInput } from "src/components/input/BasicSearchInput";
import { CreateTeamDialog } from "src/components/dialog/CreateTeamDialog";

import AddIcon from "@mui/icons-material/Add";
import { Team } from "src/models/Team";
import { getTeamByName } from "src/api/team";
import { CardTeam } from "src/components/card/CardTeam";

export const SearchPage = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState<Array<Team>>([]);

  const searchTeams = () => {
    getTeamByName(search).then((res) => {
      setTeams(res.data as Array<Team>);
    });
  };

  useEffect(() => {
    searchTeams();
  }, [search]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={9}>
        <BasicSearchInput
          label={t("commun.search")}
          onChange={(value) => setSearch(value)}
          value={search}
          clear={() => setSearch("")}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          size="small"
          fullWidth
          onClick={() => setOpenModal(true)}
        >
          {t("commun.createteam")}
        </Button>
      </Grid>
      {teams.map((team) => (
        <Grid item xs={12} sm={6} md={4} key={team.id}>
          <CardTeam team={team} />
        </Grid>
      ))}

      <CreateTeamDialog open={openModal} close={() => setOpenModal(false)} />
    </Grid>
  );
};
