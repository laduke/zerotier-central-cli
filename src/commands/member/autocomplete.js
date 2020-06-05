const axios = require('axios').default
const tabtab = require('tabtab')

const Command = require('../../api-base.js')

class Autocomplete extends Command {
  async run () {
    const env = tabtab.parseEnv(process.env)
    const withoutFlags = env.line.split(' ').filter(s => !s.startsWith('-'))
    const [, command, nwid, nodeid] = withoutFlags

    if (
      [
        'member:set',
        'member:get',
        'member:delete',
        'member:list',
        'member:hosts'
      ].includes(command)
    ) {
      if (typeof nodeid === 'string') {
        const tmp = this.conf.get('memberIds') || {}
        const members = tmp[nwid] || []

        if (members.length === 0) {
          const req = this.central.memberList(nwid)
          const { data: members } = await axios(req)

          const memberIds = members.map(m => m.nodeId).slice(0, 23)

          this.conf.set('memberIds', {
            ...this.conf.get('memberIds'),
            [nwid]: memberIds
          })
        }

        return members
      }

      return this.getNetworkIds()
    }

    if (command === 'member:list') {
      return this.getNetworkIds()
    }

    return []
  }

  async getNetworkIds () {
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

Autocomplete.description = 'get one network'
Autocomplete.args = [{ name: 'networkId', required: true }]

Autocomplete.strict = false
Autocomplete.hidden = true

Autocomplete.flags = {
  ...Command.flags
}

module.exports = Autocomplete
