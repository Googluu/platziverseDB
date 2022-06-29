'use strict'

const express = require('express')
const debug = require('debug')('platziverse:web')
const path = require('path')
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server)

const port = process.env.PORT || 8081


app.use(express.static(path.join(__dirname, 'public')));

// Socket.io / WebSockets
io.on('connect', (socket) => {
    debug(`Connected to ${socket.id}`)

    socket.on('agent/message', (payload) => {
        console.log(payload)
    })

    setInterval(() => {
        socket.emit('agent/message', { agent: 'xxx-yyy' })
      }, 2000)
})

function handleFatalError (err) {
    console.error(`${chalk.red('[fatal error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
  }

  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log('Api escuchando en el puerto ', `${port}`)
})
