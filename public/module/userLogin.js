import userRegister from "./userRegister.js"

export default function userLogin() {
    const body = window.document.body

    body.innerHTML = `<div id="box-login">
        <div id="icon">
            <div><span class="material-icons" style="font-size: 40px; color: white;">account_circle</span></div>
        </div>
        <h2>Sign In</h2>
        <form id="form-login">
            <div id="boxUsername"><label for="inputUsename" id="username"><i class="material-icons"
                        id="person">person</i><input type="email" placeholder="Email" name="inputUsename"
                        id="inputUsename"></label></div>
            <div id="boxUsername"><label for="inputUsename" id="username"><i class="material-icons"
                        id="person">lock</i><input type="password" placeholder="Password" name="inputUsename"
                        id="inputPassword"></label></div>
            <button type="submit">Login</button>
            <div id="checkin"><label for="checkbox"><input type="checkbox" name="checkbox" id="checkbox"> Remember me
                </label> <a href="#">Forget Password</a></div>
            <div id="register">
                <p>Don't have an account ? <a>Register Now</a></p>
            </div>

        </form>
    </div>`


    const linkRegister = document.querySelector('#register a')
    // const username = document.getElementById('inputUsename')
    // const password = document.getElementById('inputPassword')

    // console.log(linkRegister)
    const login = document.querySelector('#form-login')

    login.addEventListener('submit', async (e) => {
        const email = document.getElementById('inputUsename')
        const password = document.getElementById('inputPassword')
        e.preventDefault()
        console.log('teste')
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, password: password.value })
        })

        const data = await response.json()
        console.log(data)
        if (data) {
            window.location.href = '/'
        } else {
            alert('Login falhou. Verifique suas credenciais!')
        }


    })
    linkRegister.addEventListener('click', () => {
        history.pushState({}, '', 'register')
        userRegister()
    })

}