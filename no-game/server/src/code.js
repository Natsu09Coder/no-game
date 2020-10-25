import express from "express";

const validCode = 1379;

export default function getRouter(db) {
	const router = express.Router();

	router.get('/', function (request, response) {
		const guess = +request.query.guess;
		if (guess === validCode) {
			response.json({
				"valid": true
			});
		} else {
			response.json({
				"valid": false
			});
		}
	});

	return router;
}
