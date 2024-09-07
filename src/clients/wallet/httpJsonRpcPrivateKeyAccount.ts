import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { PRIVATE_KEY } from "../../consts";

const account = privateKeyToAccount(PRIVATE_KEY);

const walletClient = (httpUrl: string) => {
  const client = createWalletClient({
    account,
    transport: http(httpUrl),
  }).extend(publicActions);

  return client;
};

export default walletClient;
