const {flags} = require('@oclif/command')
const Command = require('../base.js')
const makeTable = require('../network-table.js')

class SetNetwork extends Command {
  async run() {
    const {flags} = this.parse(SetNetwork)
    const {
      args: {networkId},
    } = this.parse(SetNetwork)

    const newFlat = strip(fromFlags(flags))

    const oldNetwork = await this.central.getNetwork(networkId)
    const oldFlat = rwNetworkProps(oldNetwork)
    const merged = {...oldFlat, ...newFlat}

    // console.log('old', oldFlat)
    // console.log('new', newFlat)
    // console.log('merged', merged)
    console.log(unFlat(merged))

    const network = await this.central.setNetwork(networkId, unFlat(merged))

    if (flags.json) {
      this.log(JSON.stringify(network, 0, 4))
    } else {
      this.log(makeTable([network], flags))
    }
  }
}
function strip(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function unFlat(props) {
  const {
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
  } = flags

  return {
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
  }
}

function rwNetworkProps(network) {
  const {
    description,
    config: {
      name,
      enableBroadcast,
      private: priv,
      multicastLimit,
      mtu,
      v4AssignMode: {zt: zt4},
      v6AssignMode: {zt: zt6, '6plane': sixPlane, rfc4193},
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
}

module.exports = SetNetwork
