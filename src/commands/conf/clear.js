const conf = require('../../conf.js')
const { flags } = require('@oclif/command')

const Command = require('../../base.js')

class ClearCommand extends Command {
  async init () {
    this.conf = conf()
  }

  async run () {
    this.conf.clear()
    this.log('cleared all config')
  }
}

ClearCommand.description = 'clear all config'

ClearCommand.flags = {}

module.exports = ClearCommand
