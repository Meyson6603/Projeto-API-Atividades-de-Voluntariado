export default function login(user) {
    const body = window.document.body

    body.innerHTML = `<div id="navbar">
        <nav class="navbar">
            <ul>
                <li class="nav-item"><a href="#">Home</a></li>
                <li class="nav-item">
                    <a href="#">Atividades ↓</a>
                    <ul class="dropdown">
                        <li><a href="#">Atividades de Hoje</a></li>
                        <li><a href="#">Cadastrar Atividades</a></li>
                        <li><a href="#">Todas as Atividades</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a href="#">Sobre</a></li>
                <li class="nav-item"><a href="#">Contato</a></li>
            </ul>
        </nav>
        <div id="iconUser">
        <h3>Olá, ${user.username}</h3>
            <nav class="navbar">
                <ul>
                    <li class=" nav-item"><i class="material-icons" style="font-size: 40px;">account_circle</i>
                        <ul class="dropdown" style="left: -5px;">
                            <li><a href="#">Ver Perfil</a></li>
                            <li><a href="#">Configurações</a></li>
                            <li><a href="" id="logout">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>

        </div>
    </div>`

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