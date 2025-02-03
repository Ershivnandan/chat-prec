import dotenv from 'dotenv'

dotenv.config()

const token = localStorage.getItem('token')
const socket = io(`http://localhost:${process.env.PORT}`, {
  query: { token },
})

const logoutButton = document.getElementById('logout')
const onlineUsersContainer = document.getElementById('online-users')
const roomInput = document.getElementById('room-input')
const joinRoomButton = document.getElementById('join-room')

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token')
  window.location.href = '/'
})

socket.on('onlineUsers', (users) => {
  onlineUsersContainer.innerHTML = ''
  users.forEach((user) => {
    const userElement = document.createElement('div')
    userElement.textContent = `${user.username}`
    onlineUsersContainer.appendChild(userElement)
  })
})

joinRoomButton.addEventListener('click', () => {
  const roomName = roomInput.value.trim()
  if (roomName) {
    socket.emit('joinRoom', roomName)
  }
})

socket.on('message', (data) => {
  const messageContainer = document.createElement('div')
  messageContainer.textContent = `${data.username}: ${data.message}`
  document.getElementById('chat-container').appendChild(messageContainer)
})
