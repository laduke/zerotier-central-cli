const tabtab = require('tabtab')

const {flags} = require('@oclif/command')
const Command = require('../../base.js')

class InstallCommand extends Command {
  async run() {
    // const {flags} = this.parse(InstallCommand)
    await tabtab
    .install({
      name: 'ztc',
      completer: 'ztc',
    })
    .catch(err => console.error('INSTALL ERROR', err))
  }
}

InstallCommand.description = 'setup autocomplete'

InstallCommand.flags = {
  ...Command.flags,
}

module.exports = InstallCommand
