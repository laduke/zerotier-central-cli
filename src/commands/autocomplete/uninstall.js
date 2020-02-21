const tabtab = require('tabtab')

const {flags} = require('@oclif/command')
const Command = require('../../base.js')

class UninstallCommand extends Command {
  async run() {
    // const {flags} = this.parse(UninstallCommand)
    await tabtab
    .uninstall({
      name: 'ztc',
      completer: 'ztc',
    })
    .catch(err => console.error('UNINSTALL ERROR', err))
  }
}

UninstallCommand.description = 'setup autocomplete'

UninstallCommand.flags = {
  ...Command.flags,
}

module.exports = UninstallCommand
