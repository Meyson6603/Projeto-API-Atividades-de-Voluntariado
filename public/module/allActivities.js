import pageADM from "./pageADM.js"
import login from "./login.js"

export default function alActivities(user) {
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
        <div id="allActivityBox">
            
        </div>
        <button id='back'>Voltar</button>
    </div>`

    const allActivityBox = document.getElementById('allActivityBox')
    async function loadActivities() {
        const response = await fetch('/getAllActivities')
        const data = await response.json()

        let activities = []
        data.forEach(element => {
            activities.push({ key: element.key, value: JSON.parse(element.value) });
            // console.log(element.key)// Assumindo que os dados das atividades estão em JSON
        });

        console.log(activities)


        activities.forEach(element => {
            console.log(element)
            const div = document.createElement('div')
            const activityName = document.createElement('p')
            activityName.innerHTML = `Nome da Atividade: ${element.value.activityName} <br>Data: ${element.value.activityDate}`
            div.appendChild(activityName)
            if (user.role == 'admin') {
                const delButton = document.createElement('p')
                delButton.innerHTML = '❌'
                delButton.addEventListener('click', async () => {
                    console.log(data.key)
                    // console.log(div)
                    const response = await fetch('delActivity', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ key: element.key })
                    })

                    const dataa = await response.json()
                    console.log(dataa)
                })
                div.appendChild(delButton)
            }

            if (user.subscribeActivities.find(user => user.key == element.key)) {
                console.log('teste')
                const subscribeButton = document.createElement('button')
                subscribeButton.innerHTML = 'Cancelar Inscrição'
                subscribeButton.style.backgroundColor = 'red'
                subscribeButton.addEventListener('click', async () => {
                    // console.log(data.key)
                    let response = await fetch('/delActivityUser', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: user.email, key: element.key })
                    })

                    let data = await response.json()
                    console.log(data)

                    response = await fetch('delUserActivity', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ key: element.key })

                    })

                    data = await response.json()
                })
                // activityName.innerHTML = element.value.activityName
                // div.appendChild(activityName)
                div.appendChild(subscribeButton)

                allActivityBox.appendChild(div)
            } else {
                console.log('aopa')
                const subscribeButton = document.createElement('button')
                subscribeButton.innerHTML = 'Subscribe'
                subscribeButton.addEventListener('click', async () => {
                    // console.log(data.key)
                    console.log(div)
                    let response = await fetch('putActivity', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ key: element.key })
                    })

                    let data = await response.json()
                    console.log(data)

                    response = await fetch('putActivityUser', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: user.email, key: element.key, value: element.value })
                    })

                    // data = await response.json()

                    alert('cadastrado na atividade com sucesso!')

                    // console.log(data)

                    response = await fetch('/me')

                    data = await response.json()
                    console.log(data)
                    login(data)


                })
                // activityName.innerHTML = element.value.activityName
                // div.appendChild(activityName)
                div.appendChild(subscribeButton)

                allActivityBox.appendChild(div)
            }


        });



    }

    loadActivities()

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


}