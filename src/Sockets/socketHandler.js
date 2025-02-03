import { updateOnlineStatus } from '../Controllers/user.controller.js'
import User from '../Models/user.model.js'

const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id)

    socket.on('joinRoom', async ({ room, username, userId }) => {
      try {
        socket.join(room)
        socket.username = username

        await updateOnlineStatus(userId, true)

        io.to(room).emit('message', {
          user: 'system',
          message: `${username} joined`,
        })

        const userProfile = await User.findById(userId).select('-password')
        io.to(room).emit('userProfile', userProfile)
      } catch (err) {
        console.error('Error on joinRoom:', err)
      }
    })

    socket.on('sendMessage', ({ room, message, sender }) => {
      const msg = { sender, message, room, timestamp: Date.now() }
      io.to(room).emit('message', msg)
    })

    socket.on('editMessage', ({ room, messageId, newMessage }) => {
      const editedMsg = { messageId, newMessage, room, timestamp: Date.now() }
      io.to(room).emit('editMessage', editedMsg)
    })

    socket.on('deleteMessage', ({ room, messageId }) => {
      const deletedMsg = { messageId, room, timestamp: Date.now() }
      io.to(room).emit('deleteMessage', deletedMsg)
    })

    socket.on('disconnect', async () => {
      try {
        if (socket.username) {
          console.log('User disconnected:', socket.username)

          const user = await User.findOne({ username: socket.username })
          if (user) {
            await updateOnlineStatus(user._id, false)
          }

          io.emit('message', {
            user: 'system',
            message: `${socket.username} disconnected`,
          })
        } else {
          console.log('User disconnected, but no username was set:', socket.id)
        }
      } catch (err) {
        console.error('Error on disconnect:', err)
      }
    })
  })
}

export default initSocket
