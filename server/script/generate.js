const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");


const privateKey = secp.secp256k1.utils.randomPrivateKey();

const publicKey = secp.secp256k1.getPublicKey(privateKey);


console.log("private key: " + toHex(privateKey));
console.log("public key: " + toHex(publicKey));


console.log("private key: " + toHex(privateKey));
console.log("public key: " + toHex(publicKey));



const signature = secp.secp256k1.sign(toHex(utf8ToBytes("message")), privateKey);
const isSigned = secp.secp256k1.verify(signature, toHex(utf8ToBytes("message")), publicKey);

console.log(signature);
console.log(isSigned);



const signature1 = secp.secp256k1.sign(toHex(utf8ToBytes("message")),toHex(privateKey));
const isSigned1 = secp.secp256k1.verify(signature, toHex(utf8ToBytes("message")), toHex(publicKey));
console.log(signature1);
console.log(isSigned1);



