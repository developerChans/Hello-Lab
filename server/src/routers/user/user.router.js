const router = require("express").Router();
const userService = require("./user.service");

router.get("/", userService.getAllUser);

router.get("/test", userService.test);

//삭제예정
router.get("/register", userService.getAllUser);

router.post("/register", userService.register);

router.post("/login", userService.login);

module.exports = router;
