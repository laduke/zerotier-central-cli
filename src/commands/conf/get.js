const conf = require('../../conf.js')
const { flags } = require('@oclif/command')

const Command = require('../../base.js')

class GetCommand extends Command {
  async init () {
    this.conf = conf()
    this.flags = this.parse(this.constructor).flags
  }

  async run () {
    let keys = Object.keys(this.flags)
    keys =
      keys.length > 0 ? keys : ['token', 'api-base', 'networkIds', 'memberIds']

    const o = keys.reduce((acc, el) => {
      return { ...acc, [el]: this.conf.get(el) }
    }, {})

    this.log(JSON.parse(JSON.stringify(o)))
  }
}

GetCommand.description = 'print saved config'

GetCommand.flags = {
  token: flags.boolean(),
  'api-base': flags.boolean(),
  networkIds: flags.boolean(),
  memberIds: flags.boolean()
}

module.exports = GetCommand
