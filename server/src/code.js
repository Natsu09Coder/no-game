import { Router } from "express";

export default function getRouter(validCode) {
	const router = Router();

	router.get('/', function (request, response) {
		const guess = request.query.guess;
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
