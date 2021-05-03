const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const router = require('./routes/providers')
const NotFound = require('./erros/NotFound')
const InvalidField = require('./erros/InvalidField')
const NoData = require('./erros/NoData')
const UnsupportedValue = require('./erros/UnsupportedValue')
const acceptedFormats = require('./Serializer').acceptedFormats

app.use(bodyParser.json())

app.use( (req, res, next) => {
  
  let reqFormat = req.header('Accept')

  if ( reqFormat === '*/*' ) {
    reqFormat = 'application/json'
  }

  if ( acceptedFormats.indexOf(reqFormat) === -1 ) {
    res.status(406)
    res.end()
    return 
  }

  res.setHeader('Content-Type', reqFormat)
  next()

})

app.use('/api/providers', router)

app.use((error, req, res, next) => {

  let status = 500

  if (error instanceof NotFound) {
    status = 404
  } 
  
  if (error instanceof InvalidField || error instanceof NoData) {
    status = 400
  }

  if (error instanceof UnsupportedValue) {
    status = 406
  }

  res.status(status)
  res.json({
    message: error.message,
    id: error.idError
  })
  
})

app.listen(config.get('api.port'), () => console.log('API running'))