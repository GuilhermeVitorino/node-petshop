class InvalidField extends Error {
  constructor (field) {
    const message = `Field ${field} is not valid`
    super (message)
    this.name = 'InvalidField'
    this.idError = 1
  }
}

module.exports = InvalidField