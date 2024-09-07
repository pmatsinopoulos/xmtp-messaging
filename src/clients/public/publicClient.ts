import { Chain, createPublicClient, http } from "viem";

const publicClient = (chain: Chain) => {
  return createPublicClient({
    batch: {
      multicall: {
        wait: 3,
      },
    },
    chain: chain,
    transport: http(),
  });
};

export default publicClient;
