const router = require('express').Router()
const TableProvider = require('./TableProvider')
const Provider = require('./Provider')

router.get('/', async (req, res) => {
  const results = await TableProvider.list()
  res.json(results)
})

router.get('/:id', async (req, res) => {

  try {

    const id = req.params.id
    const provider = new Provider({ id: id })
    await provider.findById()
    res.json(provider)

  } catch (error) {
    res.json({
      message: error.message
    })
  }

})

router.put('/:id', async (req, res) => {

  try {

    const id = req.params.id
    const body = req.body

    const data = Object.assign({}, body, {id: id})

    const provider = new Provider(data)

    await provider.update()
    res.end()

  } catch (error) {
    res.json({
      message: error.message
    })
  }

})

module.exports = router