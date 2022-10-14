export const supported_networks = [
  "osmo-test-4",
  "osmosis-1",
  "pulsar-2",
  "injective-888",
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
  config?: any;
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

export const networks: NetworkConfig = {
  "osmo-test-4": {
    name: "osmosistestnet",
    chain_id: "osmo-test-4",
    nodes: [
      {
        isValidator: true,
        walletAddress: "osmo1q2qqfgac2zfhwjrf5u8h60xxxh0873u0vfq7w6",
        valAddress: "osmovaloper1q2qqfgac2zfhwjrf5u8h60xxxh0873u0k7gaea",
        id: "fc086f94384ac5d4f360b9e18a3ae1eae2bec54b@44.192.246.104",
        services: [
          {
            type: "rpc",
            url: "https://osmo-test-rpc.apollo.farm",
          },
          {
            type: "rest",
            url: "https://osmo-test-lcd.apollo.farm",
          },
        ],
      },
    ],
    public_nodes: [
      {
        type: "rpc",
        url: "https://testnet-rpc.osmosis.zone",
      },
      {
        type: "rest",
        url: "https://testnet-rest.osmosis.zone",
      },
    ],
    supported_wallets: [
      {
        name: "keplr",
        config: {},
      },
      { name: "walletConnect" },
    ],
    supported_apps: [
      {
        name: "safe",
        supportedFeatures: ["cw3-fixed"],
      },
    ],
    code_ids: [
      {
        label: "apollo cw3",
        id: 237,
        checksum: "",
        query_messages: [],
        execution_messages: [],
      },
    ],
    contracts: [
      {
        label: "Apollo Safe CW3",
        address: "",
        admin: "",
        code_id: 237,
        init_message: "",
      },
    ],
  },
  "osmosis-1": {
    name: "osmosis",
    chain_id: "osmosis-1",
    nodes: [
      {
        isValidator: false,
        walletAddress: "",
        valAddress: "",
        id: "",
        services: [
          {
            type: "rpc",
            url: "https://osmo-mainnet-rpc.apollo.farm",
          },
          {
            type: "rest",
            url: "https://osmo-mainnet-lcd.apollo.farm",
          },
        ],
      },
    ],
    public_nodes: [
      {
        type: "rpc",
        url: "https://rpc.cosmos.directory/osmosis",
      },
      {
        type: "rest",
        url: "https://rest.cosmos.directory/osmosis",
      },
    ],
    supported_wallets: [
      {
        name: "keplr",
        config: {},
      },
      { name: "walletConnect" },
    ],
    supported_apps: [
      {
        name: "safe",
        supportedFeatures: ["cw3-fixed"],
      },
    ],
    code_ids: [
      {
        label: "apollo cw3",
        id: 1,
        checksum: "",
        query_messages: [],
        execution_messages: [],
      },
    ],
    contracts: [
      {
        label: "Apollo Safe CW3",
        address: "",
        admin: "",
        code_id: 1,
        init_message: "",
      },
    ],
  },
  "pulsar-2": {
    name: "secrettestnet",
    chain_id: "pulsar-2",
    nodes: [
      {
        isValidator: true,
        walletAddress: "secret1a86ltvg9wa39aw9zgs45ze9se42yq35a4405e0",
        valAddress: "secretvaloper1a86ltvg9wa39aw9zgs45ze9se42yq35ayjpf5x",
        id: "196c6c7083023efe93ddb068d2340dd5c2f2ddb3@51.81.154.102",
        services: [
          {
            type: "rpc",
            url: "https://secret-testnet-rpc.apollo.farm",
          },
          {
            type: "rest",
            url: "https://secret-testnet-lcd.apollo.farm",
          },
        ],
      },
    ],
    public_nodes: [
      {
        type: "rpc",
        url: "https://rpc.testnet.secretsaturn.net",
      },
      {
        type: "rest",
        url: "https://lcd.testnet.secretsaturn.net",
      },
    ],
    supported_wallets: [
      {
        name: "keplr",
        config: {},
      },
      { name: "walletConnect" },
    ],
    supported_apps: [],
    code_ids: [],
    contracts: [],
  },
  "injective-888": {
    name: "injectivetestnet",
    chain_id: "injective-888",
    nodes: [
      {
        isValidator: false,
        walletAddress: "",
        valAddress: "",
        id: "",
        services: [
          {
            type: "rpc",
            url: "https://injective-testnet-rpc.apollo.farm",
          },
          {
            type: "rest",
            url: "https://injective-testnet-lcd.apollo.farm",
          },
        ],
      },
    ],
    public_nodes: [
      {
        type: "rpc",
        url: "https://k8s.testnet.tm.injective.network",
      },
      {
        type: "rest",
        url: "https://k8s.testnet.lcd.injective.network",
      },
    ],
    supported_wallets: [
      {
        name: "keplr",
        config: {},
      },
      { name: "walletConnect" },
    ],
    supported_apps: [
      {
        name: "safe",
        supportedFeatures: ["cw3-fixed"],
      },
    ],
    code_ids: [
      {
        label: "apollo cw3",
        id: 1,
        checksum: "",
        query_messages: [],
        execution_messages: [],
      },
    ],
    contracts: [
      {
        label: "Apollo Safe CW3",
        address: "",
        admin: "",
        code_id: 1,
        init_message: "",
      },
    ],
  },
};
