const conf = require('../../conf.js')
const {flags} = require('@oclif/command')

const Command = require('../../base.js')

class SetCommand extends Command {
  async init() {
    this.conf = conf()
    this.flags = this.parse(this.constructor).flags
  }

  async run() {
    const keys = Object.keys(this.flags)

    keys.forEach(flag => {
      this.conf.set(flag, this.flags[flag])
    })

    const o = keys.reduce((acc, el) => {
      return {...acc, [el]: this.conf.get(el)}
    }, {})

    this.log(JSON.parse(JSON.stringify(o)))
  }
}

SetCommand.description = 'save config'

SetCommand.flags = {
  token: flags.string({description: 'save central api token'}),
  apiBase: flags.string({
    description: 'save base url (https://my.zerotier.com/api/)',
  }),
}

module.exports = SetCommand
