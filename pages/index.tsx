import type { NextPage } from "next";
import { Box, Container, Grid } from "@mui/material";
import { supported_networks } from "modules/common/config/networks";
import { Section, NetworkCard } from "modules/common/components";
import { useNetworkManager } from "modules/common";

const Home: NextPage = () => {
  const { networkConfig } = useNetworkManager();
  if (!networkConfig) return <>Loading...</>;

  return (
    <Container>
      <Section>
        <Box
          display={"flex"}
          fontWeight={"bolder"}
          fontSize={32}
          alignItems={"center"}
          justifyContent={["center", "flex-start"]}
        >
          Apollo Network Status
        </Box>
      </Section>

      <Section>
        <Grid container spacing={2}>
          {supported_networks.map(
            (n) =>
              networkConfig[n] && (
                <NetworkCard key={`networks-${n}`} network={networkConfig[n]} />
              )
          )}
        </Grid>
      </Section>
    </Container>
  );
};

export default Home;
