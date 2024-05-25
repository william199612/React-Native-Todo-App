const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

/* GET home page. */
router.get("/", function (req, res) {
	res.render("user", { title: "Express" });
});

router.get("/register", async (req, res) => {
	const { name, email, password, birth } = req.body;
	const knex = req.db;

	try {
		const hash = await bcrypt.hash(
			password,
			process.env.CRYPT_SALT
		);
		await knex("User").insert({
			name,
			email,
			password: hash,
			birth,
		});
		return res
			.status(200)
			.json({ message: "User created" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

router.get("/login", async (req, res) => {
	const { email, password } = req.body;
	const knex = req.db;

	try {
		const user = await knex("User")
			.where({ email })
			.first();
		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found" });
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
		res.status(200).json({ message: "Login successful" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

module.exports = router;
