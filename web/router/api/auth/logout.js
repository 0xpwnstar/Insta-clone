const {JSONRPCClient} = require("json-rpc-2.0")
const client = new JSONRPCClient((jsonRPCRequest) =>
  fetch("http://13.233.139.176:3001/json-rpc", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jsonRPCRequest),
  }).then((response) => {
    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return response
        .json()
        .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  })
);



exports.logout = (req,res) => {
  client
.request("echo", { text: "I am logout!" })
.then((result) => res.send(result));

  client.notify("log", { message: "Yo whatsapp" }); 
}


