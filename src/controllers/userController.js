const { Op } = require("sequelize");
const Chat = require("../models/chatModel");


const getUsersByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const chats = await Chat.findAll({
            where: {
                [Op.or]: [
                    { userAId: userId },
                    { userBId: userId },
                ],
            },
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "User chats fetched successfully",
            data: chats.map((chat) => {
                const chatData = chat.toJSON();

                return {
                    ...chatData,
                    otherUserId: chat.userAId === userId ? chat.userBId : chat.userAId,
                };
            }),
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
    getUsersByUserId,
};