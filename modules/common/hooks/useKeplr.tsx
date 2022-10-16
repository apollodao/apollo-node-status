import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { OfflineSigner } from "@cosmjs/launchpad";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";
import { Keplr, ChainInfo } from "@keplr-wallet/types";

type IKeplrHook = {
  status: "connected" | undefined;
  offlineSigner: OfflineSigner | OfflineDirectSigner | undefined;
  address: string | undefined;
  chainConfig: ChainInfo;
  bankBalance: string | undefined;
  bankDenom: string | undefined;
  connect: () => Promise<void>;
};

interface CosmosKeplrWindow extends Window {
  keplr: any;
  getOfflineSigner: Function;
}

declare let window: CosmosKeplrWindow;

export const useKeplr = (chainConfig: ChainInfo): IKeplrHook => {
  const [status, setStatus] = useState<"connected">();
  const [offlineSigner, setOfflineSigner] = useState<
    OfflineSigner | OfflineDirectSigner
  >();
  const [address, setAddress] = useState<string>();
  const [wallet, setWallet] = useState<Keplr>();
  const [bankBalance, setBankBalance] = useState<string>();
  const [bankDenom, setBankDenom] = useState<string>();

  const connect = async () => {
    // getOfflineSignerAuto
    // setAddress
    // setWallet
    // setStatus
    // save localStorage
    // setPostApi
    // fetchBankBalance
    const wallet = "";
    console.log(chainConfig);
  };
  const disconnect = () => {
    //clear address
    // clear wallet
    // clear status
    // clear localstorage
    // clear postapi
    // clear bank balance
  };

  return {
    connect,
    status,
    offlineSigner,
    address,
    chainConfig,
    bankBalance,
    bankDenom,
  };
};
