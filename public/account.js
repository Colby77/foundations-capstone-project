// http://localhost:4004/\
const userContainer = document.querySelector('#user-info')
const loginForm = document.querySelector('#login-form')
const registerForm = document.querySelector('#register-form')


const register = (obj) => {
    console.log(obj)
    axios.post('http://localhost:4004/register', obj)
    .then((res) => {
        console.log('received:', res.data)
        alert('Account created!')
    }).catch(err => console.log(err))
}

const login = (obj) => {
    console.log(obj)
    axios.post('http://localhost:4004/login', obj)
    .then((res) => {
        console.log(res.data[0])
        showCurrentUser(res.data[0])
    }).catch((err) => {
        alert("Make sure username and password are correct")
        console.log(err)
    })
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
    // console.log(data.user_id)
    userContainer.innerHTML = ""
    const userCard = document.createElement('div')
    userCard.classList.add('user-card')

    userCard.innerHTML = `<p class="username">Welcome, ${data.username}!</p>`
    userContainer.appendChild(userCard)
    getCharacters(data.user_id)
    // currentUser(data.username)
    // currentUserId(data.user_id)
}

const getCharacters = (id) => {
    axios.get(`http://localhost:4004/chars/${id}`)
    .then((res) => {
        console.log(res.data)
        res.data.forEach((element, i) => {
            console.log(res.data[i])
            let char = document.createElement('div')
            char.classList.add('character-card')
            char.innerHTML = `<h2>${res.data[i].name}, ${res.data[i].race} ${res.data[i].class}</h2`
            userContainer.appendChild(char)
        })
    })
}

loginForm.addEventListener('submit', loginSubmitHandler)
registerForm.addEventListener('submit', registerSubmitHandler)

// module.exports = {
//     currentUser: (user) => {
//         return user
//     },
//     currentUserId: (user_id) => {
//         return user_id
//     }
// }