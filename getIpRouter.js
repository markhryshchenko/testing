const Router = require("express");
const controller = require("./getIpController.js");
const router = new Router();

router.get("/", controller.getUser);

module.exports= router;
