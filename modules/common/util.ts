import bn from "bignumber.js";
import { Coin } from "cosmwasm";

export function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export const balanceStringFromCoin = (
  balance: Coin,
  currencyDecimals: number = 6,
  overrideDenom?: string | boolean
) => {
  const denomString = overrideDenom
    ? overrideDenom
    : balance.denom.substring(1).toUpperCase();
  return (
    new bn(balance.amount).div(new bn(10).pow(currencyDecimals)).toFixed(3, 1) +
    " " +
    denomString
  );
};
