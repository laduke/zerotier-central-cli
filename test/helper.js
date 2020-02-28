const td = require('testdouble')

module.exports = {
  beforeEach: () => {},
  afterEach: () => {
    td.reset()
  }
}
