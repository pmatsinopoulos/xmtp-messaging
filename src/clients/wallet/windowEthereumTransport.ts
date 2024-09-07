import { useEffect, useState } from "react";
import { Chain, createWalletClient, custom, WalletClient } from "viem";

const useWalletClient = (chain: Chain) => {
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum!) {
      console.debug(
        `About to createWalletClient on chain ${chain.name} with window.ethereum = `,
        window.ethereum!
      );
      const client = createWalletClient({
        chain,
        transport: custom(window.ethereum!),
      });
      console.debug("Setting client to ", client);
      setWalletClient(client);
    } else {
      console.debug("typeof window", typeof window);
    }
  }, []);

  return walletClient;
};

export default useWalletClient;
