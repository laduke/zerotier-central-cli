const {flags} = require('@oclif/command')
const Command = require('../base.js')
const makeTable = require('../member-table.js')

class SetNetwork extends Command {
  async run() {
    const {flags} = this.parse(SetNetwork)
    const {
      args: {networkId, nodeId},
    } = this.parse(SetNetwork)

    const {hidden, name, description} = flags
    const {authorized, activeBridge, noAutoAssignIps} = flags

    const data = {
      hidden, name, description,
      config: {authorized, activeBridge, noAutoAssignIps},
    }

    // strip keys with undefined values
    const data2 = JSON.parse(JSON.stringify(data))

    const member = await this.central.setMember(networkId, nodeId, data2)

    if (flags.json) {
      this.log(JSON.stringify(member, 0, 4))
    } else {
      this.log(makeTable([member], flags))
    }
  }
}

SetNetwork.description = 'change config'
SetNetwork.args = [
  {name: 'networkId', required: true},
]

SetNetwork.flags = {
  ...Command.flags,
  authorized: flags.boolean({allowNo: true}),
  hidden: flags.boolean({allowNo: true}),
  name: flags.string({allowNo: false}),
  description: flags.string({allowNo: false}),
  activeBridge: flags.boolean({allowNo: true}),
  noAutoAssignIps: flags.boolean({allowNo: true}),
}

module.exports = SetNetwork
