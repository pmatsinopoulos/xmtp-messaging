import { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { PRIVATE_KEY } from "../consts";

const account = privateKeyToAccount(PRIVATE_KEY);

export default account;
