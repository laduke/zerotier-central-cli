const cli = require('cli-ux').default

module.exports = makeTable

function makeTable (networks, flags) {
  return cli.table(
    networks,
    {
      id: { header: 'Network-ID', minWidth: 16 },
      name: { minWidth: 10 },
      description: { extended: true },
      private: {},
      authorizedMemberCount: {
        header: 'Authorized'
      },
      onlineMemberCount: {
        header: 'Online'
      },
      zt4: { extended: true, header: 'Auto-4' },
      zt6: {
        extended: true,
        header: 'Auto-6'
      },
      ip6plane: {
        extended: true,
        header: '6PLANE'
      },
      rfc4193: {
        extended: true,
        header: 'RFC4193'
      },
      multicastLimit: {
        extended: true,
        header: 'Multicast'
      },
      mtu: {
        extended: true,
        header: 'MTU'
      },
      enableBroadcast: {
        extended: true,
        header: 'Broadcast'
      },
      ipAssignmentPools: {
        minWidth: 16,
        header: 'Pools',
        get: row => {
          return (row.ipAssignmentPools || [])
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
          return (row.routes || [])
            .map(p => `${p.target} ${p.via ? '- ' + p.via : ''}`)
            .join('\n')
        }
      }
    },
    flags
  )
}
