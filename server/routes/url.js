const router = require("express").Router();
const urlController = require("../controllers/url");

router.post("/create", urlController.create);
router.get("/getlinks", urlController.getLink);

module.exports = router;
