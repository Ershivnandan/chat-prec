import messageModel from '../Models/message.model.js'
import { getOnlineUsers } from '../Utils/socket.util.js'

export const sendMessage = async (req, res, next) => {
  try {
    const { senderId, roomId, message } = req.body
    const newMessage = new messageModel({ senderId, roomId, message })
    await newMessage.save()

    req.io.to(roomId).emit('newMessage', newMessage)

    return res
      .status(200)
      .json({ message: 'Message sent successfully', newMessage })
  } catch (err) {
    next(err)
  }
}

export const getChatHistory = async (req, res, next) => {
  try {
    const { roomId } = req.params
    const chatHistory = await messageModel
      .find({ roomId })
      .sort({ timestamp: 1 })
    return res.status(200).json({ chatHistory })
  } catch (err) {
    next(err)
  }
}

export const editMessage = async (req, res, next) => {
  try {
    const { messageId, newMessage } = req.body
    const updatedMessage = await messageModel.findByIdAndUpdate(
      messageId,
      {
        message: newMessage,
        edited: true,
      },
      { new: true },
    )

    req.io.to(updatedMessage.roomId).emit('editMessage', updatedMessage)

    return res
      .status(200)
      .json({ message: 'Message edited successfully', updatedMessage })
  } catch (err) {
    next(err)
  }
}

export const deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.body
    const deletedMessage = await messageModel.findByIdAndDelete(messageId)

    req.io.to(deletedMessage.roomId).emit('deleteMessage', deletedMessage)

    return res
      .status(200)
      .json({ message: 'Message deleted successfully', deletedMessage })
  } catch (err) {
    next(err)
  }
}

export const getOnlineUsersList = (req, res, next) => {
  try {
    const onlineUsers = getOnlineUsers()
    return res.status(200).json({ onlineUsers })
  } catch (err) {
    next(err)
  }
}
