const ux = require('cli-ux').default
const Conf = require('conf')

const Command = require('../base.js')

class SetupCommand extends Command {
  async init() {
    this.conf = new Conf()
  }

  async run() {
    const token = await ux.prompt('what is your my.zerotier.com api access token?')
    this.log(`Saving token to ${this.conf.path}`)
    this.conf.set('token', token)
    return token
  }
}

SetupCommand.description = 'save your api token to disk.'

module.exports = SetupCommand
