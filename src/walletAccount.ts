import { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { PRIVATE_KEY } from "./consts";

const KEY = `0x${
  PRIVATE_KEY ||
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
}` as Hex;
const account = privateKeyToAccount(KEY);

export default account;
