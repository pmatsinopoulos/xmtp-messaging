import { parseGwei, stringToHex, toBlobs } from "viem";
import client from "../src/walletClient";
import { kzg } from "../src/kzg";

console.debug(client);

const blobs = toBlobs({ data: stringToHex("hello world") });

const main = async () => {
  const trx = await client.sendTransaction({
    blobs,
    kzg,
    maxFeePerBlobGas: parseGwei("30"),
    to: "0x0000000000000000000000000000000000000000",
  });
  console.debug("Transaction hash", trx);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
  });
