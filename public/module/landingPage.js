export default function landingPage(user) {
    const body = window.document.body

    body.innerHTML = `<h1>Seja bem vindo ao site ${user.username} </h1>
    
    <button id="logout"> Logout</button>`

    const logout = document.getElementById('logout')
    logout.addEventListener('click', async () => {
        const response = await fetch('/logout', {
            method: 'POST'
        })
        if (response.ok) {
            alert('Logout realizado com sucesso!')
            window.location.href = '/'
        } else {
            alert('Erro ao fazer logout')
        }
    })
}