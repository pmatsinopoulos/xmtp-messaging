"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import publicClient from "../clients/public/publicClient";
import erc20contract, {
  address,
} from "../contracts/chains/avalancheFuji/usdcErc20";
import useWalletClient from "../clients/wallet/windowEthereumTransport";
import {
  Address,
  GetAddressesReturnType,
  RequestAddressesReturnType,
} from "viem";
import { avalancheFuji } from "viem/chains";
import Link from "next/link";

const erc20Name = "FiatTokenProxy";

const client = publicClient(avalancheFuji);

export default function Home() {
  const [blockNumber, setBlockNumber] = useState<bigint>(0n);
  const [name, setName] = useState<string>("");
  const [totalSupply, setTotalSupply] = useState<bigint>(0n);
  const [symbol, setSymbol] = useState<string>("");
  const [balance, setBalance] = useState<bigint>(0n);
  const walletClient = useWalletClient(avalancheFuji);
  const [addresses, setAddresses] = useState<
    GetAddressesReturnType | undefined
  >([]);
  const [destinationAddress, setDestinationAddress] = useState<Address>("0x");
  const [transactionValue, setTransactionValue] = useState<bigint>(0n);

  useEffect(() => {
    client.getBlockNumber().then((bn) => {
      console.debug(`BlockNumber fetched (chain: ${publicClient.name})`, bn);
      setBlockNumber(bn);
    });
  }, []);

  useEffect(() => {
    const readFromContract = async () => {
      const [_name, _totalSupply, _symbol, _balance] = await Promise.all([
        erc20contract.read.name(),
        erc20contract.read.totalSupply(),
        erc20contract.read.symbol(),
        erc20contract.read.balanceOf([address]),
      ]);
      console.debug(
        "_name",
        _name,
        "_totalSupply",
        _totalSupply,
        "_symbol",
        _symbol,
        "_balance",
        _balance
      );
      setName(_name);
      setTotalSupply(_totalSupply);
      setSymbol(_symbol);
      setBalance(_balance);
    };
    readFromContract();
  }, []);

  useEffect(() => {
    (async () => {
      if (walletClient) {
        console.debug(
          "walletClient is not null neither undefined, calling requestAddresses()"
        );

        try {
          await walletClient.requestAddresses();

          const addresses = await walletClient.getAddresses();

          setAddresses(addresses);
        } catch (e: any) {
          console.error(e);
        }
      } else {
        console.debug("walletClient is null or undefined");
      }
    })();
  }, [walletClient]);

  const onDestinationAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestinationAddress(e.target.value as Address);
  };

  const onTransactionValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.debug("transaction value given", e.target.value);
    setTransactionValue(BigInt(e.target.value));
  };

  const btnSendTransactionHandler = () => {
    console.debug("send transaction handler button");
    console.debug("Will send ", transactionValue, "to", destinationAddress);

    if (destinationAddress === "0x") {
      console.error("destinationAddress should not be 0x");
      return;
    }

    if (!walletClient) {
      console.error("walletClient is null or undefined");
      return;
    }

    (async () => {
      try {
        if (addresses) {
          const hash = await walletClient.sendTransaction({
            chain: avalancheFuji,
            account: addresses[0],
            to: destinationAddress,
            value: transactionValue,
          });

          console.debug("Transaction hash", hash);
        }
      } catch (e: any) {
        console.error(e);
      }
    })();
  };

  return (
    <>
      <Link href="/estimate_fees_per_gas">1. Estimate Fees Per Gas</Link>
      <main>
        <div className={styles.description}>
          <p>
            {`BlockNumber (chain: ${client.chain.name}): `}
            <code className={styles.code}>{blockNumber.toString()}</code>
          </p>
          <p>
            Wallet Client Addresses:
            {addresses?.map((address) => {
              return (
                <code key={address} className={styles.code}>
                  {address}
                </code>
              );
            })}
          </p>
          <h2>{erc20Name}</h2>
          <p>Name: {name}</p>
          <p>Total Supply: {totalSupply.toString()}</p>
          <p>Symbol: {symbol}</p>
          <p>Balance: {balance.toString()}</p>
        </div>
      </main>
      <label htmlFor="destinationAddress">Destination Address</label>
      <input
        type="text"
        id="destinationAddress"
        name="destinationAddress"
        placeholder="Destination Address"
        value={destinationAddress}
        onChange={onDestinationAddressChange}
      />
      <label htmlFor="transactionValueToSend">Transaction Value</label>
      <input
        type="number"
        min={0}
        max={10000}
        placeholder="0"
        name="transactionValueToSend"
        id="transactionValueToSend"
        value={transactionValue.toString()}
        onChange={onTransactionValueChange}
      />
      <button id="btnSendTransaction" onClick={btnSendTransactionHandler}>
        Send Transaction
      </button>
    </>
  );
}
