const express = require('express')
const routerUser = require('./router/users')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(routerUser)
app.use(express.static('./public'))
require('dotenv').config({ path: './config/.env' })

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Sua API está rondando na porta: ${PORT}`)
})
