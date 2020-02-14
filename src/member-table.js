const cli = require('cli-ux').default

module.exports = makeTable

function makeTable(members, flags) {
  return cli.table(
    members,
    {
      nodeId: {header: 'Node ID'},
      authorized: {get: row => row.config.authorized},
      name: {},
      online: {},
      description: {},
      bridging: {get: row => row.config.activeBridge},
      auto: {get: row => row.config.noAutoAssignIps},
      ipAssignMents: {
        get: row => (row.config.ipAssignments || []).join(', '),
      },
      clientVersion: {},
      physicalAddress: {},
      hidden: {},
    },
    flags
  )
}
