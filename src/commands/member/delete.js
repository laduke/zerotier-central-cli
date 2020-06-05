const axios = require('axios').default

const { flags } = require('@oclif/command')
const Command = require('../../api-base.js')
const makeTable = require('../../member-table.js')

class DeleteMember extends Command {
  async run () {
    const { flags } = this.parse(DeleteMember)
    const {
      args: { networkId, nodeId }
    } = this.parse(DeleteMember)

    const req = this.central.memberDelete(networkId, nodeId)
    const { data: member } = await axios(req)

    if (flags.json) {
      this.log(JSON.stringify(member, 0, 4))
    } else {
      this.log(`${nodeId} deleted from ${networkId}`)
    }
  }
}

DeleteMember.description = 'Delete a Member from a Network'
DeleteMember.args = [
  { name: 'networkId', required: true },
  { name: 'nodeId', required: true }
]

DeleteMember.flags = {
  ...Command.flags,
  authorized: flags.boolean({ allowNo: true }),
  hidden: flags.boolean({ allowNo: true }),
  name: flags.string({ allowNo: false }),
  description: flags.string({ allowNo: false }),
  activeBridge: flags.boolean({ allowNo: true }),
  noAutoAssignIps: flags.boolean({ allowNo: true })
}

module.exports = DeleteMember
