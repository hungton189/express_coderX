var express = require('express');
var router = express.Router();

var userController = require("../controllers/user.controller");
var userValidate = require("../middleware/user.middleware")

router.get("/",userController.index);

router.get("/search",userController.search);

router.get('/create',userController.create);

router.get('/:id',userController.viewUser);

router.post('/create',userValidate.postCreate,userController.postCreate);

module.exports = router;