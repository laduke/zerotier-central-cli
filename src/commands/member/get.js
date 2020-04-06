const axios = require('axios').default

const Command = require('../../api-base.js')
const makeTable = require('../../member-table.js')

class GetMember extends Command {
  async run () {
    const { flags } = this.parse(GetMember)
    const {
      args: { networkId, nodeId }
    } = this.parse(GetMember)

    const req = this.central.memberGet(networkId, nodeId)
    const { data: member } = await axios(req)

    if (flags.json) {
      this.log(JSON.stringify(member, 0, 4))
    } else {
      this.log(makeTable([member], flags))
    }
  }
}

GetMember.description = 'get one member'
GetMember.args = [
  { name: 'networkId', required: true },
  { name: 'nodeId', required: true }
]

GetMember.flags = {
  ...Command.flags
}

module.exports = GetMember
