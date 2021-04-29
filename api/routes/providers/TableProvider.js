const NotFound = require('../../erros/NotFound')
const Model = require('./ModelTableProvider')

module.exports = {

  list() {
    return Model.findAll()
  },

  async findById (id) {
    const provider = await Model.findOne({
        where: {
          id: id
        }
    })

    if (!provider) {
      throw new NotFound()
    }

    return provider
  },

  insert (provider) {
    return Model.create(provider)
  },

  update (id, dataToUpdate) {
    return Model.update(
      dataToUpdate,
      {
        where: {id: id}
      }
    )
  },

  remove (id) {
    return Model.destroy({
      where: { id: id }
    })
  }
  
}