import { parseEther } from "viem";

const convertStringEtherToWeiBigInt = (etherString: string): bigint => {
  let transactionValueInEther: number = 0;

  if (etherString !== "") {
    transactionValueInEther = parseFloat(etherString);
  }

  return parseEther(transactionValueInEther.toString());
};

export default convertStringEtherToWeiBigInt;
