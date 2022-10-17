import { useEffect, useState } from "react";
import request from "axios";
import { OfflineSigner, AccountData } from "@cosmjs/launchpad";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";
import { Keplr, ChainInfo } from "@keplr-wallet/types";
import { Coin } from "cosmwasm";
import { AUTO_CONNECT_KEY } from "modules/common";

type IKeplrHook = {
  status: "connected" | undefined;
  offlineSigner: OfflineSigner | OfflineDirectSigner | undefined;
  address: string | undefined;
  chainConfig: ChainInfo;
  bankBalance: Coin | undefined;
  connect: () => Promise<void>;
  disconnect: () => void;
};

export type BankResponse = {
  height: number;
  result: Coin[];
};
interface KeplrWindow extends Window {
  keplr: Keplr;
  getOfflineSigner: Function;
}

declare let window: KeplrWindow;

export const useKeplr = (chainConfig: ChainInfo): IKeplrHook => {
  const [status, setStatus] = useState<"connected">();
  const [offlineSigner, setOfflineSigner] = useState<
    OfflineSigner | OfflineDirectSigner
  >();
  const [address, setAddress] = useState<string>();
  const [bankBalance, setBankBalance] = useState<Coin>();

  const fetchBankBalance = async (address: string): Promise<Coin> => {
    const emptyBalance = {
      amount: "0",
      denom: chainConfig.stakeCurrency.coinMinimalDenom,
    };

    try {
      const response = await request.get<BankResponse>(
        `${chainConfig.rest}/bank/balances/${address}`
      );
      const balance = response.data.result.find(
        (c) => c.denom === chainConfig.stakeCurrency.coinMinimalDenom
      );

      return balance || emptyBalance;
    } catch (error) {
      return emptyBalance;
    }
  };

  const connect = async () => {
    if (!window.getOfflineSigner || !window.keplr) {
      console.log("Keplr not found");
      return;
    }

    if (!window.keplr.experimentalSuggestChain) {
      console.log("Update Keplr");
      return;
    }

    try {
      await window.keplr.experimentalSuggestChain(chainConfig);

      const offlineSigner = await window.keplr.getOfflineSignerAuto(
        chainConfig.chainId
      );

      const accounts = await offlineSigner.getAccounts();
      const address = accounts[0].address;
      const balances = await fetchBankBalance(address);

      setStatus("connected");
      setOfflineSigner(offlineSigner);
      setAddress(address);
      setBankBalance(balances);
      localStorage.setItem(AUTO_CONNECT_KEY + chainConfig.chainId, "keplr");
    } catch (error) {
      console.log("Must unlock enable wallet to continue");
    }
  };
  const disconnect = () => {
    setAddress(undefined);
    setStatus(undefined);
    setOfflineSigner(undefined);
    setBankBalance(undefined);
    localStorage.removeItem(AUTO_CONNECT_KEY + chainConfig.chainId);
  };

  useEffect(() => {
    const autoConnect = localStorage.getItem(
      AUTO_CONNECT_KEY + chainConfig.chainId
    );
    if (autoConnect) {
      connect();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    connect,
    disconnect,
    status,
    offlineSigner,
    address,
    chainConfig,
    bankBalance,
  };
};
