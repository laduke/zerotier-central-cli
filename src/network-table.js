const cli = require('cli-ux').default

module.exports = makeTable

function makeTable(networks, flags) {
  return cli.table(
    networks,
    {
      id: {header: 'Network ID', minWidth: 16},
      name: {
        minWidth: 10,
        get: row => row.config.name,
      },
      description: {extended: true},
      private: {
        get: row => row.config.private,
      },
      v4AutoAssign: {
        header: 'Auto-Assign V4',
        get: row => row.config.v4AssignMode.zt,
      },
      v6AutoAssign: {
        header: 'Auto-Assign V6',
        get: row => row.config.v6AssignMode.zt,
      },
      sixPlane: {
        header: '6PLANE',
        get: row => row.config.v6AssignMode['6plane'],
      },
      rfc4193: {
        header: 'RFC4193',
        get: row => row.config.v6AssignMode.rfc4193,
      },
      multicast: {
        get: row => row.config.multicastLimit,
      },
      MTU: {
        get: row => row.config.mtu,
      },
      broadcast: {
        get: row => row.config.enableBroadcast,
      },
    },
    flags
  )
}
