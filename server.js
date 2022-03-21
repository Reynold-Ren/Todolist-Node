const http = require('http');
const responseHandle = require('./responseHandle');
const errHandle = require('./errorHandle');
const handleAddTodo = require('./todos/handleAddTodo');
const handleDeleteTodo = require('./todos/handleDeleteTodo');
const handleEditTodo = require('./todos/handleEditTodo');
const httpStatusCodes = require('./httpStatusCodes');
const todos = [];

const requestListenner = (req, res) => {

	if ( req.url.indexOf('/todos') !== -1 ) {
		switch(req.method) {
			case 'GET':
				responseHandle(res, httpStatusCodes.OK, todos);
				break;
			case 'POST':
				handleAddTodo(req, res, todos);
				break;
			case 'DELETE':
				handleDeleteTodo(req, res, todos);
				break;
			case 'PATCH':
				handleEditTodo(req, res, todos);
				break;
			case 'OPTIONS':
				responseHandle(res, httpStatusCodes.OK);
				break;
			default:
				errHandle(res, httpStatusCodes.INTERNAL_SERVER, '錯誤的 Method.');
		}
	} else {
		errHandle(res, httpStatusCodes.NOT_FOUND, '查無此路由.');
	}
}

const server = http.createServer(requestListenner);
server.listen(process.env.PORT || 3005);