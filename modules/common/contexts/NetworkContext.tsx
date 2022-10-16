import React, {
  ReactNode,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import request from "axios";
import { NetworkConfig, APOLLO_NETWORK_URI } from "modules/common";

export type INetworkManager = {
  networkConfig: NetworkConfig | undefined;
  currentNetwork: string;
  setCurrentNetwork: Dispatch<SetStateAction<string>>;
};

const NetworkManager = React.createContext<INetworkManager>({
  networkConfig: undefined,
  currentNetwork: "",
  setCurrentNetwork: () => {},
});

export const NetworkMangerProvider = ({
  children,
  initNetwork,
}: {
  children: ReactNode;
  initNetwork?: string;
}) => {
  const [currentNetwork, setCurrentNetwork] = useState<string>("");
  const [networkConfig, setNetworkConfig] = useState<NetworkConfig>();
  const [networkConfigLoaded, setNetworkConfigLoaded] =
    useState<boolean>(false);

  const fetchNetworkConfig = async () => {
    try {
      const response = await request.get<NetworkConfig>(APOLLO_NETWORK_URI);
      if (response) {
        setNetworkConfig(response.data);
        setNetworkConfigLoaded(true);
      }
    } catch (error) {
      console.log("error fetching network config");
    }
  };

  useEffect(() => {
    if (initNetwork) {
      setCurrentNetwork(initNetwork);
    }
  }, [initNetwork]);

  useEffect(() => {
    fetchNetworkConfig();
  }, [networkConfigLoaded]);

  return (
    <NetworkManager.Provider
      value={{
        networkConfig,
        currentNetwork,
        setCurrentNetwork,
      }}
    >
      {children}
    </NetworkManager.Provider>
  );
};

export const useNetworkManager = () => {
  return useContext(NetworkManager);
};
