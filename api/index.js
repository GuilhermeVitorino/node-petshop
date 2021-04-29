const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const router = require('./routes/providers')
const NotFound = require('./erros/NotFound')
const InvalidField = require('./erros/InvalidField')
const NoData = require('./erros/NoData')

app.use(bodyParser.json())

app.use('/api/providers', router)

app.use((error, req, res, next) => {

  let status = 500

  if (error instanceof NotFound) {
    status = 404
  } 
  
  if (error instanceof InvalidField || error instanceof NoData) {
    status = 400
  }

  res.status(status)
  res.json({
    message: error.message,
    id: error.idError
  })
  
})

app.listen(config.get('api.port'), () => console.log('API running'))