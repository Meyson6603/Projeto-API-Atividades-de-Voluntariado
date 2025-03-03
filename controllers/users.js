// const { json } = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcrypt');
// const { use } = require('../router/users');

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

async function registerUsers(req, res) {
    const username = req.body.username
    const email = req.body.email
    const password = await hashPassword(req.body.password)

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

async function loginUsers(req, res) {
    const email = req.body.email
    const password = req.body.password
    const loginUser = users.find(user => user.email == email);
    if (!loginUser) {
        return res.status(401).send('Usuário não encontrado');
    }

    const isPasswordValid = await verifyPassword(password, loginUser.password);
    if (isPasswordValid) {
        const createJWT = jwt.sign({ username: loginUser.username, email: loginUser.email, role: loginUser.role }, keySecrect);
        res.cookie('session', createJWT);
        return res.json(loginUser);
    } else {
        return res.status(401).send('Senha incorreta');
    }
}

function logout(req, res) {
    res.clearCookie('session')
    res.status(200).send('Logout realizado com sucesso')

}

module.exports = { getUsers, registerUsers, loginUsers, logout }




async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Função para verificar se a senha informada é válida
async function verifyPassword(inputPassword, storedHashedPassword) {
    const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);
    return isMatch;  // Retorna true se as senhas coincidirem, ou false caso contrário
}

// // Exemplo de uso
// async function example() {
//     const password = 'senhaSegura123';

//     // Gerar o hash da senha
//     const hashedPassword = await hashPassword(password);
//     console.log('Senha armazenada (hash):', hashedPassword);

//     // Verificar a senha
//     const isCorrect = await verifyPassword('senhaSegura123', hashedPassword);
//     console.log('Senha correta?', isCorrect);  // true

//     const isIncorrect = await verifyPassword('senhaErrada123', hashedPassword);
//     console.log('Senha correta?', isIncorrect);  // false
// }
