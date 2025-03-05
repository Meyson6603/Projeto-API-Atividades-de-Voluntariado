// const { json } = require('express')
const Database = require('../database/index')
const dbUsers = new Database('users')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcrypt');
// const { use } = require('../router/users');

const keySecrect = 'kdjkfljsadklfjsdalkjaslkdjsalkdjs'
// const users = [{ id: 1, username: 'Meyson', email: 'meyson6603@gmail.com', password: '123456', role: 'admin' }, { id: 2, username: 'Vitor', email: 'vitor@gmail.com', password: '123456', role: 'admin' }]

function getUsers(req, res) {
    // res.json(null)
    // res.send(`<h1>Apenas um Teste</h1>`)
    // console.log('teste')

    console.log()
    dbUsers.readAllData((err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Erro ao buscar usuários' });
            return;
        }
        console.log(data)
        // res.json(data);
    });
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
    const { username, email, password } = req.body;

    // Verifica se o email já existe no banco
    dbUsers.readAllData((err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao verificar usuários' });
        }

        // Verificar se o email já existe nos dados retornados do banco
        const emailAlreadyExists = data.some(user => {
            const userData = JSON.parse(user.value); // Assumindo que os dados são armazenados como JSON
            return userData.email === email;
        });

        if (emailAlreadyExists) {
            return res.status(409).send('Email já cadastrado');
        }

        // Se o email não existe, cria o novo usuário
        hashPassword(password).then((hashedPassword) => {
            const newUser = { username, email, password: hashedPassword, role: 'user' };

            dbUsers.put(crypto.randomUUID({ number: 1 }), JSON.stringify(newUser), (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Erro ao criar usuário' });
                }

                // Criando o JWT para o novo usuário
                const createJWT = jwt.sign(
                    { username: newUser.username, email: newUser.email, role: newUser.role },
                    keySecrect, // chave secreta para assinar o JWT
                    { expiresIn: '1h' } // Expiração do token (1 hora)
                );

                // Definir o JWT no cookie
                res.cookie('session', createJWT, {
                    // httpOnly: true, // Para proteger o cookie contra acessos via JavaScript
                    // secure: process.env.NODE_ENV === 'production', // Só habilitar o 'secure' em produção (https)
                    maxAge: 3600000 // 1 hora em milissegundos
                });

                // Respondendo com o novo usuário e o token no cookie
                return res.status(201).json({
                    message: 'Usuário registrado com sucesso!',
                    user: newUser,
                });
            });
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao criptografar a senha' });
        });
    });
}


async function loginUsers(req, res) {
    const { email, password } = req.body;

    // Função para envolver o dbUsers.readAllData em uma Promise
    const getAllUsers = () => {
        return new Promise((resolve, reject) => {
            dbUsers.readAllData((err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    };

    try {
        // Usando await para esperar a resposta do banco de dados
        const data = await getAllUsers();

        // Encontrar o usuário com o email fornecido
        const userFound = data.find(user => {
            const userData = JSON.parse(user.value); // Assumindo que os dados são armazenados como JSON
            return userData.email === email;
        });

        if (!userFound) {
            return res.status(401).send('Usuário não encontrado');
        }

        // Verificar se a senha fornecida corresponde ao hash da senha armazenada
        const userData = JSON.parse(userFound.value);
        const isPasswordValid = await verifyPassword(password, userData.password); // Função de verificação de senha

        if (!isPasswordValid) {
            return res.status(401).send('Senha incorreta');
        }

        // Criando o JWT para o usuário
        const createJWT = jwt.sign(
            { username: userData.username, email: userData.email, role: userData.role },
            keySecrect, // chave secreta para assinar o JWT
            { expiresIn: '1h' } // Expiração do token (1 hora)
        );

        // Definir o JWT no cookie
        res.cookie('session', createJWT, {
            // httpOnly: true, // Para proteger o cookie contra acessos via JavaScript
            // secure: process.env.NODE_ENV === 'production', // Só habilitar o 'secure' em produção (https)
            maxAge: 3600000 // 1 hora em milissegundos
        });

        // Responde com o usuário e o token no cookie
        return res.json({
            message: 'Login realizado com sucesso!',
            user: userData, // Pode retornar os dados do usuário sem a senha
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Erro ao processar o login' });
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


async function verifyPassword(inputPassword, storedHashedPassword) {
    const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);
    return isMatch;
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
