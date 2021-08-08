const router = require("express").Router();
const LoginAuth = require("../../middleware/logintAuth");
const userService = require("./user.service");

router.get("/", userService.getAllUser);

router.get("/test", userService.test);

//삭제예정
router.get("/register", userService.getAllUser);

router.post("/register", userService.register);

router.post("/login", LoginAuth, userService.login);

module.exports = router;
