const {Command, flags} = require('@oclif/command')

const _central = require('@laduke/zerotier-central-client')
const Conf = require('conf')

class Base extends Command {
  async init() {
    const {flags} = this.parse(this.constructor)
    this.flags = flags
    this.conf = new Conf()
    this.token = await this.getToken(flags)
    this.central = _central({token: this.token})
  }

  getToken(flags) {
    if (flags.token) {
      return flags.token
    }

    if (this.conf.get('token')) {
      return this.conf.get('token')
    }

    this.error('no API token. Use the setup command or the -t flag')
  }
}

Base.flags = {
  token: flags.string({
    char: 't',
    description: 'my.zerotier.com api access token',
  }),
}

module.exports = Base
