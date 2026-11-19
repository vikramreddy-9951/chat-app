const { FieldValue } = require("firebase-admin/firestore");
const { db } = require("../../db-config/firebase-connection");
const Chat = require("../models/chatModel");

const create = async (req, res, next) => {
    try {

        const { chatId } = req.params;
        const chatdata = await Chat.findOne({
            where: { chatId }
        });

        if (!chatdata) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Chat Data not found",
                data: null
            });
        }
        const message = {
            senderId: req.body.senderId,
            text: req.body.text,
            chatId: req.params.chatId,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
            status: false
        };
        const messageRef = await db
            .collection("chats")
            .doc(req.params.chatId)
            .collection("messages")
            .add(message);

        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Message Inserted successfully",
            data: {
                messageId: messageRef.id,
            }
        });
    } catch (error) {
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
        const snapshot = await db
            .collection("chats")
            .doc(req.params.chatId)
            .collection("messages")
            .orderBy("createdAt", "asc")
            .limit(Number(req.query.limit || 50))
            .get();
        const messages = snapshot.docs.map((document) => {
            const message = document.data();

            return {
                messageId: document.id,
                ...message,
                createdAt: message.createdAt?.toDate().toISOString() || null,
                updatedAt: message.updatedAt?.toDate().toISOString() || null,
            };
        });

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Data fetched successfully",
            data: messages
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: []
        });
    }
};

const updateReadStatus = async (req, res, next) => {
    try {
        const { chatId, messageId } = req.params;
        const messageRef = db
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .doc(messageId);
        const messageSnapshot = await messageRef.get();

        if (!messageSnapshot.exists) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Message not found",
                data: null
            });
        }

        await messageRef.update({ status: true });

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Read status updated successfully",
            data: {
                messageId,
                status: true
            }
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: []
        });
    }
};


const lastSeenMessage = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const { messageId, userId } = req.body;
        const chat = await Chat.findOne({ where: { chatId } });

        if (!chat) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Chat Data not found",
                data: null
            });
        }

        const messageRef = db
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .doc(messageId);
        const messageSnapshot = await messageRef.get();

        if (!messageSnapshot.exists) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Message not found",
                data: null
            });
        }

        await messageRef.update({
            updatedAt: FieldValue.serverTimestamp(),
        });

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Last-seen message updated successfully",
            data:[]
        });

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Internal server error",
            data: []
        });
    }
};

module.exports = {
    create,
    list,
    updateReadStatus,
    lastSeenMessage
}