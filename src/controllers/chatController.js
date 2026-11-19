
const { Op } = require("sequelize");
const Chat = require("../models/chatModel");

const create = async (req, res, next) => {
    try {
        const chat = await Chat.create({
            userAId: req.body.userAId,
            userBId: req.body.userBId,
        });

        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Chat created successfully",
            data: {
                chatId: chat.chatId
            }
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                statusCode: 409,
                success: false,
                message: "userBId already exists",
                data: null
            });
        }

        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: []
        });
    }
};


const list = async (req, res, next) => {
    try {
        const chats = await Chat.findAll({
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Chats fetched successfully",
            data: chats.map((chat) => chat.toJSON()),
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: []
        });
    }
}



module.exports = {
    create,
    list,
};