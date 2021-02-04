Zerotier Central CLI

Command Line Interface to my.zerotier.com

Still experimenting with the commands/outputs.

# Install
`npm i -g @laduke/zerotier-central-cli`

# examples
`ztc conf:setup` (so you don't have to put your api token every time)

`ztc network:list`

`ztc member:list 6ab565387a82c205 --filter=online=true --sort=creation-time --columns="node-id,name,ip-assignments"`

`ztc member:get 6ab565387a82c205 2244668800 --columns=6plane --no-header`

# save and restore network config and their network member config
- `ztc network:save 8056c2e21cdfd0a6 -j > 8056c2e21cdfd0a6.json`
- `ztc network:create` -> empty network with random ID (1d71939404d798d7)
- `ztc network:restore 1d71939404d798d7 < 8056c2e21cdfd0a6.json`

# Usage
autogenerated from oclif-dev

  <!-- usage -->
```sh-session
$ npm install -g @laduke/zerotier-central-cli
$ ztc COMMAND
running command...
$ ztc (-v|--version|version)
@laduke/zerotier-central-cli/0.0.21 darwin-x64 node-v12.19.0
$ ztc --help [COMMAND]
USAGE
  $ ztc COMMAND
...
```
<!-- usagestop -->
  # Commands
  <!-- commands -->
* [`ztc autocomplete:install`](#ztc-autocompleteinstall)
* [`ztc autocomplete:uninstall`](#ztc-autocompleteuninstall)
* [`ztc conf:clear`](#ztc-confclear)
* [`ztc conf:delete`](#ztc-confdelete)
* [`ztc conf:get`](#ztc-confget)
* [`ztc conf:set`](#ztc-confset)
* [`ztc conf:setup`](#ztc-confsetup)
* [`ztc help [COMMAND]`](#ztc-help-command)
* [`ztc member:delete NETWORKID NODEID`](#ztc-memberdelete-networkid-nodeid)
* [`ztc member:get NETWORKID NODEID`](#ztc-memberget-networkid-nodeid)
* [`ztc member:hosts NETWORKID`](#ztc-memberhosts-networkid)
* [`ztc member:list NETWORKID`](#ztc-memberlist-networkid)
* [`ztc member:set NETWORKID NODEID`](#ztc-memberset-networkid-nodeid)
* [`ztc network:create`](#ztc-networkcreate)
* [`ztc network:delete NETWORKID`](#ztc-networkdelete-networkid)
* [`ztc network:get NETWORKID`](#ztc-networkget-networkid)
* [`ztc network:list`](#ztc-networklist)
* [`ztc network:restore NETWORKID`](#ztc-networkrestore-networkid)
* [`ztc network:save NETWORKID`](#ztc-networksave-networkid)
* [`ztc network:set NETWORKID`](#ztc-networkset-networkid)
* [`ztc pool:add NETWORKID START END`](#ztc-pooladd-networkid-start-end)
* [`ztc pool:list NETWORKID`](#ztc-poollist-networkid)
* [`ztc route:list NETWORKID`](#ztc-routelist-networkid)
* [`ztc status`](#ztc-status)

## `ztc autocomplete:install`

setup autocomplete

```
USAGE
  $ ztc autocomplete:install
```

_See code: [src/commands/autocomplete/install.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/autocomplete/install.js)_

## `ztc autocomplete:uninstall`

setup autocomplete

```
USAGE
  $ ztc autocomplete:uninstall
```

_See code: [src/commands/autocomplete/uninstall.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/autocomplete/uninstall.js)_

## `ztc conf:clear`

clear all config

```
USAGE
  $ ztc conf:clear
```

_See code: [src/commands/conf/clear.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/conf/clear.js)_

## `ztc conf:delete`

delete key from config

```
USAGE
  $ ztc conf:delete

OPTIONS
  --api-base
  --memberIds
  --networkIds
  --token
```

_See code: [src/commands/conf/delete.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/conf/delete.js)_

## `ztc conf:get`

print saved config

```
USAGE
  $ ztc conf:get

OPTIONS
  --api-base
  --memberIds
  --networkIds
  --token
```

_See code: [src/commands/conf/get.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/conf/get.js)_

## `ztc conf:set`

save config

```
USAGE
  $ ztc conf:set

OPTIONS
  --api-base=api-base  save base url (https://my.zerotier.com/api/)
  --token=token        save central api token
```

_See code: [src/commands/conf/set.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/conf/set.js)_

## `ztc conf:setup`

save your api token interactively.

```
USAGE
  $ ztc conf:setup
```

_See code: [src/commands/conf/setup.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/conf/setup.js)_

## `ztc help [COMMAND]`

display help for ztc

```
USAGE
  $ ztc help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `ztc member:delete NETWORKID NODEID`

Delete a Member from a Network

```
USAGE
  $ ztc member:delete NETWORKID NODEID

OPTIONS
  -c, --columns=columns
  -e, --extended             extended output
  -j, --json                 output raw json
  -t, --token=token          my.zerotier.com api access token
  --[no-]activeBridge
  --api-base=api-base        use a different central instance my-dev.zerotier.com/api
  --[no-]authorized
  --csv                      output is csv format
  --description=description
  --filter=filter            filter property by partial string matching, ex: name=foo
  --[no-]hidden
  --name=name
  --no-header                hide table header from output
  --no-truncate              do not truncate output to fit screen
  --[no-]noAutoAssignIps
  --sort=sort
```

_See code: [src/commands/member/delete.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/member/delete.js)_

## `ztc member:get NETWORKID NODEID`

get one member

```
USAGE
  $ ztc member:get NETWORKID NODEID

OPTIONS
  -c, --columns=columns
  -e, --extended         extended output
  -j, --json             output raw json
  -t, --token=token      my.zerotier.com api access token
  --api-base=api-base    use a different central instance my-dev.zerotier.com/api
  --csv                  output is csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/member/get.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/member/get.js)_

## `ztc member:hosts NETWORKID`

make a hosts file for a network

```
USAGE
  $ ztc member:hosts NETWORKID

OPTIONS
  --filter=filter    filter property by partial string matching, ex: name=foo
  --[no-]ip4         include managed ipv4 address
  --[no-]ip6managed  include managed v6 address
  --[no-]ip6plane    include 6PLANE address
  --[no-]ip6prefix   include rfc4193 address
  --sort=sort
  --tld=tld          last part of the name. for example '.lan'
```

_See code: [src/commands/member/hosts.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/member/hosts.js)_

## `ztc member:list NETWORKID`

list members of network

```
USAGE
  $ ztc member:list NETWORKID

OPTIONS
  -c, --columns=columns
  -e, --extended         extended output
  -j, --json             output raw json
  -t, --token=token      my.zerotier.com api access token
  --api-base=api-base    use a different central instance my-dev.zerotier.com/api
  --csv                  output is csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/member/list.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/member/list.js)_

## `ztc member:set NETWORKID NODEID`

change config

```
USAGE
  $ ztc member:set NETWORKID NODEID

OPTIONS
  -c, --columns=columns
  -e, --extended             extended output
  -j, --json                 output raw json
  -t, --token=token          my.zerotier.com api access token
  --[no-]activeBridge
  --api-base=api-base        use a different central instance my-dev.zerotier.com/api
  --[no-]authorized
  --csv                      output is csv format
  --description=description
  --filter=filter            filter property by partial string matching, ex: name=foo
  --[no-]hidden
  --name=name
  --no-header                hide table header from output
  --no-truncate              do not truncate output to fit screen
  --[no-]noAutoAssignIps
  --sort=sort
```

_See code: [src/commands/member/set.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/member/set.js)_

## `ztc network:create`

change config

```
USAGE
  $ ztc network:create

OPTIONS
  -c, --columns=columns
  -e, --extended                         extended output
  -j, --json                             output raw json
  -n, --dry-run
  -t, --token=token                      my.zerotier.com api access token
  --[no-]6plane
  --api-base=api-base                    use a different central instance my-dev.zerotier.com/api
  --csv                                  output is csv format
  --description=description
  --[no-]enableBroadcast
  --filter=filter                        filter property by partial string matching, ex: name=foo
  --ipAssignmentPools=ipAssignmentPools  <rangeStart>-<rangeEnd> overwrites existing
  --mtu=mtu
  --multicastLimit=multicastLimit
  --name=name
  --no-header                            hide table header from output
  --no-truncate                          do not truncate output to fit screen
  --[no-]private
  --[no-]rfc4193
  --routes=routes                        <target>[-via] overwrites existing. Can specify multiple
  --sort=sort
  --[no-]v4AutoAssign
  --[no-]v6AutoAssign
```

_See code: [src/commands/network/create.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/network/create.js)_

## `ztc network:delete NETWORKID`

delete a network

```
USAGE
  $ ztc network:delete NETWORKID

OPTIONS
  -c, --columns=columns
  -e, --extended         extended output
  -j, --json             output raw json
  -n, --dry-run
  -t, --token=token      my.zerotier.com api access token
  --api-base=api-base    use a different central instance my-dev.zerotier.com/api
  --csv                  output is csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/network/delete.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/network/delete.js)_

## `ztc network:get NETWORKID`

get one network

```
USAGE
  $ ztc network:get NETWORKID

OPTIONS
  -c, --columns=columns
  -e, --extended         extended output
  -j, --json             output raw json
  -t, --token=token      my.zerotier.com api access token
  --api-base=api-base    use a different central instance my-dev.zerotier.com/api
  --csv                  output is csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/network/get.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/network/get.js)_

## `ztc network:list`

list your networks

```
USAGE
  $ ztc network:list

OPTIONS
  -c, --columns=columns
  -e, --extended         extended output
  -j, --json             output raw json
  -t, --token=token      my.zerotier.com api access token
  --api-base=api-base    use a different central instance my-dev.zerotier.com/api
  --csv                  output is csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/network/list.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/network/list.js)_

## `ztc network:restore NETWORKID`

Dump network and it's savedMembers

```
USAGE
  $ ztc network:restore NETWORKID

OPTIONS
  -c, --columns=columns
  -e, --extended         extended output
  -j, --json             output raw json
  -t, --token=token      my.zerotier.com api access token
  --api-base=api-base    use a different central instance my-dev.zerotier.com/api
  --csv                  output is csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/network/restore.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/network/restore.js)_

## `ztc network:save NETWORKID`

Dump network and it's members

```
USAGE
  $ ztc network:save NETWORKID

OPTIONS
  -c, --columns=columns
  -e, --extended         extended output
  -j, --json             output raw json
  -t, --token=token      my.zerotier.com api access token
  --api-base=api-base    use a different central instance my-dev.zerotier.com/api
  --csv                  output is csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/network/save.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/network/save.js)_

## `ztc network:set NETWORKID`

change config

```
USAGE
  $ ztc network:set NETWORKID

OPTIONS
  -c, --columns=columns
  -e, --extended                         extended output
  -j, --json                             output raw json
  -n, --dry-run
  -t, --token=token                      my.zerotier.com api access token
  --api-base=api-base                    use a different central instance my-dev.zerotier.com/api
  --csv                                  output is csv format
  --description=description
  --[no-]enableBroadcast
  --filter=filter                        filter property by partial string matching, ex: name=foo
  --[no-]ip6plane
  --[no-]ip6prefix
  --ipAssignmentPools=ipAssignmentPools  <rangeStart>-<rangeEnd> overwrites existing
  --mtu=mtu
  --multicastLimit=multicastLimit
  --name=name
  --no-header                            hide table header from output
  --no-truncate                          do not truncate output to fit screen
  --[no-]private
  --routes=routes                        <target>[-via] overwrites existing. Can specify multiple
  --sort=sort
  --[no-]v4AutoAssign
  --[no-]v6AutoAssign
```

_See code: [src/commands/network/set.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/network/set.js)_

## `ztc pool:add NETWORKID START END`

add an ip auto-assign pool to a network

```
USAGE
  $ ztc pool:add NETWORKID START END

ARGUMENTS
  NETWORKID
  START      IP address
  END        IP address

OPTIONS
  -c, --columns=columns
  -e, --extended         extended output
  -j, --json             output raw json
  -t, --token=token      my.zerotier.com api access token
  --api-base=api-base    use a different central instance my-dev.zerotier.com/api
  --csv                  output is csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/pool/add.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/pool/add.js)_

## `ztc pool:list NETWORKID`

list the ip auto-assign pools on a network

```
USAGE
  $ ztc pool:list NETWORKID

OPTIONS
  -c, --columns=columns
  -e, --extended         extended output
  -j, --json             output raw json
  -t, --token=token      my.zerotier.com api access token
  --api-base=api-base    use a different central instance my-dev.zerotier.com/api
  --csv                  output is csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/pool/list.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/pool/list.js)_

## `ztc route:list NETWORKID`

list the managed routes on a network

```
USAGE
  $ ztc route:list NETWORKID

OPTIONS
  -c, --columns=columns
  -e, --extended         extended output
  -j, --json             output raw json
  -t, --token=token      my.zerotier.com api access token
  --api-base=api-base    use a different central instance my-dev.zerotier.com/api
  --csv                  output is csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=sort
```

_See code: [src/commands/route/list.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/route/list.js)_

## `ztc status`

my.zerotier.com status

```
USAGE
  $ ztc status

OPTIONS
  -c, --columns=columns
  -e, --extended         extended output
  -j, --json             output raw json
  -t, --token=token      my.zerotier.com api access token
  --api-base=api-base    use a different central instance my-dev.zerotier.com/api
  --csv                  output is csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=sort

DESCRIPTION
  not much here
```

_See code: [src/commands/status.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.21/src/commands/status.js)_
<!-- commandsstop -->
