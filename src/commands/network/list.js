const axios = require('../../fetch.js').default

const Command = require('../../api-base.js')
const makeTable = require('../../network-table.js')
const { Network } = require('../../network/network-object.js')

class ListNetworks extends Command {
  async run () {
    const { flags } = this.parse(ListNetworks)

    const req = this.central.networkList()
    const { data } = await axios(req)
    const networks = data.map(Network.fromJSON)

    // cache network ids
    this.conf.set('networkIds', networks.map(n => n.id))

    if (flags.json) {
      this.log(JSON.stringify(networks, 0, 4))
    } else {
      this.log(makeTable(networks, flags))
    }
  }
}

ListNetworks.description = 'list your networks'

ListNetworks.flags = {
  ...Command.flags
}

module.exports = ListNetworks
