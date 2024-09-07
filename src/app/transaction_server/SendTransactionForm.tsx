"use client";

import { InitialState } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { sendTransaction } from "../actions";

const initialState: InitialState = {
  destinationAddress: "0x0000000000000000000000000000000000000000",
  transactionValueToSend: 0n,
  transactionHash: "0x",
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? "Sending..." : "Send Transaction"}
    </button>
  );
};

export default function SendTransactionForm() {
  const [state, formAction] = useFormState<any, FormData>(
    sendTransaction,
    initialState
  );

  return (
    <>
      <form action={formAction}>
        <label htmlFor="destinationAddress">Destination Address</label>
        <input
          type="text"
          id="destinationAddress"
          name="destinationAddress"
          placeholder="Destination Address"
        />
        <label htmlFor="transactionValueInEther">Transaction Value</label>
        <input
          type="text"
          placeholder="0"
          name="transactionValueInEther"
          id="transactionValueInEther"
        />
        <SubmitButton />
      </form>
      {state.transactionHash !== "0x" && (
        <div>
          <h3>Transaction Sent!</h3>
          <p>Transaction Hash: {state.transactionHash}</p>
        </div>
      )}
    </>
  );
}
