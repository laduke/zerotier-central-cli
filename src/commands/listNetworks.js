const {Command, flags} = require('@oclif/command')

const Central = require('zerotier-central-client')
const central = Central({token: 'HYd1EpcmKneb4AM8YujCxPyTaKsMjk8p'})

const header = {
  id: 'id',
  config: {
    name: 'Name',
    private: 'Private',
    multicastLimit: 'multicast',
    mtu: 'mtu',
    enableBroadcast: 'broadcast',
  },
}

class ListNetworks extends Command {
  async run() {
    const {flags} = this.parse(ListNetworks)

    const networks = await central.getNetworks()

    if (flags.json) {
      this.log(JSON.stringify(networks, 0, 4))
    } else {
      this.log('id\tname\tprivate\tmulticast\tmtu\tbroadcast\tdescription')

      networks.forEach(n => {
        this.log(format(n))
      })
    }
  }
}

function format(network) {
  // | column -ts $'\t'
  const {
    id,
    description = '',
    config: {name = '', private: priv, multicastLimit, mtu, enableBroadcast},
  } = network

  return `${id}\t${name.slice(
    0,
    16
  )}\t${priv}\t${multicastLimit}\t${mtu}\t${enableBroadcast}\t${description.slice(
    0,
    16
  )}`
}

ListNetworks.description = `Describe the command here
...
Extra documentation goes here
`

ListNetworks.flags = {
  json: flags.boolean({char: 'j', description: 'output raw json'}),
}

module.exports = ListNetworks
