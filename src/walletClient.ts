import { createWalletClient, http } from "viem";
import account from "./walletAccount";
import { baseSepolia } from "viem/chains";

const client = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(),
});

export default client;
