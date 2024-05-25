var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res
		.status(200)
		.json({
			unit: "IFN666",
			assignment: "Assignment 3 React Native application",
			topic: "Todo App",
		});
});

module.exports = router;
