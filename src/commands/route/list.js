const axios = require('axios').default
const cli = require('cli-ux').default

const Command = require('../../api-base.js')
const { Network } = require('../../network/network-object')

class ListRoutes extends Command {
  async run () {
    const { flags } = this.parse(ListRoutes)
    const { args: { networkId }, argv } = this.parse(ListRoutes)

    if (argv.includes('--autocomplete')) {
      return this.central.getNetworks()
        .then(ns => ns.map(n => n.id))
    }

    const req = this.central.networkGet(networkId)
    const { data } = await axios(req)

    const network = Network.fromJSON(data)

    if (flags.json) {
      this.log(JSON.stringify(network.routes, 0, 4))
    } else {
      this.log(makeTable(network.routes, flags))
    }
  }
}

function makeTable (routes, flags) {
  return cli.table(
    routes,
    {
      target: { },
      via: { get: row => row.via || '-' }
    },
    flags
  )
}

ListRoutes.description = 'list the managed routes on a network'
ListRoutes.args = [{ name: 'networkId', required: true }]

ListRoutes.flags = {
  ...Command.flags
}

module.exports = ListRoutes
