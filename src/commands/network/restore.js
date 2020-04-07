const axios = require('axios').default
var fs = require('fs')

const Command = require('../../api-base.js')
const makeTable = require('../../network-table.js')
const memberTable = require('../../member-table.js')
const { Network } = require('../../network/network-object.js')
const { Member } = require('../../member/member-object.js')

class RestoreNetwork extends Command {
  async run () {
    const self = this
    const { flags } = this.parse(RestoreNetwork)
    const {
      args: { networkId },
      argv
    } = this.parse(RestoreNetwork)

    if (argv.includes('--autocomplete')) {
      return this.central.getNetworks().then(ns => ns.map(n => n.id))
    }

    const data = JSON.parse(fs.readFileSync(process.stdin.fd, 'utf-8'))

    const network = Network.fromJSON(data.network)
    const savedMembers = data.members
      .map(m => ({ ...m, networkId }))
      .map(Member.fromJSON)

    const postNetwork = this.central.networkUpdate(networkId)
    const opts = { ...postNetwork, data: Network.fromObj(network) }
    await axios(opts)

    // there's no api to replace the members list
    await deleteAll()
    async function deleteAll () {
      const memberReq = self.central.memberList(networkId)
      const { data: currentMembers } = await axios(memberReq)

      for await (const member of currentMembers) {
        const req = self.central.memberDelete(networkId, member.nodeId)
        await axios(req)
      }
    }

    await addAll()
    async function addAll () {
      for await (const member of savedMembers) {
        const postMember = self.central.memberUpdate(networkId, member.nodeId)
        const opts = { ...postMember, data: member.no() }
        await axios(opts)
      }
    }

    await print()
    async function print () {
      const networkReq = self.central.networkGet(networkId)
      const { data } = await axios(networkReq)
      const network = Network.fromJSON(data)

      const memberReq = self.central.memberList(networkId)
      const { data: savedMembers } = await axios(memberReq)

      const members2 = savedMembers.map(Member.fromJSON)
      if (flags.json) {
        self.log(JSON.stringify({ network, savedMembers: members2 }, 0, 4))
      } else {
        self.log(makeTable([network], flags))
        self.log(memberTable(savedMembers, flags))
      }
    }
  }
}

RestoreNetwork.description = "Dump network and it's savedMembers"
RestoreNetwork.args = [{ name: 'networkId', required: true }]

RestoreNetwork.flags = {
  ...Command.flags
}

module.exports = RestoreNetwork
