const axios = require('axios').default
const tabtab = require('tabtab')

const Command = require('../../api-base.js')

class Autocomplete extends Command {
  async run () {
    const env = tabtab.parseEnv(process.env)
    const withoutFlags = env.line.split(' ').filter(s => !s.startsWith('-'))
    const [, command] = withoutFlags

    if (command === 'pool:list' || command === 'pool:add') {
      let networkIds = this.conf.get('networkIds') || []

      if (networkIds.length === 0) {
        const req = this.central.networkList()
        const { data: networks } = await axios(req)

        networkIds = networks.map(n => n.id)

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
