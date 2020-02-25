const {Command, flags} = require('@oclif/command')

const conf = require('./conf.js')

class Base extends Command {
  async init() {
    this.flags = flags
    this.conf = conf()
  }
}

Base.strict = false

module.exports = Base
