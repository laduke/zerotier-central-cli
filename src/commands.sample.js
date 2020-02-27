module.exports = [
  [
    {
      id: 'completion',
      description: 'setup autocomplete',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      hidden: true,
      aliases: [],
      flags: {
        a: {
          name: 'a',
          type: 'boolean',
          allowNo: false
        },
        b: {
          name: 'b',
          type: 'boolean',
          allowNo: false
        }
      },
      args: []
    },
    {
      id: 'conf:clear',
      description: 'clear all config',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {},
      args: []
    },
    {
      id: 'conf:delete',
      description: 'delete key from config',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'boolean',
          allowNo: false
        },
        apiBase: {
          name: 'apiBase',
          type: 'boolean',
          allowNo: false
        }
      },
      args: []
    },
    {
      id: 'conf:get',
      description: 'print saved config',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'boolean',
          allowNo: false
        },
        apiBase: {
          name: 'apiBase',
          type: 'boolean',
          allowNo: false
        }
      },
      args: []
    },
    {
      id: 'conf:set',
      description: 'save config',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          description: 'save central api token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description: 'save base url (https://my.zerotier.com/api/)'
        }
      },
      args: []
    },
    {
      id: 'conf:setup',
      description: 'save your api token interactively.',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        }
      },
      args: []
    },
    {
      id: 'list-pools',
      description: 'list the ip auto-assign pools on a network',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      hidden: true,
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        }
      },
      args: [
        {
          name: 'networkId',
          required: true
        }
      ]
    },
    {
      id: 'list-routes',
      description: 'list your networks',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      hidden: true,
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        }
      },
      args: [
        {
          name: 'networkId',
          required: true
        }
      ]
    },
    {
      id: 'member:get',
      description: 'get one member',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        },
        json: {
          name: 'json',
          type: 'boolean',
          char: 'j',
          description: 'output raw json',
          allowNo: false
        },
        extended: {
          name: 'extended',
          type: 'boolean',
          char: 'e',
          description: 'extended output',
          allowNo: false
        },
        columns: {
          name: 'columns',
          type: 'option',
          char: 'c'
        },
        'no-truncate': {
          name: 'no-truncate',
          type: 'boolean',
          description: 'do not truncate output to fit screen',
          allowNo: false
        },
        'no-header': {
          name: 'no-header',
          type: 'boolean',
          description: 'hide table header from output',
          allowNo: false
        },
        csv: {
          name: 'csv',
          type: 'boolean',
          description: 'output is csv format',
          allowNo: false
        },
        sort: {
          name: 'sort',
          type: 'option',
          description: null
        },
        filter: {
          name: 'filter',
          type: 'option',
          description:
            'filter property by partial string matching, ex: name=foo'
        }
      },
      args: [
        {
          name: 'networkId',
          required: true
        },
        {
          name: 'nodeId',
          required: true
        }
      ]
    },
    {
      id: 'member:list',
      description: 'list members of network',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        },
        json: {
          name: 'json',
          type: 'boolean',
          char: 'j',
          description: 'output raw json',
          allowNo: false
        },
        extended: {
          name: 'extended',
          type: 'boolean',
          char: 'e',
          description: 'extended output',
          allowNo: false
        },
        columns: {
          name: 'columns',
          type: 'option',
          char: 'c'
        },
        'no-truncate': {
          name: 'no-truncate',
          type: 'boolean',
          description: 'do not truncate output to fit screen',
          allowNo: false
        },
        'no-header': {
          name: 'no-header',
          type: 'boolean',
          description: 'hide table header from output',
          allowNo: false
        },
        csv: {
          name: 'csv',
          type: 'boolean',
          description: 'output is csv format',
          allowNo: false
        },
        sort: {
          name: 'sort',
          type: 'option',
          description: null
        },
        filter: {
          name: 'filter',
          type: 'option',
          description:
            'filter property by partial string matching, ex: name=foo'
        }
      },
      args: [
        {
          name: 'networkId',
          required: true
        }
      ]
    },
    {
      id: 'member:set',
      description: 'change config',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        },
        json: {
          name: 'json',
          type: 'boolean',
          char: 'j',
          description: 'output raw json',
          allowNo: false
        },
        extended: {
          name: 'extended',
          type: 'boolean',
          char: 'e',
          description: 'extended output',
          allowNo: false
        },
        columns: {
          name: 'columns',
          type: 'option',
          char: 'c'
        },
        'no-truncate': {
          name: 'no-truncate',
          type: 'boolean',
          description: 'do not truncate output to fit screen',
          allowNo: false
        },
        'no-header': {
          name: 'no-header',
          type: 'boolean',
          description: 'hide table header from output',
          allowNo: false
        },
        csv: {
          name: 'csv',
          type: 'boolean',
          description: 'output is csv format',
          allowNo: false
        },
        sort: {
          name: 'sort',
          type: 'option',
          description: null
        },
        filter: {
          name: 'filter',
          type: 'option',
          description:
            'filter property by partial string matching, ex: name=foo'
        },
        authorized: {
          name: 'authorized',
          type: 'boolean',
          allowNo: true
        },
        hidden: {
          name: 'hidden',
          type: 'boolean',
          allowNo: true
        },
        name: {
          name: 'name',
          type: 'option'
        },
        description: {
          name: 'description',
          type: 'option'
        },
        activeBridge: {
          name: 'activeBridge',
          type: 'boolean',
          allowNo: true
        },
        noAutoAssignIps: {
          name: 'noAutoAssignIps',
          type: 'boolean',
          allowNo: true
        }
      },
      args: [
        {
          name: 'networkId',
          required: true
        },
        {
          name: 'nodeId',
          required: true
        }
      ]
    },
    {
      id: 'network:get',
      description: 'get one network',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        },
        json: {
          name: 'json',
          type: 'boolean',
          char: 'j',
          description: 'output raw json',
          allowNo: false
        },
        extended: {
          name: 'extended',
          type: 'boolean',
          char: 'e',
          description: 'extended output',
          allowNo: false
        },
        columns: {
          name: 'columns',
          type: 'option',
          char: 'c'
        },
        'no-truncate': {
          name: 'no-truncate',
          type: 'boolean',
          description: 'do not truncate output to fit screen',
          allowNo: false
        },
        'no-header': {
          name: 'no-header',
          type: 'boolean',
          description: 'hide table header from output',
          allowNo: false
        },
        csv: {
          name: 'csv',
          type: 'boolean',
          description: 'output is csv format',
          allowNo: false
        },
        sort: {
          name: 'sort',
          type: 'option',
          description: null
        },
        filter: {
          name: 'filter',
          type: 'option',
          description:
            'filter property by partial string matching, ex: name=foo'
        }
      },
      args: [
        {
          name: 'networkId',
          required: true
        }
      ]
    },
    {
      id: 'network:list',
      description: 'list your networks',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        },
        json: {
          name: 'json',
          type: 'boolean',
          char: 'j',
          description: 'output raw json',
          allowNo: false
        },
        extended: {
          name: 'extended',
          type: 'boolean',
          char: 'e',
          description: 'extended output',
          allowNo: false
        },
        columns: {
          name: 'columns',
          type: 'option',
          char: 'c'
        },
        'no-truncate': {
          name: 'no-truncate',
          type: 'boolean',
          description: 'do not truncate output to fit screen',
          allowNo: false
        },
        'no-header': {
          name: 'no-header',
          type: 'boolean',
          description: 'hide table header from output',
          allowNo: false
        },
        csv: {
          name: 'csv',
          type: 'boolean',
          description: 'output is csv format',
          allowNo: false
        },
        sort: {
          name: 'sort',
          type: 'option',
          description: null
        },
        filter: {
          name: 'filter',
          type: 'option',
          description:
            'filter property by partial string matching, ex: name=foo'
        }
      },
      args: []
    },
    {
      id: 'network:set',
      description: 'change config',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        },
        json: {
          name: 'json',
          type: 'boolean',
          char: 'j',
          description: 'output raw json',
          allowNo: false
        },
        extended: {
          name: 'extended',
          type: 'boolean',
          char: 'e',
          description: 'extended output',
          allowNo: false
        },
        columns: {
          name: 'columns',
          type: 'option',
          char: 'c'
        },
        'no-truncate': {
          name: 'no-truncate',
          type: 'boolean',
          description: 'do not truncate output to fit screen',
          allowNo: false
        },
        'no-header': {
          name: 'no-header',
          type: 'boolean',
          description: 'hide table header from output',
          allowNo: false
        },
        csv: {
          name: 'csv',
          type: 'boolean',
          description: 'output is csv format',
          allowNo: false
        },
        sort: {
          name: 'sort',
          type: 'option',
          description: null
        },
        filter: {
          name: 'filter',
          type: 'option',
          description:
            'filter property by partial string matching, ex: name=foo'
        },
        name: {
          name: 'name',
          type: 'option'
        },
        description: {
          name: 'description',
          type: 'option'
        },
        enableBroadcast: {
          name: 'enableBroadcast',
          type: 'boolean',
          allowNo: true
        },
        private: {
          name: 'private',
          type: 'boolean',
          allowNo: true
        },
        multicastLimit: {
          name: 'multicastLimit',
          type: 'option'
        },
        mtu: {
          name: 'mtu',
          type: 'option'
        },
        v4AutoAssign: {
          name: 'v4AutoAssign',
          type: 'boolean',
          allowNo: true
        },
        v6AutoAssign: {
          name: 'v6AutoAssign',
          type: 'boolean',
          allowNo: true
        },
        '6plane': {
          name: '6plane',
          type: 'boolean',
          allowNo: true
        },
        rfc4193: {
          name: 'rfc4193',
          type: 'boolean',
          allowNo: true
        },
        ipAssignmentPools: {
          name: 'ipAssignmentPools',
          type: 'option',
          description: '<rangeStart>-<rangeEnd> overwrites existing'
        },
        routes: {
          name: 'routes',
          type: 'option',
          description:
            '<target>[-via] overwrites existing. Can specify multiple'
        }
      },
      args: [
        {
          name: 'networkId',
          required: true
        }
      ]
    },
    {
      id: 'status',
      description: 'my.zerotier.com status\nnot much here',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        },
        json: {
          name: 'json',
          type: 'boolean',
          char: 'j',
          description: 'output raw json',
          allowNo: false
        },
        extended: {
          name: 'extended',
          type: 'boolean',
          char: 'e',
          description: 'extended output',
          allowNo: false
        },
        columns: {
          name: 'columns',
          type: 'option',
          char: 'c'
        },
        'no-truncate': {
          name: 'no-truncate',
          type: 'boolean',
          description: 'do not truncate output to fit screen',
          allowNo: false
        },
        'no-header': {
          name: 'no-header',
          type: 'boolean',
          description: 'hide table header from output',
          allowNo: false
        },
        csv: {
          name: 'csv',
          type: 'boolean',
          description: 'output is csv format',
          allowNo: false
        },
        sort: {
          name: 'sort',
          type: 'option',
          description: null
        },
        filter: {
          name: 'filter',
          type: 'option',
          description:
            'filter property by partial string matching, ex: name=foo'
        }
      },
      args: []
    },
    {
      id: 'tabtab:install',
      description: 'setup autocomplete',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        }
      },
      args: []
    },
    {
      id: 'tabtab:uninstall',
      description: 'setup autocomplete',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        }
      },
      args: []
    },
    {
      id: 'tabtab:use',
      description: 'setup autocomplete',
      pluginName: '@laduke/zerotier-central-cli',
      pluginType: 'core',
      aliases: [],
      flags: {
        token: {
          name: 'token',
          type: 'option',
          char: 't',
          description: 'my.zerotier.com api access token'
        },
        apiBase: {
          name: 'apiBase',
          type: 'option',
          description:
            'use a different central instance my-dev.zerotier.com/api',
          hidden: false
        }
      },
      args: []
    }
  ],
  [
    {
      id: 'help',
      description: 'display help for <%= config.bin %>',
      pluginName: '@oclif/plugin-help',
      pluginType: 'core',
      aliases: [],
      flags: {
        all: {
          name: 'all',
          type: 'boolean',
          description: 'see all commands in CLI',
          allowNo: false
        }
      },
      args: [
        {
          name: 'command',
          description: 'command to show help for',
          required: false
        }
      ]
    }
  ]
]

var env = { complete: true,
  words: 1,
  point: 8,
  line: 'ztc conf',
  partial: 'ztc conf',
  last: 'conf',
  lastPartial: 'conf',
  prev: 'ztc' }
