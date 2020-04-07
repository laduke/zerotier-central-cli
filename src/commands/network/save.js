const axios = require('axios').default

const Command = require('../../api-base.js')
const makeTable = require('../../network-table.js')
const memberTable = require('../../member-table.js')
const { Network } = require('../../network/network-object.js')
const { Member } = require('../../member/member-object.js')

class SaveNetwork extends Command {
  async run () {
    const { flags } = this.parse(SaveNetwork)
    const {
      args: { networkId },
      argv
    } = this.parse(SaveNetwork)

    if (argv.includes('--autocomplete')) {
      console.error('here\n\n')
      return this.central.getNetworks()
        .then(ns => ns.map(n => n.id))
    }

    const networkReq = this.central.networkGet(networkId)
    const { data } = await axios(networkReq)
    const network = Network.fromJSON(data)

    const memberReq = this.central.memberList(networkId)
    const { data: members } = await axios(memberReq)

    const members2 = members.map(Member.fromJSON)

    if (flags.json) {
      this.log(JSON.stringify({ network, members: members2 }, 0, 4))
    } else {
      this.log(makeTable([network], flags))
      this.log(memberTable(members, flags))
    }
  }
}

SaveNetwork.description = 'Dump network and it\'s members'
SaveNetwork.args = [
  { name: 'networkId', required: true }
]

SaveNetwork.flags = {
  ...Command.flags
}

module.exports = SaveNetwork
