import userLogin from "./userLogin.js"

export default function userRegister() {
    const body = window.document.body

    body.innerHTML = `<div id="box-login" style="height: 80%;">
        <div id="icon">
            <div><span class="material-icons" style="font-size: 40px; color: white;">account_circle</span></div>
        </div>
        <h2>Sign In</h2>
        <form action="" id="form-login">
            <div id="boxUsername"><label for="inputUsename" id="username"><i class="material-icons"
                        id="person">person</i><input type="text" placeholder="Username" name="inputUsename"
                        id="inputUsename"></label></div>
            <div id="boxUsername"><label for="inputUsename" id="username"><i class="material-icons"
                        id="person">lock</i><input type="text" placeholder="Password" name="inputUsename"
                        id="inputUsename"></label></div>
            <div id="boxUsername"><label for="inputUsename" id="username"><i class="material-icons"
                        id="person">key</i><input type="text" placeholder="Confirm Password" name="inputUsename"
                        id="inputUsename"></label></div>
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
}