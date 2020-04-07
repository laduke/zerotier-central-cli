const cli = require('cli-ux').default
const sixPlane = require('./6plane.js')
const rfc4193 = require('./rfc4193.js')

module.exports = makeTable

function makeTable (members, flags) {
  return cli.table(
    members,
    {
      nodeId: { header: 'Node-ID' },
      authorized: { get: row => row.config.authorized },
      name: {},
      online: {},
      description: { extended: true },
      bridging: { get: row => row.config.activeBridge, extended: true },
      auto: { get: row => row.config.noAutoAssignIps, extended: true },
      ipAssignments: {
        header: 'IP-Assignments',
        get: row => (row.config.ipAssignments || []).join('\n')
      },
      lastOnline: { header: 'Last-Online', get: row => new Date(row.lastOnline) },
      creationTime: {
        get: row => row.config.creationTime,
        header: 'Creation-Time',
        extended: true
      },
      clientVersion: { header: 'Version', extended: true },
      physicalAddress: { header: 'Physical-Address', extended: true },
      hidden: { extended: true },
      '6plane': {
        header: '6PLANE',
        description: { extended: true },
        get: row => {
          return sixPlane(row.networkId, row.nodeId)
        },
        extended: true
      },
      rfc4193: {
        header: 'RFC4193',
        description: { extended: true },
        get: row => {
          return rfc4193(row.config.nwid, row.config.id)
        },
        extended: true
      }
    },
    flags
  )
}
