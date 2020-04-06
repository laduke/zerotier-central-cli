const axios = require('axios').default

const { flags } = require('@oclif/command')
const Command = require('../../api-base.js')
const makeTable = require('../../member-table.js')

class SetMember extends Command {
  async run () {
    const { flags } = this.parse(SetMember)
    const {
      args: { networkId, nodeId }
    } = this.parse(SetMember)

    const { hidden, name, description } = flags
    const { authorized, activeBridge, noAutoAssignIps } = flags

    const data = {
      hidden,
      name,
      description,
      config: { authorized, activeBridge, noAutoAssignIps }
    }

    // strip keys with undefined values
    const data2 = JSON.parse(JSON.stringify(data))

    const req = this.central.memberUpdate(networkId, nodeId)
    const { data: member } = await axios({ ...req, data: data2 })

    if (flags.json) {
      this.log(JSON.stringify(member, 0, 4))
    } else {
      this.log(makeTable([member], flags))
    }
  }
}

SetMember.description = 'change config'
SetMember.args = [
  { name: 'networkId', required: true },
  { name: 'nodeId', required: true }
]

SetMember.flags = {
  ...Command.flags,
  authorized: flags.boolean({ allowNo: true }),
  hidden: flags.boolean({ allowNo: true }),
  name: flags.string({ allowNo: false }),
  description: flags.string({ allowNo: false }),
  activeBridge: flags.boolean({ allowNo: true }),
  noAutoAssignIps: flags.boolean({ allowNo: true })
}

module.exports = SetMember
