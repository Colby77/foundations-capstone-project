// http://localhost:4004/\





const userContainer = document.querySelector('#user-info')
const loginForm = document.querySelector('#login-form')
const registerForm = document.querySelector('#register-form')

const register = (obj) => {
    console.log(obj)
    axios.post('http://localhost:4004/register', obj)
    .then((res) => {
        console.log('received:', res.data)
        showCurrentUser(res.data)
    }).catch(err => console.log(err))
}

const login = (obj) => {
    console.log(obj)
    axios.post('http://localhost:4004/login', obj)
    .then((res) => {
        console.log(res.data)
    }).catch(err => console.log('what the?', err))
}

const registerSubmitHandler = (e) => {
    e.preventDefault()
    console.log('register submit')

    let username = document.querySelector('#register-username')
    let email = document.querySelector('#register-email')
    let password = document.querySelector('#register-password')
    let password2 = document.querySelector('#register-password-2')

    if (password.value !== password2.value) {
        alert("Your passwords need to match.")
        return
      }
    let regObj = {
        username: username.value,
        email: email.value,
        password: password.value
    }

    register(regObj)

    username.value = ''
    email.value = ''
    password.value = ''
    password2.value = ''
}

const loginSubmitHandler = (e) => {
    e.preventDefault()
    console.log('login-submit')

    let username = document.querySelector('#login-username')
    let password = document.querySelector('#login-password')

    let loginObj = {
        username: username.value,
        password: password.value
    }

    login(loginObj)

    username.value=""
    password.value=""
}

const showCurrentUser = (data) => {
    userContainer.innerHTML = ""
    const userCard = document.createElement('div')
    userCard.classList.add('user-card')

    userCard.innerHTML = `<p class="username">Welcome, ${data.username}!</p>`
    userContainer.appendChild(userCard)
}

loginForm.addEventListener('submit', loginSubmitHandler)
registerForm.addEventListener('submit', registerSubmitHandler)