import { Container, Fab, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "src/components/header/menu/Header";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ScrollTop } from "src/components/ScrollTop";
import { Footer } from "src/components/Footer";

export const Home = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 8 }}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <Footer />
    </>
  );
};
