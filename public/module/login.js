import pageADM from "./pageADM.js"
import alActivities from "./allActivities.js"


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
                        <li class='hidden' id='atv'><a href="#">Cadastrar Atividades</a></li>
                        <li><a href="#" id='allActivities'>Todas as Atividades</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a href="#">Sobre</a></li>
                <li class="nav-item"><a href="#">Contato</a></li>
                <li class="nav-item hidden" id='adm'><button style='background: none; border: none; cursor: pointer;'>Administrar</button></li>
            </ul>
        </nav>
        <div id="iconUser">
        <h3>Olá, ${user.username}</h3>
            <nav class="navbar">
                <ul>
                    <li class=" nav-item"><i class="material-icons" style="font-size: 40px;">account_circle</i>
                        <ul class="dropdown" style="left: 80px;">
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

    const linkAdm = document.getElementById('adm')
    const linkNewActivity = document.getElementById('atv')
    if (user.role == 'admin') {
        linkAdm.style.display = 'flex'
        linkNewActivity.style.display = 'flex'
    }

    linkAdm.addEventListener('click', () => {
        pageADM(user)
        history.pushState({}, '', 'adm')
    })
    const allActivities = document.getElementById('allActivities')
    allActivities.addEventListener('click', (e) => {
        // const response = await fetch('/getAllActivities')
        // const data = await response.json()

        console.log(user)
        e.preventDefault()
        alActivities(user)
    })
}