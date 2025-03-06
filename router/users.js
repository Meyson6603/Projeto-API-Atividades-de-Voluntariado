const express = require('express')
const path = require('path');
const { getUsers, registerUsers, loginUsers, logout } = require('../controllers/users')
const router = express.Router()
// const { userLogin } = require('../public/module/userLogin')
// import userLogin from '../public/module/userLogin.js';
router.get('/me', getUsers)
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
router.post('/', loginUsers)

router.post('/sla', registerUsers)

router.post('/logout', logout)

// router.get('/m', getAllUsers)




// router.use((req, res) => {
//     const filePath = path.join(__dirname, '..', 'public', 'index.html');
//     res.status(404).sendFile(filePath)
// });

module.exports = router