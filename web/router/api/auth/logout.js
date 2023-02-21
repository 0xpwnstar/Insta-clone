const { JSONRPCClient } = require("json-rpc-2.0");
const axios = require('axios');
const fetch = async (jsonRPCRequest) =>  {
  try {
    const response = await axios.post("http://13.233.139.176:3001/json-rpc",jsonRPCRequest )

    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return client.receive(response.data);
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  }  catch (err) {
    console.log(err);
  }
}
const client = new JSONRPCClient((jsonRPCRequest) =>
  fetch(jsonRPCRequest)
);

const logout = (req,res) => {
  res.cookie('authcookie', '', { maxAge: 0 })
  client.request("echo", { text: "Logged out via RPC" }).then((result) => res.json(result).send());
}

module.exports = logout;