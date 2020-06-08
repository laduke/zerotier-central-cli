const axios = require('axios').default
const cli = require('cli-ux').default
const { flags } = require('@oclif/command')

const Command = require('../../api-base.js')
const isValidHostname = require('is-valid-hostname')

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
  sort: flags.string({
    description: 'property to sort by (prepend ' - ' for descending)'
  }),
  filter: flags.string({
    description: 'filter property by partial string matching, ex: name=foo'
  }),
  tld: flags.string({
    description: "last part of the name. for example '.lan'"
  })
}

module.exports = ListMembers

function makeHosts (members, flags) {
  flags['no-header'] = true
  const tld = flags.tld ? `.${flags.tld}` : ''

  const nameValid = row => isValidHostname(row.name + tld) ? row.name + tld : ''

  return cli.table(
    members,
    {
      ipAssignments: {
        header: 'IP-Assignments',
        get: row => `${row.config.ipAssignments[0]}`
      },
      nodeId: {
        header: 'Node-ID',
        get: row => `${row.nodeId}.${row.networkId}`
      },
      name: {
        header: 'Name',
        get: nameValid
      },
      // for filtering
      authorized: {
        header: 'Authorized',
        extended: true,
        get: row => row.config.authorized
      },
      online: {
        header: 'online',
        extended: true
      },
      creationTime: {
        get: row => row.config.creationTime,
        header: 'Creation-Time',
        extended: true
      }
    },
    flags
  )
}
