// const axios = require('axios').default
const { flags } = require('@oclif/command')

const Command = require('../../api-base.js')

class SetNetwork extends Command {
  async run () {
    const { flags } = this.parse(SetNetwork)
    const {
      args: { networkId }
    } = this.parse(SetNetwork)

    const req = this.central.networkDelete(networkId)
    if (flags['dry-run']) {
      this.log(`dry run: delete ${networkId}`)
      if (flags.json) {
        this.log(req)
      }
      return
    }

    // const data = await axios(req)

    this.log(`deleted ${networkId}`)
    if (flags.json) {
      this.log(req)
    }
  }
}

SetNetwork.description = 'delete a network'
SetNetwork.args = [{ name: 'networkId', required: true }]

SetNetwork.flags = {
  ...Command.flags,
  'dry-run': flags.boolean({ char: 'n' })
}

module.exports = SetNetwork
