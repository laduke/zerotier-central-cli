const Command = require('../../api-base.js')
const makeTable = require('../../network-table.js')

class GetNetwork extends Command {
  async run() {
    const {flags} = this.parse(GetNetwork)
    const {
      args: {networkId},
    } = this.parse(GetNetwork)

    const network = await this.central.getNetwork(networkId)

    if (flags.json) {
      this.log(JSON.stringify(network, 0, 4))
    } else {
      this.log(makeTable([network], flags))
    }
  }
}

GetNetwork.description = 'get one network'
GetNetwork.args = [
  {name: 'networkId', required: true},
]

GetNetwork.flags = {
  ...Command.flags,
}

module.exports = GetNetwork
