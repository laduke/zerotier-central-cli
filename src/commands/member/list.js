const Command = require('../../api-base.js')
const makeTable = require('../../member-table.js')

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

ListMembers.description = 'list members of network'
ListMembers.args = [{name: 'networkId', required: true}]

ListMembers.flags = {
  ...Command.flags,
}

module.exports = ListMembers
