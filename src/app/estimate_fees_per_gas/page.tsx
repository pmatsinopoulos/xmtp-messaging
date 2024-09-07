import publicClient from "@/clients/public/publicClient";
import { avalancheFuji } from "viem/chains";
import account from "@/accounts/localPrivateKeyAccount";
import { parseEther } from "viem";

const Page = async () => {
  const client = publicClient(avalancheFuji);

  const { maxFeePerGas, maxPriorityFeePerGas } =
    await client.estimateFeesPerGas({
      chain: avalancheFuji,
    });

  const gasEstimateInGas = await client.estimateGas({
    account,
    to: "0xec4a93E2e955d97F0bE36e3E3533259629EaE7cA",
  });

  const maxFeeEstimateInWei = maxFeePerGas * gasEstimateInGas;

  const maxPriorityFeeInWei = maxPriorityFeePerGas * gasEstimateInGas;

  console.debug(
    "maxFeePerGas",
    maxFeePerGas,
    "maxPriorityFeePerGas",
    maxPriorityFeePerGas,
    "gasEstimateInGas",
    gasEstimateInGas,
    "maxFeeEstimateInWei",
    maxFeeEstimateInWei,
    "maxPriorityFeeInWei",
    maxPriorityFeeInWei
  );

  return (
    <div>
      <h1>Estimate Fee Per Gas - Chain {client.chain.name}</h1>

      <div>
        <label>Max Fee Per Gas (wei):</label>
        <code>{maxFeePerGas.toString()}</code>
      </div>

      <div>
        <label>Max Priority Fee Per Gas (wei):</label>
        <code>{maxPriorityFeePerGas.toString()}</code>
      </div>

      <div>
        <label>Gas Estimate (gas):</label>
        <code>{gasEstimateInGas.toString()}</code>
      </div>

      <div>
        <label>Max Gas Estimate (wei)(eth):</label>
        <code>
          {maxFeeEstimateInWei.toString()} (
          {(Number(maxFeeEstimateInWei) / 1e18).toString()})
        </code>
      </div>

      <div>
        <label>Max Priority Gas Estimate (wei)(eth):</label>
        <code>
          {maxPriorityFeeInWei.toString()} (
          {(Number(maxPriorityFeeInWei) / 1e18).toString()})
        </code>
      </div>
    </div>
  );
};

export default Page;
