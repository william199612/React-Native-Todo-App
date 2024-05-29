const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res) {
	return res
		.status(200)
		.json({ error: false, message: "Users Route" });
});

router.post("/register", async (req, res) => {
	const { name, email, password, birth } = req.body;
	const knex = req.db;
	const salt = Number(process.env.CRYPT_SALT);

	try {
		const hash = await bcrypt.hash(password, salt);
		await knex("User").insert({
			name,
			email,
			password: hash,
			birth,
		});
		return res
			.status(200)
			.json({ error: false, message: "User created" });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: error.message });
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const knex = req.db;

	try {
		const user = await knex("User")
			.where({ email })
			.first();
		if (!user) {
			return res
				.status(404)
				.json({ error: true, message: "User not found" });
		}

		const isMatch = await bcrypt.compare(
			password,
			user.password
		);

		if (!isMatch) {
			return res
				.status(401)
				.json({ message: "Invalid credentials" });
		}
		res
			.status(200)
			.json({ error: false, message: "Login successful" });
	} catch (error) {
		return res
			.status(500)
			.json({ error: true, message: error.message });
	}
});

module.exports = router;
