const {Command, flags} = require('@oclif/command')

const _central = require('@laduke/zerotier-central-client')
const conf = require('./conf.js')

class Base extends Command {
  async init() {
    const {flags} = this.parse(this.constructor)
    this.flags = flags
    this.conf = conf()

    const token = await this.getToken(flags)
    const base = await this.getBase(flags)

    this.central = _central({token, base})
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

  getBase(flags) {
    if (flags.apiBase) {
      return flags.apiBase
    }

    if (this.conf.get('apiBase')) {
      return this.conf.get('apiBase')
    }
  }
}

Base.flags = {
  token: flags.string({
    char: 't',
    description: 'my.zerotier.com api access token',
  }),
  apiBase: flags.string({
    hidden: false,
    description: 'use a different central instance my-dev.zerotier.com/api',
  }),
}

module.exports = Base
