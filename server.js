const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errHandle = require('./errorHandle');
const todos = [];

const requestListenner = (req, res) => {
	const headers = {
		'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
		'Content-Type': 'application/json'
	}

	let body = "";

	req.on('data', chunk => {
		body += chunk;
	})

	if ( req.url == '/todos' && req.method == 'GET' ) {
		res.writeHead(200, headers);
		res.write(JSON.stringify({
			'status': "success",
			"data": todos,
		}));
		res.end();
	} else if ( req.url == '/todos' && req.method == 'POST' ) {
		req.on('end', () => {
			try {
				const title = JSON.parse(body).title;
				if ( title ) {
					const todo = {
						uuid: uuidv4(),
						title
					};
					todos.push(todo);
					res.writeHead(200, headers);
					res.write(JSON.stringify({
						'status': "success",
						"data": todos,
					}));
					res.end();
				} else {
					errHandle(res);
				}
			} catch(err) {
				errHandle(res);
			}
		})
	} else if ( req.url == '/todos' && req.method == 'DELETE') {
		todos.length = 0;
		res.writeHead(200, headers);
		res.write(JSON.stringify({
			'status': "success",
			"data": todos,
		}));
		res.end();
	}	else if ( req.url.startsWith("/todos/") && req.method == 'DELETE') {
		const id = req.url.split('/').pop();
		const index = todos.findIndex(element => element.uuid == 	id);

		if ( index !== -1 ) {
			todos.splice(index, 1);
			res.writeHead(200, headers);
			res.write(JSON.stringify({
				'status': "success",
				"data": todos,
			}));
			res.end();
		} else {
			errHandle(res);
		}
	} else if ( req.url.startsWith("/todos/") && req.method == 'PATCH') {
		req.on('end', () => {
			try {
				const todo = JSON.parse(body).title;
				const id = req.url.split('/').pop();
				const index = todos.findIndex(element => element.uuid == id);
				console.log(todo, id, index);
				if ( todo && index !== -1 ) {
						todos[index].title = todo;

						res.writeHead(200, headers);
						res.write(JSON.stringify({
							"status": "success",
							"data": todos
						}));
						res.end();
				} else {
					errHandle(res);
				}
			} catch {
				errHandle(res);
			}
		});
	} else {
		res.writeHead(404, headers);
		res.write(JSON.stringify({
			"status": "false",
			"message": "查無此路徑"
		}));
		res.end();
	}
}

const server = http.createServer(requestListenner);
server.listen(3005)