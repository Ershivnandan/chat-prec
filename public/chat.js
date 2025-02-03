import dotenv from 'dotenv'

dotenv.config()

const socket = io(`http://localhost:${process.env.PORT}`)

document.getElementById('join-room').addEventListener('click', () => {
  const room = document.getElementById('room').value
  const token = localStorage.getItem('token')

  socket.emit('joinRoom', { room, token })
})

document.getElementById('send-message').addEventListener('click', () => {
  const message = document.getElementById('message').value
  const room = document.getElementById('room').value
  const token = localStorage.getItem('token')

  socket.emit('sendMessage', { room, message, token })
})

socket.on('message', (msg) => {
  const messageElement = document.createElement('div')
  messageElement.innerText = `${msg.sender}: ${msg.message}`
  document.getElementById('messages').appendChild(messageElement)
})

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token')
  window.location.href = 'index.html'
})
