const axios = require('axios').default
const cli = require('cli-ux').default

const Command = require('../../api-base.js')

class AddPool extends Command {
  async run () {
    const { flags } = this.parse(AddPool)
    const {
      args: { networkId, start, end }
    } = this.parse(AddPool)

    // TODO
    const req = this.central.networkGet(networkId)
    const { data } = await axios(req)
    const pools = data.config.ipAssignmentPools.concat({
      ipRangeStart: start,
      ipRangeEnd: end
    })

    console.log(pools)
    const opts = {
      ...this.central.networkUpdate(networkId),
      data: { config: { ipAssignmentPools: pools } }
    }

    const { data: newNetwork } = await axios(opts)

    if (flags.json) {
      this.log(JSON.stringify(newNetwork.config.ipAssignmentPools, 0, 4))
    } else {
      this.log(makeTable(newNetwork.config.ipAssignmentPools, flags))
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
