const express = require("express");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const CourierControllers = require("../controllers/courier");

const router = express.Router();

router.post("", checkAuth, extractFile, CourierControllers.addOrder);

router.get("", checkAuth, CourierControllers.getOrder);

router.delete("/:id", checkAuth, CourierControllers.deleteOrder);

module.exports = router;
