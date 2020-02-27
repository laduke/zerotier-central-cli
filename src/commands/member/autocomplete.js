const tabtab = require('tabtab')

const Command = require('../../api-base.js')

class Autocomplete extends Command {
  async run () {
    const env = tabtab.parseEnv(process.env)
    const withoutFlags = env.line.split(' ').filter(s => !s.startsWith('-'))
    const [, command, nwid, nodeid] = withoutFlags

    if (command === 'member:set' || command === 'member:get') {
      if (typeof nodeid === 'string') {
        const tmp = this.conf.get('memberIds') || {}
        let members = tmp[nwid] || []

        if (members.length === 0) {
          members = await this.central
            .getMembers(nwid)
            .then(ms => ms.map(m => m.nodeId).slice(0, 23))

          this.conf.set('memberIds', {
            ...this.conf.get('memberIds'),
            [nwid]: members
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
      networkIds = await this.central
        .getNetworks()
        .then(ns => ns.map(n => n.id))
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
