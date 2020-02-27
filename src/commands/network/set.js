const assert = require('assert')
const {flags} = require('@oclif/command')
const Command = require('../../api-base.js')
const isIp = require('is-ip')
const isCidr = require('is-cidr')

const makeTable = require('../../network-table.js')
const {Network} = require('../../network/network-object')

class SetNetwork extends Command {
  async run() {
    const {flags} = this.parse(SetNetwork)
    const {
      args: {networkId},
    } = this.parse(SetNetwork)

    const newFlat = Network.fromObj(fromFlags(flags))

    this.validate(newFlat)

    if (flags['dry-run']) {
      return this.log(JSON.stringify(newFlat, 0, 4))
    }

    const network = await this.central.setNetwork(networkId, newFlat)

    if (flags.json) {
      this.log(JSON.stringify(network, 0, 4))
    } else {
      this.log(makeTable([network], flags))
    }
  }

  validate(newFlat) {
    try {
      if (newFlat.ipAssignmentPools) {
        newFlat.ipAssignmentPools.forEach(({ipRangeStart, ipRangeEnd}) => {
          assert(
            isIp(ipRangeStart),
            'ipRangeStart should be an IP address. Got: ' + ipRangeStart
          )
          assert(
            isIp(ipRangeEnd),
            'ipRangeEnd should be an IP address, if defined. Got: ' + ipRangeEnd
          )
        })
      }

      if (newFlat.routes) {
        newFlat.routes.forEach(({target, via}) => {
          assert(
            isCidr(target),
            'Target subnet should be in CIDR notation. Got: ' + target
          )
          assert(
            isIp(via) || via == null,
            'Via should be an IP Address. Got: ' + via
          )
        })
      }
    } catch (error) {
      this.error(error.message)
    }
  }
}
function strip(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function fromFlags(flags) {
  const {
    routes,
    description,
    name,
    enableBroadcast,
    private: priv,
    multicastLimit,
    mtu,
    v4AutoAssign: zt4,
    v6AutoAssign: zt6,
    '6plane': sixPlane,
    rfc4193,
    ipAssignmentPools,
  } = flags

  return {
    routes,
    enableBroadcast,
    multicastLimit,
    description,
    sixPlane,
    rfc4193,
    private: priv,
    name,
    mtu,
    zt4,
    zt6,
    ipAssignmentPools,
  }
}

SetNetwork.description = 'change config'
SetNetwork.args = [{name: 'networkId', required: true}]

SetNetwork.flags = {
  ...Command.flags,
  'dry-run': flags.boolean({char: 'n'}),
  name: flags.string({allowNo: false}),
  description: flags.string({allowNo: false}),

  enableBroadcast: flags.boolean({allowNo: true}),
  private: flags.boolean({allowNo: true}),

  multicastLimit: flags.string({allowNo: false}),
  mtu: flags.string({allowNo: false}),

  v4AutoAssign: flags.boolean({allowNo: true}),
  v6AutoAssign: flags.boolean({allowNo: true}),
  '6plane': flags.boolean({allowNo: true}),
  rfc4193: flags.boolean({allowNo: true}),

  ipAssignmentPools: flags.string({
    description: '<rangeStart>-<rangeEnd> overwrites existing',
    multiple: true,
    parse: input => {
      return [input.split('-')].reduce((acc, a) => {
        return {...acc, ipRangeStart: a[0], ipRangeEnd: a[1]}
      }, {})
    },
    allowNo: false,
  }),
  routes: flags.string({
    description: '<target>[-via] overwrites existing. Can specify multiple',
    multiple: true,
    parse: input => {
      return [input.split('-')].reduce(
        (acc, a) => ({...acc, target: a[0], via: a[1]}),
        {}
      )
    },
    allowNo: true,
  }),
}

module.exports = SetNetwork
