class Client {
	constructor(url) {
		this.url = url;
		this.id = 0;
	}

	method(methodName) {
		return params => fetch(this.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				jsonrpc: '2.0',
				method: methodName,
				params: params === undefined ? {} : params,
				id: this.id++,
			}),
			credentials: 'same-origin'
		})
		.then(res => res.json())
		.then(json => {
			if (json.error !== undefined) {
				throw json.error.message;
			} else {
				return json.result;
			}
		});
	}
};

export function client(url) {
	const inner = new Client(url);
	const proxy = new Proxy(inner, {
		get: function(target, prop, receiver) {
			return target.method(prop);
		}
	});
	return proxy;
};
