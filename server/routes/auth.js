const router = require("express").Router();
const authController = require("../controllers/auth");
const isAuth = require("../middlewares/isAuth");

router.post("/login", authController.postLogin);
router.post("/signup", authController.postSignup);
router.get("/isAuth", isAuth, authController.isAuth);

module.exports = router;
