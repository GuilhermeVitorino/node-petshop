const ModelTableProviders = require('../routes/providers/ModelTableProvider')

ModelTableProviders
  .sync()
  .then(() => console.log('Table created with success!'))
  .catch(console.log)