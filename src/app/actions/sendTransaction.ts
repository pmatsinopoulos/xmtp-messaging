"use server";

import walletClient from "@/clients/wallet/httpJsonRpcPrivateKeyAccount";
import { INFURA_API_KEY, PRIVATE_KEY } from "@/consts";
import { revalidatePath } from "next/cache";
import { Address, createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { avalancheFuji } from "viem/chains";
import convertStringEtherToWeiBigInt from "../utils/convertStringEtherToWeiBigInt";

const API_KEY = INFURA_API_KEY || "";

const client = walletClient(`https://avalanche-fuji.infura.io/v3/${API_KEY}`);

export async function sendTransaction(
  previousState: any,
  formData: FormData
): Promise<{ transactionHash: string }> {
  const destinationAddress =
    formData.get("destinationAddress")?.toString() ||
    "0x0000000000000000000000000000000000000000";

  console.debug("action: destinationAddress", destinationAddress);

  const transactionValueInEtherString =
    formData.get("transactionValueInEther")?.toString() ?? "0.0";

  const transactionValueToSend = convertStringEtherToWeiBigInt(
    transactionValueInEtherString
  );

  console.debug(
    "About to call sendTransaction with destinationAddress",
    destinationAddress,
    "and transaction value",
    transactionValueToSend
  );

  const transactionHash = await client.sendTransaction({
    chain: null,
    to: destinationAddress as Address,
    value: transactionValueToSend,
  });

  console.debug("Transaction sent, Hash", transactionHash);

  revalidatePath("/transaction_server");

  return { transactionHash };
}
