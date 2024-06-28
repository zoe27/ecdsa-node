import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  const [privateKey, setPrivateKey] = useState("a2af81bebe2ea986a6abe62808b6cf3cb7f90ffcb7a4e1ad3d27164cb9e9d01c");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey} />
    </div>
  );
}

export default App;
