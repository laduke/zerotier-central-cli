zerotier-central-cli
====================

Zerotier Central CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/zerotier-central-cli.svg)](https://npmjs.org/package/zerotier-central-cli)
[![Downloads/week](https://img.shields.io/npm/dw/zerotier-central-cli.svg)](https://npmjs.org/package/zerotier-central-cli)
[![License](https://img.shields.io/npm/l/zerotier-central-cli.svg)](https://github.com/laduke/zerotier-central-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g zerotier-central-cli
$ ztc COMMAND
running command...
$ ztc (-v|--version|version)
zerotier-central-cli/0.0.0 darwin-x64 node-v11.10.1
$ ztc --help [COMMAND]
USAGE
  $ ztc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ztc help [COMMAND]`](#ztc-help-command)
* [`ztc list-networks`](#ztc-list-networks)
* [`ztc setup`](#ztc-setup)
* [`ztc status`](#ztc-status)

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

## `ztc list-networks`

list your networks

```
USAGE
  $ ztc list-networks

OPTIONS
  -j, --json         output raw json
  -t, --token=token  my.zerotier.com api access token
```

_See code: [src/commands/list-networks.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.0/src/commands/list-networks.js)_

## `ztc setup`

Save your api token to disk.

```
USAGE
  $ ztc setup

OPTIONS
  -t, --token=token  my.zerotier.com api access token
```

_See code: [src/commands/setup.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.0/src/commands/setup.js)_

## `ztc status`

Describe the command here

```
USAGE
  $ ztc status

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/status.js](https://github.com/laduke/zerotier-central-cli/blob/v0.0.0/src/commands/status.js)_
<!-- commandsstop -->
