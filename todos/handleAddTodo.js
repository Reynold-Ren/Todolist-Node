const { v4: uuidv4 } = require('uuid');
const responseHandle = require('../responseHandle');
const errHandle = require('../errorHandle');
const httpStatusCodes = require('../httpStatusCodes');

function handleAddTodo(req, res, todos) {
	let body = "";

	req.on('data', chunk => {
		body += chunk;
	})
	
	req.on('end', () => {
		try {
			const title = JSON.parse(body).title;
			if ( title ) {
				const todo = {
					uuid: uuidv4(),
					title
				};
				todos.push(todo);
				responseHandle(res, httpStatusCodes.OK, todos)
			} else {
				errHandle(res, httpStatusCodes.BAD_REQUEST, '欄位名稱錯誤.');
			}
		} catch(error) {
			errHandle(res, httpStatusCodes.INTERNAL_SERVER, error.message);
		}}
	)
}

module.exports = handleAddTodo;