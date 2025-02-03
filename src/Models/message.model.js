import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    roomId: { type: String, required: true },
    message: { type: String, required: true },
    isEdited: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const messageModel = mongoose.model('Message', messageSchema)

export default messageModel
