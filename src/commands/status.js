const {flags} = require('@oclif/command')
const Command = require('../api-base.js')
const cli = require('cli-ux').default

class StatusCommand extends Command {
  async run() {
    const {flags} = this.parse(StatusCommand)
    const name = flags.name || 'world'
    this.log(
      `hello ${name} from /Users/travis/src/zerotier-central-cli/src/commands/status.js`
    )

    const status = await this.central.getStatus()

    if (flags.json) {
      this.log(JSON.stringify(status, 0, 4))
    } else {
      this.log(makeTable(status, flags))
    }
  }
}

function makeTable(status, flags) {
  return cli.table([status], {version: {}, apiVersion: {}}, flags)
}

StatusCommand.description = `my.zerotier.com status
not much here`

StatusCommand.flags = {
  ...Command.flags,
}

module.exports = StatusCommand
