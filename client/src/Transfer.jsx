import { useState } from "react";
import server from "./server";
import {toHex, utf8ToBytes, hexToBytes} from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { Buffer } from 'buffer';



function Transfer({ privateKey, address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);


  const message = toHex(keccak256(utf8ToBytes(sendAmount)));

  const signature = secp.secp256k1.sign(message, privateKey);
  
  // const isSigned = secp.secp256k1.verify(signature, message, toHex(secp.secp256k1.getPublicKey(privateKey)));

  const jsonReplacer = (key, value) => typeof value === "bigint" ? value.toString() : value;

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature: JSON.stringify(signature, jsonReplacer),
      });
      setBalance(balance);
    } catch (ex) {
      console.log(ex.response);
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
