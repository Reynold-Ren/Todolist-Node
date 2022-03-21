const responseHandle = require('../responseHandle');
const errHandle = require('../errorHandle');
const httpStatusCodes = require('../httpStatusCodes');

function handleEditTodo(req, res, todos) {
	let body = "";

	req.on('data', chunk => {
		body += chunk;
	})

	req.on('end', () => {
		try {
			const todo = JSON.parse(body).title;
			const id = req.url.split('/').pop();
			const index = todos.findIndex(element => element.uuid == id);

			if ( todo && index !== -1 ) {
					todos[index].title = todo;
					responseHandle(res, httpStatusCodes.OK, todos);
			} else {
				errHandle(res, httpStatusCodes.BAD_REQUEST, '查無此 ID 或欄位名稱錯誤.');
			}
		} catch(error) {
			errHandle(res, httpStatusCodes.INTERNAL_SERVER, error.message);
		}
	})
}

module.exports = handleEditTodo;