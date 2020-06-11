const axios = require('axios').default
const cli = require('cli-ux').default
const { flags } = require('@oclif/command')
const isIp = require('is-ip')
const isValidHostname = require('is-valid-hostname')

const Command = require('../../api-base.js')
const sixPlane = require('../../6plane.js')
const rfc4193 = require('../../rfc4193.js')

class ListMembers extends Command {
  async run () {
    const { flags } = this.parse(ListMembers)
    const {
      args: { networkId }
    } = this.parse(ListMembers)
    const oc = this

    const req = this.central.memberList(networkId)
    const { data: members } = await axios(req)

    const { data: network } = await axios(this.central.networkGet(networkId))

    // cache memberIds
    this.conf.set('memberIds', {
      ...this.conf.get('memberIds'),
      ...{ [networkId]: members.map(n => n.nodeId) }
    })

    makeHosts(members, flags)

    function makeHosts (members, flags) {
      flags['no-header'] = true
      const tld = flags.tld ? `.${flags.tld}` : ''

      const nameValid = row =>
        isValidHostname(row.name + tld) ? row.name + tld : ''

      const ipv4 = row => {
        return row.config.ipAssignments.filter(isIp.v4)[0]
      }
      const ipv6 = row => {
        return row.config.ipAssignments.filter(isIp.v6)[0]
      }
      const plane = row => sixPlane(row.networkId, row.id)
      const prefix = row => rfc4193(row.networkId, row.id)

      const { v6AssignMode } = network.config
      if (flags.ip6managed == null) {
        flags.ip6managed = v6AssignMode.zt
      }
      if (flags.ip6plane == null) {
        flags.ip6plane = v6AssignMode['6plane']
      }
      if (flags.ip6prefix == null) {
        flags.ip6prefix = v6AssignMode.rfc4193
      }

      if (flags.ip4) {
        oc.log('\n# ZT Managed IPv4')
        table(ipv4, members.filter(ipv4))
      }

      if (flags.ip6plane) {
        oc.log('# 6PLANE')
        table(plane, members)
      }
      if (flags.ip6prefix) {
        oc.log('# RFC4193')
        table(prefix, members)
      }
      if (flags.ip6managed) {
        oc.log('# ZT Managed IPv6')
        table(ipv6, members.filter(ipv6))
      }

      function table (addressfn, members2) {
        cli.table(
          members2,
          {
            ipv4: {
              header: 'ipv4',
              get: addressfn
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
    }
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
  }),
  ip4: flags.boolean({
    allowNo: true,
    description: 'include managed ipv4 address',
    default: true
  }),
  ip6prefix: flags.boolean({
    description: 'include rfc4193 address',
    allowNo: true
  }),
  ip6plane: flags.boolean({
    description: 'include 6PLANE address',
    allowNo: true
  }),
  ip6managed: flags.boolean({
    description: 'include managed v6 address',
    allowNo: true
  })
}

module.exports = ListMembers
