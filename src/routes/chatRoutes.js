const express = require("express");
const chatController = require("../controllers/chatController");
const firebaseController = require("../controllers/firebaseController");
const {
    createChatValidator,
    createFirebaseValidator,
    listFirebaseValidator,
    readStatusValidator,
    lastSeenMessageValidator,
} = require("../validators/chatValidator");

const router = express.Router();

router.route("/create").post(createChatValidator, chatController.create).get(chatController.list);
router.route("/:chatId/message/send").post(createFirebaseValidator,firebaseController.create);
router.route("/:chatId/message").get(listFirebaseValidator, firebaseController.list);
router.route("/:chatId/message/:messageId/read").post(readStatusValidator, firebaseController.updateReadStatus);
router.route("/:chatId/lastseen").post(lastSeenMessageValidator, firebaseController.lastSeenMessage);

module.exports = router;