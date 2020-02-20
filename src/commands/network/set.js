const assert = require('assert')
const {flags} = require('@oclif/command')
const Command = require('../../api-base.js')
const isIp = require('is-ip')
const isCidr = require('is-cidr')

const makeTable = require('../../network-table.js')

class SetNetwork extends Command {
  async run() {
    const {flags} = this.parse(SetNetwork)
    const {
      args: {networkId},
    } = this.parse(SetNetwork)

    const newFlat = strip(fromFlags(flags))

    this.validate(newFlat)

    const oldNetwork = await this.central.getNetwork(networkId)

    const oldFlat = rwNetworkProps(oldNetwork)
    const merged = {...oldFlat, ...newFlat}

    // console.log(JSON.stringify(flags, 0, 4))
    // console.log(JSON.stringify(unFlat(merged), 0, 4))

    const network = await this.central.setNetwork(networkId, unFlat(merged))

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

function unFlat(props) {
  const {
    ipAssignmentPools,
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
  } = props

  return {
    description,
    config: {
      routes,
      ipAssignmentPools,
      name,
      enableBroadcast,
      private: priv,
      multicastLimit: Number(multicastLimit),
      mtu: Number(mtu),
      v4AssignMode: {zt: zt4},
      v6AssignMode: {zt: zt6, '6plane': sixPlane, rfc4193},
    },
  }
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

function rwNetworkProps(network) {
  const {
    description,
    config: {
      routes,
      name,
      enableBroadcast,
      private: priv,
      multicastLimit,
      mtu,
      v4AssignMode: {zt: zt4},
      v6AssignMode: {zt: zt6, '6plane': sixPlane, rfc4193},
      ipAssignmentPools,
    },
  } = network

  return {
    description,
    enableBroadcast,
    mtu,
    multicastLimit,
    name,
    private: priv,
    rfc4193,
    sixPlane,
    zt4,
    zt6,
    ipAssignmentPools,
    routes,
  }
}

SetNetwork.description = 'change config'
SetNetwork.args = [{name: 'networkId', required: true}]

SetNetwork.flags = {
  ...Command.flags,
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
