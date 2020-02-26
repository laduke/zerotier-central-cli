
module.exports = {
  id: '9bee8941b5de0691',
  type: 'Network',
  clock: 1581719504559,
  config: {
    authTokens: null,
    creationTime: 0,
    capabilities: [[1, 2]],
    enableBroadcast: true,
    id: '9bee8941b5de0691',
    ipAssignmentPools: [
      {
        ipRangeStart: '2001:abcd::1',
        ipRangeEnd: '2001:abcd::ff',
      },
      {
        ipRangeStart: '172.25.0.1',
        ipRangeEnd: '172.25.255.254',
      },
    ],
    lastModified: 1581719194225,
    mtu: 2800,
    multicastLimit: 16,
    name: 'retro hangliders',
    private: true,
    remoteTraceLevel: 0,
    remoteTraceTarget: null,
    routes: [
      {
        target: '172.25.0.0/16',
      },
    ],
    rules: [
      {
        id: 2,
        not: true,
        or: false,
        type: 'MATCH_TAGS_BITWISE_OR',
        value: 0,
      },
      {
        id: 10,
        not: false,
        or: false,
        type: 'MATCH_TAGS_BITWISE_AND',
        value: 0,
      },
      {
        type: 'ACTION_BREAK',
      },
      {
        type: 'ACTION_ACCEPT',
      },
    ],
    tags: [
      {
        default: 0,
        id: 2,
      },
      {
        default: 0,
        id: 10,
      },
    ],
    v4AssignMode: {
      zt: true,
    },
    v6AssignMode: {
      '6plane': false,
      rfc4193: false,
      zt: false,
    },
  },
  description: 'a',
  rulesSource: 'tag classified\n  id 2\n  enum 0 no\n  enum 1 secret\n  default no\n;\n\ntag clearance\n  id 10\n  default 0\n  flag 0 dev\n  flag 1 staging\n  flag 2 production\n\n;\n\n\n\n#cap tain id 1234 accept;\n\n# If one party is classified, require at least one overlapping clearance bit\nbreak\n  not tor classified 0\n  and tand clearance 0\n;\n\naccept;',
  permissions: {
    '2015c70c-51d8-40cd-920f-4fdaa87c31f3': {
      a: true,
      d: true,
      m: true,
      r: true,
    },
  },
  ownerId: '2015c70c-51d8-40cd-920f-4fdaa87c31f3',
  onlineMemberCount: 0,
  authorizedMemberCount: 11,
  totalMemberCount: 7,
  capabilitiesByName: {},
  tagsByName: {
    classified: {
      default: 0,
      enums: {
        no: 0,
        secret: 1,
      },
      flags: {},
      id: 2,
    },
    clearance: {
      default: 0,
      enums: {},
      flags: {
        dev: 1,
        production: 4,
        staging: 2,
      },
      id: 10,
    },
  },
  ui: {
    membersHelpCollapsed: true,
    rulesHelpCollapsed: true,
    settingsHelpCollapsed: true,
    v4EasyMode: true,
  },
}
