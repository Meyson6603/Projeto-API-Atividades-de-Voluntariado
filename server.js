const express = require('express')
const routerUser = require('./router/users')
const routerActivity = require('./router/activities')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(routerUser)
app.use(routerActivity)
app.use(express.static('./public'))
require('dotenv').config({ path: './config/.env' })
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'index.html')
    res.sendFile(filePath)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Sua API está rondando na porta: ${PORT}`)
})
