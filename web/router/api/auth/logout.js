const { JSONRPCClient } = require("json-rpc-2.0");
const axios = require('axios');
// JSONRPCClient needs to know how to send a JSON-RPC request.
// Tell it by passing a function to its constructor. The function must take a JSON-RPC request and send it.
const fetch = async (jsonRPCRequest) =>  {
  console.log(jsonRPCRequest)
  try {
    const response = await axios.post("http://localhost:3001/json-rpc",jsonRPCRequest )

    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return client.receive(response.data);
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  }  catch (err) {
    console.log(err);
  }

  // .then((response) => {
  // if (response.status === 200) {
  //   // Use client.receive when you received a JSON-RPC response.
  //   console.log(response)
  //   return response
  //     .json()
  //     .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
  // } else if (jsonRPCRequest.id !== undefined) {
  //   return Promise.reject(new Error(response.statusText));
  // }
// })}
}
const client = new JSONRPCClient((jsonRPCRequest) =>
  // fetch("http://localhost:3001/json-rpc", {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   body: JSON.stringify(jsonRPCRequest),
  // }).then((response) => {
  //   if (response.status === 200) {
  //     // Use client.receive when you received a JSON-RPC response.
  //     return response
  //       .json()
  //       .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
  //   } else if (jsonRPCRequest.id !== undefined) {
  //     return Promise.reject(new Error(response.statusText));
  //   }
  // }))
  fetch(jsonRPCRequest)


);

const logout = (req,res) => {
   client.request("echo", { text: "Nice game" }).then((result) => res.send(result));
}

module.exports = logout;