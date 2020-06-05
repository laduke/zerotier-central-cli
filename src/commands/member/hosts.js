const axios = require('axios').default
const cli = require('cli-ux').default
const { flags } = require('@oclif/command')

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
    this.conf.set('memberIds', {
      ...this.conf.get('memberIds'),
      ...{ [networkId]: members.map(n => n.nodeId) }
    })

    makeHosts(members, flags)
  }
}

ListMembers.description = 'make a hosts file for a network'
ListMembers.args = [{ name: 'networkId', required: true }]

ListMembers.flags = {
  ...Command.flags,
  tld: flags.string({
    description: "last part of the name. for example '.lan'"
  })
}

module.exports = ListMembers

var dashify = require('dashify')
function makeHosts (members, flags) {
  flags['no-header'] = true
  const tld = flags.tld ? `.${flags.tld}` : ''
  return cli.table(
    members,
    {
      ipAssignments: {
        header: 'IP-AssignMents',
        get: row => `${row.config.ipAssignments[0]}`
      },
      nodeId: {
        header: 'Node-ID',
        get: row => `${row.nodeId}.${row.networkId}`
      },
      name: {
        header: 'Name',
        get: row => `${dashify(row.name)}${tld}`
      }
    },
    flags
  )
}
