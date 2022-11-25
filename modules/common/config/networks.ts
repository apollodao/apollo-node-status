import { ChainInfo } from "@keplr-wallet/types";

export const supported_networks = [
  "osmo-test-4",
  "osmosis-1",
  "pulsar-2",
  "injective-888",
  "injective-1",
] as const;

type SupportedNetwork = typeof supported_networks[number];

export type NetworkConfig = {
  [k in SupportedNetwork]: Network;
};

export type Network = {
  name: string;
  chain_id: SupportedNetwork;
  nodes?: ApolloNode[];
  public_nodes: PublicNode[];
  supported_wallets: Wallet[];
  supported_apps: App[];
  code_ids: CodeID[];
  contracts: Contract[];
};

type PublicNode = {
  type: "rpc" | "rest" | "seed" | "peer";
  url: string;
};

type WebService = {
  type: string;
  url: string;
};

export type ApolloNode = {
  isValidator: boolean;
  walletAddress: string;
  valAddress: string;
  id: string;
  services: WebService[];
};

type Wallet = {
  name: string;
  config?: ChainInfo | undefined;
};

type App = {
  name: string;
  supportedFeatures: string[];
};

type Contract = {
  label: string;
  code_id?: CodeID["id"];
  address: string;
  init_message?: any;
  admin?: string | boolean;
};

type CodeID = {
  label: string;
  id: number;
  checksum: string;
  query_messages?: any[];
  execution_messages?: any[];
};

export const APOLLO_NETWORK_URI =
  "https://raw.githubusercontent.com/apollodao/apollo-config/master/config.json";

export const AUTO_CONNECT_KEY = "apollo_save_wallet_";
