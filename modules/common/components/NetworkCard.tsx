import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import request from "axios";
import { Network } from "modules/common/config/networks";
import { InfoItem, KeplrConnect } from "./";

export const NetworkCard = ({ network }: { network: Network }) => {
  const [apolloBlock, setApolloBlock] = useState(0);
  const [foreignBlock, setForeignBlock] = useState(0);

  const keplrInfo = network.supported_wallets.find(
    (n) => n.name === "keplr"
  )?.config;

  const fetchBlock = async (source: "apollo" | "foreign") => {
    let host = "";

    if (source === "foreign") {
      host = network.public_nodes.find((n) => n.type === "rpc")?.url || "";
      try {
        const response = await request.get(host + "/status");
        if (!response.data.result.sync_info.latest_block_height)
          setForeignBlock(0);

        setForeignBlock(response.data.result.sync_info.latest_block_height);
      } catch (error) {
        console.log("error fetching external block for", network.chain_id);
        setForeignBlock(0);
      }
    } else {
      if (!network.nodes) return setApolloBlock(0);
      const node = network.nodes.find((n) =>
        n.services.find((s) => s.type === "rpc")
      );
      if (!node) return setApolloBlock(0);
      host = node.services.find((s) => s.type === "rpc")?.url || "";
      try {
        const response = await request.get(host + "/status");
        if (!response.data.result.sync_info.latest_block_height)
          setApolloBlock(0);

        setApolloBlock(response.data.result.sync_info.latest_block_height);
      } catch (error) {
        console.log("error fetching apollo block for", network.chain_id);
        setApolloBlock(0);
      }
    }
  };

  const fetchNetworks = () => {
    fetchBlock("foreign");
    fetchBlock("apollo");
  };

  useEffect(() => {
    fetchNetworks();
  });

  const RemoteInfo = () => {
    return (
      <Box>
        <InfoItem label={"Block Height"} content={String(foreignBlock)} />
        <InfoItem
          label={"RPC"}
          content={network.public_nodes.find((n) => n.type === "rpc")?.url}
          link
        />
        <InfoItem
          label={"LCD"}
          content={network.public_nodes.find((n) => n.type === "rest")?.url}
          link
        />
      </Box>
    );
  };

  const ApolloInfo = () => {
    return (
      <Box mr={{ xs: "inherit", lg: "auto" }}>
        <InfoItem label={"Block Height"} content={String(apolloBlock)} />
        <InfoItem
          label={"Apollo RPC"}
          content={
            network.nodes?.map((n) =>
              n.services.find((s) => s.type === "rpc")
            )[0]?.url
          }
          link
        />
        <InfoItem
          label={"Apollo LCD"}
          content={
            network.nodes?.map((n) =>
              n.services.find((s) => s.type === "rest")
            )[0]?.url
          }
          link
        />
      </Box>
    );
  };

  return (
    <Grid item xs={12} md={6}>
      <Card
        variant={"outlined"}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardContent style={{ marginBottom: "auto" }}>
          <Box
            fontWeight={700}
            width={"100%"}
            border={`1px solid ${
              foreignBlock === apolloBlock ? "green" : "red"
            }`}
            py={1}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <span style={{ paddingRight: 8 }}>
              {foreignBlock === apolloBlock ? "🟢" : "🔴"}
            </span>
            {network.name} ({network.chain_id})
          </Box>
          <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
            <ApolloInfo />
            <RemoteInfo />
          </Stack>
        </CardContent>
        <CardActions>
          <Button onClick={fetchNetworks}>Refresh</Button>
          {keplrInfo && <KeplrConnect chainInfo={keplrInfo} />}
        </CardActions>
      </Card>
    </Grid>
  );
};
