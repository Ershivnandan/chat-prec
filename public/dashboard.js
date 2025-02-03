
const token = localStorage.getItem('authToken')
const socket = io(`http://localhost:8080/api`, {
  query: { token },
})

const logoutButton = document.getElementById('logout')
const onlineUsersContainer = document.getElementById('online-users')
const roomInput = document.getElementById('room-input')
const joinRoomButton = document.getElementById('join-room')

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('authToken')
  window.location.href = '/public/index.html'
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
