import express from "express";
import { MongoClient } from 'mongodb';
import code from "./code.js";
import login from "./login.js";

const {
	MONGO_HOSTNAME,
	MONGO_PORT,
	NODE_PORT,
	ADMIN_CODE
} = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

new MongoClient(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}`)
	.connect()
	.then(client => {
		console.log("Connected to mongodb!");
		const db = client.db('no-game');

		app.use('/api/code', code(db, ADMIN_CODE));
		app.use('/api/login', login(db));

		app.listen(NODE_PORT, (error) => {
			if (error) {
				throw error; // e.g. EADDRINUSE
			}
			console.log(`App listening on port ${NODE_PORT}!`);
		});
	}).catch(console.error);
