class NoData extends Error {
  constructor () {
    super ('No data received')
    this.name = 'NoData'
    this.idError = 2
  }
}

module.exports = NoData