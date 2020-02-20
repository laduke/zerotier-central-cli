const {flags} = require('@oclif/command')

const Command = require('../../base.js')
const makeTable = require('../../network-table.js')

class ListNetworks extends Command {
  async run() {
    const {flags} = this.parse(ListNetworks)

    const networks = await this.central.getNetworks()

    if (flags.json) {
      this.log(JSON.stringify(networks, 0, 4))
    } else {
      this.log(makeTable(networks, flags))
    }
  }
}

ListNetworks.description = 'list your networks'

ListNetworks.flags = {
  ...Command.flags,
}

module.exports = ListNetworks
