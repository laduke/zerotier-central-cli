const cli = require('cli-ux').default

module.exports = makeTable

function makeTable (networks, flags) {
  return cli.table(
    networks,
    {
      id: { header: 'Network-ID', minWidth: 16 },
      name: {
        minWidth: 10,
        get: row => row.config.name
      },
      description: { extended: true },
      private: {
        get: row => row.config.private
      },
      authorizedMemberCount: {
        header: 'Authorized',
        get: row => row.authorizedMemberCount
      },
      onlineMemberCount: {
        header: 'Online',
        get: row => row.onlineMemberCount
      },
      v4AutoAssign: {
        header: 'ZT4',
        get: row => row.config.v4AssignMode.zt
      },
      v6AutoAssign: {
        header: 'ZT6',
        get: row => row.config.v6AssignMode.zt
      },
      sixPlane: {
        header: '6PLANE',
        get: row => row.config.v6AssignMode['6plane']
      },
      rfc4193: {
        header: 'RFC4193',
        get: row => row.config.v6AssignMode.rfc4193
      },
      multicast: {
        get: row => row.config.multicastLimit
      },
      MTU: {
        extended: true,
        header: 'MTU',
        get: row => row.config.mtu
      },
      broadcast: {
        get: row => row.config.enableBroadcast
      },
      ipAssignmentPools: {
        minWidth: 16,
        header: 'Pools',
        get: row => {
          return (row.config.ipAssignmentPools || [])
            .map(p => `${p.ipRangeStart} - ${p.ipRangeEnd}`)
            .join('\n')
        },
        extended: true
      },
      routes: {
        extended: true,
        minWidth: 15,
        header: 'Routes',
        get: row => {
          return (row.config.routes || [])
            .map(p => `${p.target} ${p.via ? '- ' + p.via : ''}`)
            .join('\n')
        }
      }
    },
    flags
  )
}
