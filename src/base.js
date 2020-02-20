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
  json: flags.boolean({
    char: 'j',
    description: 'output raw json',
    exclusive: ['csv'],
  }),
  extended: flags.boolean({char: 'e', description: 'extended output'}),
  columns: flags.string({char: 'c'}),
  'no-truncate': flags.boolean({
    exclusive: ['csv'],
    description: 'do not truncate output to fit screen',
  }),
  'no-header': flags.boolean({
    exclusive: ['csv'],
    description: 'hide table header from output',
  }),
  csv: flags.boolean({
    exclusive: ['no-truncate'],
    description: 'output is csv format',
  }),
  sort: flags.string({
    description: 'property to sort by (prepend ' - ' for descending)',
  }),
  filter: flags.string({description: 'filter property by partial string matching, ex: name=foo'}),
}

module.exports = Base
