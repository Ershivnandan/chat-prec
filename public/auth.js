const baseURL = `http://localhost:8080`

document.getElementById('show-signup').addEventListener('click', () => {
  document.getElementById('login-form').classList.add('hidden')
  document.getElementById('signup-form').classList.remove('hidden')
})

document.getElementById('show-login').addEventListener('click', () => {
  document.getElementById('signup-form').classList.add('hidden')
  document.getElementById('login-form').classList.remove('hidden')
})

document
  .getElementById('login-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault()

    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value

    try {
      const response = await fetch(`${baseURL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()
      if (response.ok) {
        alert('Login successful!')
      } else {
        alert(result.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('An error occurred. Please try again.')
    }
  })

document
  .getElementById('signup-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault()

    const name = document.getElementById('signup-username').value
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value
    const avatar = document.getElementById('signup-avatar').files[0]

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    if (avatar) formData.append('avatar', avatar)

    try {
      const response = await fetch(`${baseURL}/api/signup`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      if (response.ok) {
        alert('Signup successful!')
      } else {
        alert(result.message || 'Signup failed')
      }
    } catch (error) {
      console.error('Signup error:', error)
      alert('An error occurred. Please try again.')
    }
  })
