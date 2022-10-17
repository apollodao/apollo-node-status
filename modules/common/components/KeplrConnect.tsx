import { ChainInfo } from "@keplr-wallet/types";
import { Button, Stack, Box } from "@mui/material";
import { useKeplr } from "../hooks";
import { balanceStringFromCoin } from "../util";

export const KeplrConnect = ({ chainInfo }: { chainInfo: ChainInfo }) => {
  const { address, bankBalance, connect, disconnect } = useKeplr(chainInfo);

  const ToggleButton = () => {
    return address ? (
      <Button onClick={disconnect}>Disconnect</Button>
    ) : (
      <Button onClick={connect}>Connect</Button>
    );
  };

  const ChainStats = () => {
    if (!bankBalance) return <></>;

    return (
      <Box p={0.5}>
        {balanceStringFromCoin(
          bankBalance,
          chainInfo.stakeCurrency.coinDecimals,
          (chainInfo.chainId === "injective-888" ||
            chainInfo.chainId === "injective-1") &&
            "INJ"
        )}
      </Box>
    );
  };

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <ToggleButton />
      {address && <ChainStats />}
    </Stack>
  );
};
