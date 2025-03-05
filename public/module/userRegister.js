import userLogin from "./userLogin.js"

export default function userRegister() {
    const body = window.document.body

    body.innerHTML = `<div id="box-login" style="height: 85%;">
        <div id="icon">
            <div><span class="material-icons" style="font-size: 40px; color: white;">account_circle</span></div>
        </div>
        <h2>Sign In</h2>
        <form id="form-login">
            <div id="boxUsername"><label for="inputUsename" id="username"><i class="material-icons"
                        id="person">person</i><input type="text" placeholder="Username" name="inputUsename"
                        id="inputUsename"></label></div>
            <div id="boxUsername"><label for="inputUsename" id="username"><i class="material-icons"
                        id="person">mail</i><input type="email" placeholder="Email" name="inputUsename"
                        id="inputEmail"></label></div>
            <div id="boxUsername"><label for="inputUsename" id="username"><i class="material-icons"
                        id="person">lock</i><input type="password" placeholder="Password" name="inputUsename"
                        id="inputPassword"></label></div>
            <div id="boxUsername"><label for="inputUsename" id="username"><i class="material-icons"
                        id="person">key</i><input type="password" placeholder="Confirm Password" name="inputUsename"
                        id="confirmPassord"></label></div>            
            <button type="submit">Register</button>
            <div id="register" style="margin-top: 16px;">
                <p>Do have an account ? <a>Login Now</a></p>
            </div>

        </form>
    </div>`


    const linkLogin = document.querySelector('#register a')

    linkLogin.addEventListener('click', () => {
        history.pushState({}, '', 'login')
        userLogin()
    })

    const buttonRegister = document.querySelector('#form-login button')
    buttonRegister.addEventListener('click', async (e) => {
        e.preventDefault()
        const inputEmail = document.getElementById('inputEmail')
        const inputUsename = document.getElementById('inputUsename')
        const inputPassword = document.getElementById('inputPassword')
        const confirmPassord = document.getElementById('confirmPassord')

        if (inputPassword.value == confirmPassord.value) {
            try {
                const response = await fetch('/sla', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: inputUsename.value, email: inputEmail.value, password: inputPassword.value })
                })

                const data = await response.json()
                console.log(data)
                if (data) {
                    window.location.href = '/'
                } else {
                    alert('Registro falhou. por favor, tente novamente!')
                }
            } catch (error) {

            }
        } else {
            alert('a senha tem que ser identicas')
            inputPassword.style.background = 'red'
            confirmPassord.style.background = 'red'
            inputPassword.value = ''
            confirmPassord.value = ''
        }



        // console.log('teste')

    })
}