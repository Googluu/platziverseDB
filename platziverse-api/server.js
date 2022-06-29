'use strict'

const debug = require('debug')('platziverse:api')
const express = require('express')

const api = require('./api')

const port = process.env.PORT || 3001

const app = express()

app.use('/api', api)

// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

 app.listen(port, () => {
  console.log('Api escuchando en el puerto ', `${port}`)
})
}

module.exports = app

// process.on('uncaughtException', handleFatalError)
// process.on('unhandledRejection', handleFatalError)

// app.listen(port, () => {
//   console.log('Api escuchando en el puerto ', `${port}`)
// })

// module.exports = app
