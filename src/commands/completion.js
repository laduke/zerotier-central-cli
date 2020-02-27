const tabtab = require('tabtab')
const path = require('path')

const { flags } = require('@oclif/command')
const Command = require('../base.js')

class CompletionCommand extends Command {
  async run () {
    // const parsed = this.parse(CompletionCommand)
    const env = tabtab.parseEnv(process.env)

    // console.error(env)
    // console.error(parsed)

    const commands = getCommands(this.config)

    const withoutFlags = env.line.split(' ').filter(s => !s.startsWith('-'))

    const command = withoutFlags[1]

    if (isFlag(env)) {
      tabtab.log(completeFlag(env, command, commands) || [])
    } else if (isCommand(env)) {
      tabtab.log(completeCommand(env, commands) || [])
    } else {
      const arg = await completeArg(env, command)
      tabtab.log(arg || [])
    }
  }
}

function isFlag (env) {
  return env.last[0] === '-'
}

function isCommand (env) {
  return (
    env.line
      .split(' ')
      .filter(s => s !== 'help')
      .filter(s => !s.startsWith('-')).length === 2
  )
}

function completeCommand (env, commands) {
  return commands
    .map(c => ({ name: c.id, description: c.description }))
    .filter(c => c.name.startsWith(env.last))
}

function completeFlag (env, command, commands) {
  return commands
    .filter(c => (command ? c.id === command : true))
    .flatMap(c => Object.keys(c.flags))
    .map(c => `--${c}`)
}

function completeArg (env, command) {
  try {
    const p = path.join(
      __dirname,
      ...command
        .split(':')
        .slice(0, -1)
        .concat('autocomplete.js')
    )

    const Command = require(p)
    return Command.run(process.argv)
  } catch (error) {
    return []
  }
}

function getCommands (config) {
  return config.plugins
    .flatMap(plug => {
      return plug.commands
    })
    .filter(p => !p.hidden)
}

CompletionCommand.description = 'setup autocomplete'
CompletionCommand.hidden = true
CompletionCommand.strict = false

CompletionCommand.flags = {
  a: flags.boolean(),
  b: flags.boolean()
}

module.exports = CompletionCommand
