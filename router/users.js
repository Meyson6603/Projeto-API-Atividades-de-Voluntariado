const express = require('express')
const path = require('path');
const { getUser, getUsers, registerUsers, loginUsers, logout, delUser, putUser, putActivity, delActivity } = require('../controllers/users')
const router = express.Router()
// const { userLogin } = require('../public/module/userLogin')
// import userLogin from '../public/module/userLogin.js';
router.get('/me', getUser)
// router.post('/', (req, res) => {
//     // const us
// })
router.get('/users', getUsers)
router.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    res.sendFile(filePath);
})
router.get('/register', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    res.sendFile(filePath);
})

router.get('/adm', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'index.html')
    res.sendFile(filePath)
})
router.post('/', loginUsers)

router.post('/sla', registerUsers)

router.post('/logout', logout)

router.get('/getUsers', getUsers)
router.put('/putUser', putUser)
router.put('/putActivityUser', putActivity)
router.put('/delActivityUser', delActivity)
// router.put('/putActivity', subscribeToActivity)
router.delete('/delUser', delUser)

// router.get('*', (req, res) => {
//     const filePath = path.join(__dirname, '..', 'public', 'index.html')
//     res.sendFile(filePath)
// })
module.exports = router