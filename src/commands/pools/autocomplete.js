const tabtab = require('tabtab')
const Command = require('../../api-base.js')

class Autocomplete extends Command {
  async run () {
    const env = tabtab.parseEnv(process.env)
    const withoutFlags = env.line.split(' ').filter(s => !s.startsWith('-'))
    const [, command] = withoutFlags

    if (command === 'pools:list' || command === 'pools:add') {
      let networkIds = this.conf.get('networkIds') || []

      if (networkIds.length === 0) {
        networkIds = await this.central
          .getNetworks()
          .then(ns => ns.map(n => n.id))

        this.conf.set('networkIds', networkIds || [])
      }
      return networkIds
    }
  }
}

Autocomplete.args = [{ name: 'networkId', required: true }]

Autocomplete.strict = false
Autocomplete.hidden = true

Autocomplete.flags = {
  ...Command.flags
}

module.exports = Autocomplete
