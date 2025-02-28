const users = [{ id: 1, username: 'Meyson', email: 'meyson6603@gmail.com', password: '123456' }]

function getUsers(req, res) {
    res.json(users)
}

function postUsers(req, res) {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    users.push({ id: users.length + 1, username: username, email: email, password: password })

    res.send('Adicionado com Sucesso')
}

module.exports = { getUsers, postUsers }