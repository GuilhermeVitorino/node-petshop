const InvalidField = require('../../erros/InvalidField')
const NoData = require('../../erros/NoData')
const TableProvider = require('./TableProvider')

class Provider {

  constructor ({id, company, email, category, createdAt, updatedAt, version}) {

    this.id = id
    this.company = company
    this.email = email
    this.category = category
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.version = version

  }

  async create () {
    this.validate()
    const result = await TableProvider.insert({
      company: this.company,
      email: this.email,
      category: this.category
    })

    this.id = result.id
    this.createdAt = result.createdAt
    this.updatedAt = result.updatedAt
    this.version = result.version

  }

  async findById () {

    const provider  = await TableProvider.findById(this.id)
    this.company = provider.company
    this.email = provider.email
    this.category = provider.category
    this.createdAt = provider.createdAt
    this.updatedAt = provider.updatedAt
    this.version = provider.version

  }

  async update(){

    const provider  = await TableProvider.findById(this.id)
    
    const fields =['company', 'email', 'category']
  
    const dataToUpdate = {}

    fields.forEach(field => {

      const value = this[field]

      if (typeof value === 'string' && value.length > 0) {
        dataToUpdate[field] = value
      }

    })

    if (Object.keys(dataToUpdate).length === 0) {
      throw new NoData()
    }

    await TableProvider.update(this.id, dataToUpdate)

  }

  async remove () {
    return TableProvider.remove(this.id)
  }

  validate () {
    
    const fields = ['company', 'email', 'category']

    fields.forEach(field => {

      const value = this[field]

      if (typeof value !== 'string' || value.length === 0) {
        throw new InvalidField(field)
      }

    })

  }

}

module.exports = Provider