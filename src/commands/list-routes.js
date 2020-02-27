const Command = require('../base.js')
const cli = require('cli-ux').default

class ListRoutes extends Command {
  async run () {
    const { flags } = this.parse(ListRoutes)
    const { args: { networkId } } = this.parse(ListRoutes)

    const network = await this.central.getNetwork(networkId)

    if (flags.json) {
      this.log(JSON.stringify(network.config.routes, 0, 4))
    } else {
      this.log(makeTable(network.config.routes, flags))
    }
  }
}

function makeTable (routes, flags) {
  return cli.table(
    routes,
    {
      target: {},
      via: { get: row => row.via || '-' }
    },
    flags
  )
}

ListRoutes.description = 'list your networks'
ListRoutes.args = [{ name: 'networkId', required: true }]
ListRoutes.hidden = true

ListRoutes.flags = {
  ...Command.flags
}

module.exports = ListRoutes
