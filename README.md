# json-rpc-client
A simple, experimental implementation of a proxy-based JSON-RPC client

## Example

```javascript
// Client

const jsonRpcClient = require('./json-rpc-client');
const client = jsonRpcClient('/api/json-rpc');

// ...

client.sum([1,3,8,3]).then(res => {
	alert('Result: ' + res);
});



// Server

const express = require('express');
const jayson = require('jayson');
const jsonParser = require('body-parser').json;

const rpcService = jayson.server({
	sum: function(args, cb) {
		const sum = args.reduce((a, x) => a + x);
		cb(null, sum);
	}
});

const app = express();
app.use(jsonParser());
app.use('/api/json-rpc', rpcService.middleware());
app.listen(80);
```