const ux = require('cli-ux').default
const conf = require('../conf.js')

const Command = require('../base.js')

class SetupCommand extends Command {
  async init() {
    this.conf = conf()
  }

  async run() {
    const token = await ux.prompt(
      'what is your my.zerotier.com api access token?'
    )
    this.log(`Saving token to ${this.conf.path}`)
    this.conf.set('token', token)
    return token
  }
}

SetupCommand.description = 'save your api token to disk.'

module.exports = SetupCommand
