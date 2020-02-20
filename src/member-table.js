const cli = require('cli-ux').default

module.exports = makeTable

function makeTable(members, flags) {
  return cli.table(
    members,
    {
      nodeId: {header: 'Node-ID'},
      authorized: {get: row => row.config.authorized},
      name: {},
      online: {},
      description: {},
      bridging: {get: row => row.config.activeBridge},
      auto: {get: row => row.config.noAutoAssignIps},
      ipAssignments: {
        header: 'IP-Assignments',
        get: row => (row.config.ipAssignments || []).join('\n'),
      },
      lastOnline: {header: 'Last-Online'},
      creationTime: {
        get: row => row.config.creationTime,
        header: 'Creation-Time',
      },
      clientVersion: {header: 'Version'},
      physicalAddress: {header: 'Physical-Address'},
      hidden: {},
    },
    flags
  )
}
