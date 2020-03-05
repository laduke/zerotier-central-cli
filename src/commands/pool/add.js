const cli = require('cli-ux').default

const Command = require('../../api-base.js')

class AddPool extends Command {
  async run () {
    const { flags } = this.parse(AddPool)
    const {
      args: { networkId }
    } = this.parse(AddPool)

    const network = await this.central.setNetwork(networkId, {})

    if (flags.json) {
      this.log(JSON.stringify(network.config.ipAssignmentPools, 0, 4))
    } else {
      this.log(makeTable(network.config.ipAssignmentPools, flags))
    }
  }
}

function makeTable (routes, flags) {
  return cli.table(
    routes,
    {
      ipRangeStart: { header: 'Start' },
      ipRangeEnd: { header: 'End' }
    },
    flags
  )
}

AddPool.description = 'add an ip auto-assign pool to a network'
AddPool.args = [
  { name: 'networkId', required: true },
  { name: 'start', required: true, description: 'IP address' },
  { name: 'end', required: true, description: 'IP address' }
]

AddPool.flags = {
  ...Command.flags
}

module.exports = AddPool
