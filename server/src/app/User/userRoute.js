const router = require("express").Router();
const LoginAuth = require("../../middleware/logintAuth");
const userService = require("./user.service");
const userController = require("./userController");

router.get("/", userController.getAllUser);

router.get("/test", userController.test);

//삭제예정
router.get("/register", userController.getAllUser);

router.post("/register", userController.register);

router.post("/login", LoginAuth, userController.login);

module.exports = router;
