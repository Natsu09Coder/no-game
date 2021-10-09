import express from "express";

export default function getRouter(db) {
	const router = express.Router();

	router.get('/', function (request, response) {
		const username = request.query.username;
		const password = request.query.password;
		db.collection('users')
			.findOne(
				{ '_id': username, 'password': password }
				// { projection: { _id: true, password: false } }
			).then(user => {
				if (user === null) {
					response.json({
						"valid": false
					});
				} else {
					response.json({
						"valid": true,
						"name": user._id
					});
				}
			});
	});

	return router;
}
