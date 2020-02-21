const conf = require('../../conf.js')
const {flags} = require('@oclif/command')

const Command = require('../../base.js')

class DeleteCommand extends Command {
  async init() {
    this.conf = conf()
    this.flags = this.parse(this.constructor).flags
  }

  async run() {
    const keys = Object.keys(this.flags)

    keys.forEach(flag => {
      this.conf.delete(flag)
    })

    const o = keys.reduce((acc, el) => {
      return {...acc, [el]: this.conf.get(el)}
    }, {})

    this.log(JSON.parse(JSON.stringify(o)))
  }
}

DeleteCommand.description = 'delete key from config'

DeleteCommand.flags = {
  token: flags.boolean(),
  apiBase: flags.boolean(),
}

module.exports = DeleteCommand
