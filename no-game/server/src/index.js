import express from "express";
import code from "./code.js";

const {
	NODE_PORT,
	ADMIN_CODE
} = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/code', code(ADMIN_CODE));

app.listen(NODE_PORT, function () {
	console.log(`App listening on port ${NODE_PORT}!`);
});
