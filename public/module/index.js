import userLogin from "./userLogin.js"
import userRegister from "./userRegister.js"
import landingPage from "./LandingPage.js"

const button = document.getElementById('button')
button.addEventListener('click', () => {
    userLogin()
    history.pushState({}, '', 'login')
})

window.addEventListener('load', async () => {

    if (location.pathname == '/') {
        const response = await fetch('/me')
        const data = await response.json()
        console.log(data)
        landingPage(data)
    }
    if (location.pathname == '/login') {
        userLogin()
    } else if (location.pathname == '/register') {
        userRegister()
    } else {

    }

    window.addEventListener('popstate', () => {
        if (location.pathname == '/login') {
            userLogin()
        } else if (location.pathname == '/register') {
            userRegister()
        } else {

        }
    })
})