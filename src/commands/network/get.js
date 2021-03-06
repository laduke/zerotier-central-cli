const axios = require('axios').default

const Command = require('../../api-base.js')
const makeTable = require('../../network-table.js')
const { Network } = require('../../network/network-object.js')

class GetNetwork extends Command {
  async run () {
    const { flags } = this.parse(GetNetwork)
    const {
      args: { networkId },
      argv
    } = this.parse(GetNetwork)

    if (argv.includes('--autocomplete')) {
      return this.central.getNetworks()
        .then(ns => ns.map(n => n.id))
    }

    const req = this.central.networkGet(networkId)
    const { data } = await axios(req)
    const network = Network.fromJSON(data)

    if (flags.json) {
      this.log(JSON.stringify(network, 0, 4))
    } else {
      this.log(makeTable([network], flags))
    }
  }
}

GetNetwork.description = 'get one network'
GetNetwork.args = [
  { name: 'networkId', required: true }
]

GetNetwork.flags = {
  ...Command.flags
}

module.exports = GetNetwork
