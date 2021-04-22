const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const router = require('./routes/providers')

app.use(bodyParser.json())
app.use('/api/providers', router)

app.listen(config.get('api.port'), () => console.log('API running'))