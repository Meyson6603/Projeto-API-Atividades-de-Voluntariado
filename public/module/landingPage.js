import userLogin from "./userLogin.js"
import userRegister from "./userRegister.js"
import alActivities from "./allActivities.js"

export default function landingPage() {
    const body = window.document.body


    body.innerHTML = `<div id="navbar">
        <nav class="navbar">
            <ul>
                <li class="nav-item"><a href="">Home</a></li>
                <li class="nav-item">
                    <a href="#">Atividades ↓</a>
                    <ul class="dropdown">
                        <li><a href="#">Atividades de Hoje</a></li>
                        <li><a href="#" id='allActivities'>Todas as Atividades</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a href="#">Sobre</a></li>
                <li class="nav-item"><a href="#">Contato</a></li>
            </ul>
        </nav>
        <div id="entrance">
            <button id="signIn">Sign In</button>
            <button id="signUp">Sign Up</button>
        </div>
    </div>`
    // body.innerHTML = `<h1>Hello World !</h1>
    // <button id="button">Clica ai</button>`

    const signIn = document.getElementById('signIn')
    signIn.addEventListener('click', () => {
        userRegister()
        history.pushState({}, '', 'register')
    })
    const signUp = document.getElementById('signUp')
    signUp.addEventListener('click', () => {
        userLogin()
        history.pushState({}, '', 'login')
    })
    const allActivities = document.getElementById('allActivities')
    allActivities.addEventListener('click', async () => {
        // const response = await fetch('/getAllActivities')
        // const data = await response.json()

        // console.log(data)
        alActivities(user)
    })
}