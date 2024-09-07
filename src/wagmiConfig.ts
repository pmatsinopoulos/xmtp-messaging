import { createConfig, http } from "wagmi";
import { baseSepolia, sepolia } from "wagmi/chains";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

const config = createConfig({
  chains: [sepolia, baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
    [sepolia.id]: http(),
  },
});

export { config };
