import { useRef } from "react";
import type { NextPage } from "next";
import {
  Box,
  Button,
  Container,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import { SupportedNetwork } from "modules/common/config";
import { Section } from "modules/common/components";
import { useNetworkManager } from "modules/common/contexts";

import {
  NetworkDropdown,
  ContractField,
  ContractDetails,
  ContractHistoryList,
  QueryBox,
} from "modules/contract-explorer/components";
import { useContract } from "modules/contract-explorer/hooks";

const ContractExplorer: NextPage = () => {
  const { networkConfig } = useNetworkManager();
  const {
    currentNetwork,
    changeNetwork,
    currentContractAddress,
    changeContract,
    validContract,
    contractInfo,
    contractHistory,
    arbitraryQuery,
  } = useContract(
    "osmo1lcnpd5000ru7qpd0tz8wnl00rlfvlxvqlw04md9cxsudapd0flvsqke5t5",
    "osmo-test-4"
  );
  if (!networkConfig) return <>Loading...</>;

  const handleNetworkChange = (n: SelectChangeEvent) => {
    changeNetwork(n.target.value as SupportedNetwork);
  };

  const handleContractChange = (c: string) => {
    changeContract(c);
  };

  const keplrInfo = networkConfig[currentNetwork].supported_wallets.find(
    (n) => n.name === "keplr"
  )?.config;

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
          Contract Explorer
        </Box>
      </Section>
      <Section>
        <NetworkDropdown
          currentNetwork={currentNetwork}
          onChange={handleNetworkChange}
        />
      </Section>
      <Section>
        <ContractField
          onChange={handleContractChange}
          defaultValue={currentContractAddress}
        />
      </Section>

      {!validContract && (
        <Section>
          <Box>Invalid Contract (not found or wrong network)</Box>
        </Section>
      )}

      {keplrInfo && validContract && (
        <Section>
          <Box fontWeight={"bolder"} fontSize={16} mb={2}>
            Execute Tx
          </Box>
        </Section>
      )}

      {validContract && (
        <Box mb={32}>
          <QueryBox queryHandler={arbitraryQuery} />
          <Section>
            <Box fontWeight={"bolder"} fontSize={16} mb={2}>
              Contract Details
            </Box>
            <ContractDetails contractInfo={contractInfo} />
          </Section>
          <Section>
            <Box fontWeight={"bolder"} fontSize={16} mb={2}>
              Contract History
            </Box>
            <ContractHistoryList contractHistory={contractHistory} />
          </Section>
        </Box>
      )}
    </Container>
  );
};

export default ContractExplorer;
