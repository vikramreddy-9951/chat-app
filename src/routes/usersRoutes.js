const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")

const {
    userIdValidator,
} = require("../validators/chatValidator");


router.route("/:userId/chats").get(userIdValidator, userController.getUsersByUserId);

module.exports = router;