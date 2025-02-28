const express = require('express')
const path = require('path');
const { getUsers, postUsers } = require('../controllers/users')
const router = express.Router()


router.get('/users', getUsers)
router.post('/login', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'login.html');
    res.sendFile(filePath);
})
router.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'login.html');
    res.sendFile(filePath);
})
router.post('/login', postUsers)

module.exports = router