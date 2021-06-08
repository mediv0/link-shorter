const router = require("express").Router();
const urlController = require("../controllers/url");
const isAuth = require("../middlewares/isAuth");

router.post("/create", urlController.create);
router.get("/getlinks", isAuth, urlController.getLink);

module.exports = router;
