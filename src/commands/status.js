const {flags} = require('@oclif/command')
const Command = require('../base.js')

class StatusCommand extends Command {
  async run() {
    const {flags} = this.parse(StatusCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/travis/src/zerotier-central-cli/src/commands/status.js`)

    const status = await this.central.getStatus()

    if (flags.json) {
      this.log(JSON.stringify(status, 0, 4))
    } else {
      this.log('version\tapi-version\tuptime')
    }
  }
}

StatusCommand.description = `Describe the command here
...
Extra documentation goes here
`

StatusCommand.flags = {
  ...Command.flags,
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = StatusCommand
