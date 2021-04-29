class UnsupportedValue extends Error {
  constructor ( contentType ) {
    super ( `Unsupported content type ${ contentType }` )
    this.name = 'UnsupportedValue'
    this.idErro = 3
  }
}

module.exports = UnsupportedValue