import { useEffect, useState } from "react";
import { SupportedNetwork, useNetworkManager } from "modules/common";
import {
  CosmWasmClient,
  ContractCodeHistoryEntry,
  Contract,
  JsonObject,
} from "@cosmjs/cosmwasm-stargate";

export type IUseContract = {
  changeNetwork: (network: SupportedNetwork) => void;
  currentNetwork: SupportedNetwork;
  changeContract: (contractAddress: string) => void;
  currentContractAddress: string;
  validContract: boolean;
  contractInfo: Contract;
  contractHistory: readonly ContractCodeHistoryEntry[];
  arbitraryQuery: (query: JsonObject) => JsonObject;
};

export const useContract = (
  contractAddress: string,
  network: SupportedNetwork
): IUseContract => {
  const [currentNetwork, setCurrentNetwork] =
    useState<SupportedNetwork>(network);
  const [currentContractAddress, setCurrentContractAddress] =
    useState<string>(contractAddress);
  const [validContract, setValidContract] = useState<boolean>(false);
  const [contractInfo, setContractInfo] = useState<Contract>({} as Contract);
  const [contractHistory, setContractHistory] = useState<
    readonly ContractCodeHistoryEntry[]
  >([] as readonly ContractCodeHistoryEntry[]);

  const { networkConfig } = useNetworkManager();

  const changeNetwork = (network: SupportedNetwork) => {
    setCurrentNetwork(network);
    setValidContract(false);
  };

  const changeContract = (contractAddress: string) => {
    setCurrentContractAddress(contractAddress);
  };

  useEffect(() => {
    const fetchContractInfo = async () => {
      if (!networkConfig) return;
      let rpc_host =
        networkConfig[currentNetwork].public_nodes.find((n) => n.type === "rpc")
          ?.url || "";

      if (rpc_host === "https://osmosistest-rpc.quickapi.com")
        rpc_host = "https://testnet-rpc.osmosis.zone";

      try {
        const client = await CosmWasmClient.connect(rpc_host);
        setContractInfo(await client.getContract(currentContractAddress));
        setContractHistory(
          await client.getContractCodeHistory(currentContractAddress)
        );
        // const search = await client.searchTx({
        //   sentFromOrTo: currentContractAddress,
        // });
        // console.log(search);
        setValidContract(true);
      } catch (error) {
        setValidContract(false);
      }
    };

    if (networkConfig) {
      fetchContractInfo();
    }
  }, [networkConfig, currentNetwork, currentContractAddress]);

  const arbitraryQuery = async (query: JsonObject) => {
    if (!networkConfig) return;
    let rpc_host =
      networkConfig[currentNetwork].public_nodes.find((n) => n.type === "rpc")
        ?.url || "";

    if (rpc_host === "https://osmosistest-rpc.quickapi.com")
      rpc_host = "https://testnet-rpc.osmosis.zone";

    try {
      console.log("try to run this query:", query);
      const client = await CosmWasmClient.connect(rpc_host);
      const response = await client.queryContractSmart(contractAddress, query);
      return response;
    } catch (error) {
      console.log("error running query", error);
    }
  };

  return {
    changeNetwork,
    currentNetwork,
    changeContract,
    currentContractAddress,
    validContract,
    contractInfo,
    contractHistory,
    arbitraryQuery,
  };
};
