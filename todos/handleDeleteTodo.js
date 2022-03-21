const responseHandle = require('../responseHandle');
const errHandle = require('../errorHandle');
const httpStatusCodes = require('../httpStatusCodes');

function handleDeleteTodo(req, res, todos) {
	if ( req.url.startsWith("/todos/") ) {
		const id = req.url.split('/').pop();
		const index = todos.findIndex(element => element.uuid == 	id);

		if ( index !== -1 ) {
			todos.splice(index, 1);
			responseHandle(res, httpStatusCodes.OK, todos);
		} else {
			errHandle(res, httpStatusCodes.BAD_REQUEST, '查無此 ID');
		}
	} else {
		todos.length = 0;
		responseHandle(res, httpStatusCodes.OK, todos);
	}
}

module.exports = handleDeleteTodo;