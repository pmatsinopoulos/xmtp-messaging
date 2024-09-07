import { Address } from "viem";

export const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
export const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
export const PRIVATE_KEY: Address = `0x${
  process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000"
}`;
