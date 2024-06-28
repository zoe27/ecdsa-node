## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.


Test data:
private key: 995cb93072ca903394ac92a76be955ed51a1fa8eeb2fc593410182c40eb4ed10
public key: 037c71fa7de202fa41f822e7a1785fa11d53809dc3b4c7bbfe84b5bd99ae228dc4


private key: a2af81bebe2ea986a6abe62808b6cf3cb7f90ffcb7a4e1ad3d27164cb9e9d01c
public key: 03bda9332fd1389c3d655d0cca3f2930434e5f26ef3a1d184593d8db3aff2349dd



private key: fb042941ca7bf883cbc2674c34e0bafbe518a2068c9ea27989a11a74aa0022c0
public key: 0300550b67099b494789252e6935fe9994b2ba6a303744dad8262bd85d288f58b5
