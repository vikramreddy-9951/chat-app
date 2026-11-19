const { body, param, query, validationResult } = require("express-validator");
const Chat = require("../models/chatModel");

const createChatValidator = [
  body("userAId")
    .exists()
    .withMessage("userAId is required")
    .bail()
    .notEmpty()
    .withMessage("userAId cannot be empty")
    .bail()
    .isInt({ min: 1 })
    .withMessage("userAId must be a positive integer")
    .toInt(),
  body("userBId")
    .exists()
    .withMessage("userBId is required")
    .bail()
    .notEmpty()
    .withMessage("userBId cannot be empty")
    .bail()
    .isInt({ min: 1 })
    .withMessage("userBId must be a positive integer")
    .toInt()
    .custom((userBId, { req }) => userBId !== Number(req.body.userAId))
    .withMessage("userAId and userBId must be different")
    .bail()
    .custom(async (userBId) => {
      const existingChat = await Chat.findOne({ where: { userBId } });

      if (existingChat) {
        throw new Error("userBId already exists");
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode : 400,
        success: false,
        message:"Validation Failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

const createFirebaseValidator = [
  body("senderId")
    .exists()
    .withMessage("senderId is required")
    .bail()
    .notEmpty()
    .withMessage("senderId cannot be empty"),
  body("text")
    .exists()
    .withMessage("text is required")
    .bail()
    .notEmpty()
    .withMessage("text cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode : 400,
        success: false,
        message:"Validation Failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

const listFirebaseValidator = [
  param("chatId")
    .notEmpty()
    .withMessage("chatId cannot be empty"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be an integer between 1 and 100")
    .toInt(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Validation Failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

const readStatusValidator = [
  param("chatId")
    .notEmpty()
    .withMessage("chatId cannot be empty"),
  param("messageId")
    .notEmpty()
    .withMessage("messageId cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Validation Failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

const lastSeenMessageValidator = [
  param("chatId")
    .notEmpty()
    .withMessage("chatId cannot be empty"),
  body("messageId")
    .notEmpty()
    .withMessage("messageId is required"),
  body("userId")
    .exists()
    .withMessage("userId is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("userId must be a positive integer")
    .toInt(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Validation Failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

const userIdValidator = [
  param("userId")
    .isInt({ min: 1 })
    .withMessage("userId must be a positive integer")
    .toInt(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Validation Failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = {
  createChatValidator,
  createFirebaseValidator,
  listFirebaseValidator,
  readStatusValidator,
  lastSeenMessageValidator,
  userIdValidator,
};