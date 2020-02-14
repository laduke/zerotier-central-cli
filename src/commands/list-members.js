const Command = require('../base.js')
const cli = require('cli-ux').default

class ListMembers extends Command {
  async run() {
    const {flags} = this.parse(ListMembers)
    const {
      args: {networkId},
    } = this.parse(ListMembers)

    const members = await this.central.getMembers(networkId)

    if (flags.json) {
      this.log(JSON.stringify(members, 0, 4))
    } else {
      this.log(makeTable(members, flags))
    }
  }
}

function makeTable(routes, flags) {
  return cli.table(
    routes,
    {
      nodeId: {header: 'Node ID'},
      authorized: {get: row => row.config.authorized},
      name: {},
      online: {},
      description: {},
      bridging: {get: row => row.config.activeBridge},
      auto: {get: row => row.config.noAutoAssignIps},
      ipAssignMents: {
        get: row => (row.config.ipAssignments || []).join(', '),
      },
      clientVersion: {},
      physicalAddress: {},
      hidden: {},
    },
    flags
  )
}

ListMembers.description = 'list your networks'
ListMembers.args = [{name: 'networkId', required: true}]

ListMembers.flags = {
  ...Command.flags,
}

module.exports = ListMembers
