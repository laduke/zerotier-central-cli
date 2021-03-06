const axios = require('axios').default
const tabtab = require('tabtab')
const Command = require('../../api-base.js')

class Autocomplete extends Command {
  async run () {
    const env = tabtab.parseEnv(process.env)
    const withoutFlags = env.line.split(' ').filter(s => !s.startsWith('-'))
    const [, command] = withoutFlags

    if (
      [
        'network:set',
        'network:get',
        'network:save',
        'network:restore'
      ].includes(command)
    ) {
      let networkIds = this.conf.get('networkIds') || []

      if (networkIds.length === 0) {
        const req = this.central.networkList()
        const { data } = await axios(req)
        networkIds = data.map(n => n.id)

        this.conf.set('networkIds', networkIds || [])
      }
      return networkIds
    }
  }
}

Autocomplete.description = 'get one network'
Autocomplete.args = [{ name: 'networkId', required: true }]

Autocomplete.strict = false
Autocomplete.hidden = true

Autocomplete.flags = {
  ...Command.flags
}

module.exports = Autocomplete
