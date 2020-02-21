const tabtab = require('tabtab')

const Command = require('../../api-base.js')

class Autocomplete extends Command {
  async run() {
    const env = tabtab.parseEnv(process.env)
    const withoutFlags = env.line.split(' ').filter(s => !s.startsWith('-'))
    const [_, command, nwid, nodeid] = withoutFlags

    if (command === 'member:set' || command === 'member:get') {
      if (typeof nodeid === 'string') {
        return this.central
        .getMembers(nwid)
        .then(ms => ms.map(m => m.nodeId).slice(0, 23))
      }
      return this.central.getNetworks().then(ns => ns.map(n => n.id))
    }
    if (command === 'member:list') {
      return this.central.getNetworks().then(ns => ns.map(n => n.id))
    }

    return []
  }
}

Autocomplete.description = 'get one network'
Autocomplete.args = [{name: 'networkId', required: true}]

Autocomplete.strict = false
Autocomplete.hidden = true

Autocomplete.flags = {
  ...Command.flags,
}

module.exports = Autocomplete
