import userLogin from "./userLogin.js"
import userRegister from "./userRegister.js"
import landingPage from "./LandingPage.js"
import login from "./login.js"

const button = document.getElementById('button')
button.addEventListener('click', () => {
    userLogin()
    history.pushState({}, '', 'login')
})

window.addEventListener('load', async () => {

    if (location.pathname == '/') {
        try {
            const response = await fetch('/me')
            const data = await response.json()
            // console.log(data)
            login(data)
        } catch (error) {
            // console.log('teste')
            landingPage()
        }

    }
    if (location.pathname == '/login') {
        userLogin()
    } else if (location.pathname == '/register') {
        userRegister()
    } else if (location.pathname == '/') {
    } else {

    }

    window.addEventListener('popstate', async () => {
        if (location.pathname == '/login') {
            userLogin()
        } else if (location.pathname == '/register') {
            userRegister()
        } else if (location.pathname == '/') {
            try {
                const response = await fetch('/me')
                const data = await response.json()
                // console.log(data)
                login(data)
            } catch (error) {
                // console.log('teste')
                landingPage()
            }
        }
    })
})