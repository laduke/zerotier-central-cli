const axios = require('axios').default

const Command = require('../../api-base.js')
const makeTable = require('../../member-table.js')

class ListMembers extends Command {
  async run () {
    const { flags } = this.parse(ListMembers)
    const {
      args: { networkId }
    } = this.parse(ListMembers)

    const req = this.central.memberList(networkId)
    const { data: members } = await axios(req)

    // cache memberIds
    this.conf.set('memberIds',
      {
        ...this.conf.get('memberIds'), ...{ [networkId]: members.map(n => n.nodeId) }
      })

    if (flags.json) {
      this.log(JSON.stringify(members, 0, 4))
    } else {
      this.log(makeTable(members, flags))
    }
  }
}

ListMembers.description = 'list members of network'
ListMembers.args = [{ name: 'networkId', required: true }]

ListMembers.flags = {
  ...Command.flags
}

module.exports = ListMembers
