import createActivityPage from "./createActivityPage.js"

export default function pageADM(user) {
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
        <h1>Seja bem vindo ao sua pagina de Administração, ${user.username}</h1>
        <div id="options">
            <button id="createActivity">Criar Atividade</button>
            <button id="admUsers">Administrar Usuários</button>
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

    const admUsers = document.getElementById('admUsers')
    admUsers.addEventListener('click', listUsers)

    async function listUsers() {
        const boxActivity = document.getElementById('box-activity')
        const back = document.createElement('button')
        try {
            const response = await fetch('/getUsers')
            const data = await response.json()

            const optionsbox = document.getElementById('options')
            optionsbox.innerHTML = ''
            data.forEach(element => {
                const nameUser = document.createElement('div')
                nameUser.innerHTML = `<p>${element.username}</p> <div id='boxManipulation'style='display: flex; gap: 5px;'></div>`
                nameUser.style.display = 'flex'
                nameUser.style.justifyContent = 'space-between'
                nameUser.style.width = '40%'
                optionsbox.appendChild(nameUser)
                // const boxManipulation = document.getElementById('boxManipulation')
                const boxManipulation = document.createElement('div')
                boxManipulation.style.display = 'flex'
                boxManipulation.style.gap = '5px'
                nameUser.appendChild(boxManipulation)
                const seeUser = document.createElement('p')
                seeUser.innerHTML = '👁️'
                seeUser.style.cursor = 'pointer'
                boxManipulation.appendChild(seeUser)
                const delUser = document.createElement('p')
                delUser.innerHTML = '❌'
                delUser.style.cursor = 'pointer'
                boxManipulation.appendChild(delUser)

                // const seeUser = document.getElementById('seeUser')
                seeUser.addEventListener('click', () => {
                    console.log(`Nome: ${element.username}\nEmail: ${element.email}\nRole: ${element.role}`)
                })

                delUser.addEventListener('click', async () => {
                    try {
                        const response = await fetch('/delUser', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: element.email })
                        })

                        const data = await response.json()

                    } catch (error) {
                        console.log(error)
                        console.log(data)
                        back.remove()
                        listUsers()
                    }

                })
            });

            back.innerHTML = 'Voltar'
            boxActivity.appendChild(back)
            back.addEventListener('click', () => {
                pageADM(user)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const createActivity = document.getElementById('createActivity')
    createActivity.addEventListener('click', () => {
        createActivityPage(user)
    })
    // const createActivity = document.getElementById('createActivity')
}