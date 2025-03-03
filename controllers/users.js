// const { json } = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const keySecrect = 'kdjkfljsadklfjsdalkjaslkdjsalkdjs'
const users = [{ id: 1, username: 'Meyson', email: 'meyson6603@gmail.com', password: '123456', role: 'admin' }, { id: 2, username: 'Vitor', email: 'vitor@gmail.com', password: '123456', role: 'admin' }]

function getUsers(req, res) {
    // res.json(null)
    // res.send(`<h1>Apenas um Teste</h1>`)
    // console.log('teste')
    console.log(users)
    const cookieJWT = req.cookies["session"]
    try {
        const loginUser = jwt.verify(cookieJWT, keySecrect)
        console.log(loginUser.username)
        res.json(loginUser)

    } catch (error) {
        return res.status(404).send('erro de login')
    }

    // console.log(loginUser)
}

function registerUsers(req, res) {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    users.forEach(user => {
        if (user.email == email) {
            return res.status(409).send('Email já cadastrado')
        }
    })
    users.push({ id: crypto.randomUUID, username: username, email: email, password: password, role: 'user' })

    const loginUser = users.find(user => user.email == email && user.password == password)
    if (loginUser) {
        const createJWT = jwt.sign({ username: loginUser.username, email: loginUser.email, role: loginUser.role }, keySecrect)
        res.cookie('session', createJWT)
        // res.status(201).send('Usuário Criado com Sucesso')
        return res.json(loginUser)
    } else {
        console.log(loginUser)
        return res.status(401).send('Usuario ou senha não encontrados')
    }
    // res.send('Adicionado com Sucesso')
}

function loginUsers(req, res) {
    const email = req.body.email
    const password = req.body.password
    console.log(email, password)
    // const { inputUsername, inputPassword } = req.params

    const loginUser = users.find(user => user.email == email && user.password == password)
    if (loginUser) {
        const createJWT = jwt.sign({ username: loginUser.username, email: loginUser.email, role: loginUser.role }, keySecrect)
        res.cookie('session', createJWT)
        return res.json(loginUser)
    } else {
        console.log(loginUser)
        return res.status(401).send('Usuario ou senha não encontrados')
    }
    // console.log(loginUser)

    // res.json(loginUser)

    // const singJWT = jwt.sing({ username: username, email: email, })

    // console.log('teste')
    // console.log(email)
    // res.json({ message: 'Deu bom' })
}

function logout(req, res) {
    res.clearCookie('session')
    res.status(200).send('Logout realizado com sucesso')

}

module.exports = { getUsers, registerUsers, loginUsers, logout }