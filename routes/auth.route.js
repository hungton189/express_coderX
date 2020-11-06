var express = require('express');
var router = express.Router();

var authController = require("../controllers/auth.controller");
var authValidate = require("../validation/auth.validate");
router.get("/login",authController.login);

router.post("/login",authValidate.postLogin,authController.postLogin);

module.exports = router;