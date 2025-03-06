import pageADM from "./pageADM.js"

export default function createActivityPage(user) {
    const body = document.body

    body.innerHTML = `<div id="navbar">
        <nav class="navbar">
            <ul>
                <li class="nav-item"><a href="#">Home</a></li>
                <li class="nav-item">
                    <a href="#">Atividades ↓</a>
                    <ul class="dropdown">
                        <li><a href="#">Atividades de Hoje</a></li>
                        <li class='hidden' id='atv'><a href="#">Cadastrar Atividades</a></li>
                        <li><a href="#">Todas as Atividades</a></li>
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
    </div>
    <div id="box-activity">
        <h1>Seja bem vindo ao sua pagina de Administração, Nome da pessoa</h1>
        <div id="createActivityBox">
            <label for="activityName">Nome da Atividade: <input type="text" placeholder="Nome da ativade"
                    id="activityName"></label>
            <label for="activityDate">Data: <input type="date" id="activityDate"></label>
            <label for="activityVacancies">Numero de Vagas: <input type="number" placeholder="Numero de vagas"
                    id="activityVacancies"></label>
            <label for="activityLocation">Local da Atividade: <input type="text" placeholder="Local da ativade"
                    id="activityLocation"></label>

            <button>Criar Atividade</button>
        </div>
        <button id='back'>Voltar</button>
    </div>`

    const backButton = document.getElementById('back')
    backButton.addEventListener('click', () => {
        pageADM(user)
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

}