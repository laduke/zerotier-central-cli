const axios = require('axios').default
const cli = require('cli-ux').default

const Command = require('../../api-base.js')
const { Network } = require('../../network/network-object')

class ListPools extends Command {
  async run () {
    const { flags } = this.parse(ListPools)
    const { args: { networkId }, argv } = this.parse(ListPools)

    if (argv.includes('--autocomplete')) {
      return this.central.getNetworks()
        .then(ns => ns.map(n => n.id))
    }

    const req = this.central.networkGet(networkId)
    const { data } = await axios(req)
    const network = Network.fromJSON(data)

    if (flags.json) {
      this.log(JSON.stringify(network.ipAssignmentPools, 0, 4))
    } else {
      this.log(makeTable(network.ipAssignmentPools, flags))
    }
  }
}

function makeTable (pools, flags) {
  return cli.table(
    pools,
    {
      ipRangeStart: { header: 'Start' },
      ipRangeEnd: { header: 'End' }
    },
    flags
  )
}

ListPools.description = 'list the ip auto-assign pools on a network'
ListPools.args = [{ name: 'networkId', required: true }]

ListPools.flags = {
  ...Command.flags
}

module.exports = ListPools
