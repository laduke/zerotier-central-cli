const {flags} = require('@oclif/command')
const Command = require('../base.js')
const cli = require('cli-ux').default

class ListPools extends Command {
  async run() {
    const {flags} = this.parse(ListPools)
    const {args: {networkId}} = this.parse(ListPools)

    const network = await this.central.getNetwork(networkId)

    if (flags.json) {
      this.log(JSON.stringify(network.config.ipAssignmentPools, 0, 4))
    } else {
      this.log(makeTable(network.config.ipAssignmentPools, flags))
    }
  }
}

function makeTable(routes, flags) {
  return cli.table(
    routes,
    {
      ipRangeStart: {header: 'Start'},
      ipRangeEnd: {header: 'End'},
    },
    flags
  )
}

ListPools.description = 'list the ip auto-assign pools on a network'
ListPools.args = [{name: 'networkId', required: true}]

ListPools.flags = {
  ...Command.flags,
}

module.exports = ListPools
