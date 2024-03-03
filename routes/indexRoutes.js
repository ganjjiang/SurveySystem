const express = require("express");
const router = express.Router();
const index = require("../controller/indexController");


//router.route("/").get(index);

router.get("/", (req, res) => {
    res.render("index", { isLoggedIn: req.isLogged })
})

module.exports = router; 