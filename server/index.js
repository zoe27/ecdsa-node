const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const {toHex, utf8ToBytes, hexToBytes} = require("ethereum-cryptography/utils");


const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "037c71fa7de202fa41f822e7a1785fa11d53809dc3b4c7bbfe84b5bd99ae228dc4": 100,
  "03bda9332fd1389c3d655d0cca3f2930434e5f26ef3a1d184593d8db3aff2349dd": 50,
  "0300550b67099b494789252e6935fe9994b2ba6a303744dad8262bd85d288f58b5": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async(req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const decoder = (key, value) => {
    if (key === "r" || key === "s") {
        return BigInt(value);
    }
    return value;
  };

  const getSignature = (signature) => {
    const sign = JSON.parse(signature, decoder);
    const construcSign = new secp.secp256k1.Signature(sign.r, sign.s, sign.recovery);
    return construcSign;
  };

  const sign = getSignature(signature);

  const message = toHex(keccak256(utf8ToBytes(amount+"")));


  const isValid = secp.secp256k1.verify(
    sign,
    message, // 您需要计算消息的哈希值
    sender // 发送者的公钥
  );


  if(isValid){
    console.log("correct signature");
  }else{
    console.log("error signature");
    res.status(400).send({ message: "wrong singnature!" });
  }

  


  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
