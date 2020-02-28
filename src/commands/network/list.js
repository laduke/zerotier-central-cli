const Command = require('../../api-base.js')
const makeTable = require('../../network-table.js')
const { Network } = require('../../network/network-object.js')

class ListNetworks extends Command {
  async run () {
    const { flags } = this.parse(ListNetworks)

    const response = await this.central.getNetworks()
    const networks = response.map(Network.fromJSON)

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
