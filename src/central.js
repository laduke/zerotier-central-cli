const _central = require('@laduke/zerotier-central-client')

// wrap all the methods with a .catch
// that uses oclif.error(error.message) to print and exit.
// so you don't have to put every command  that calls central in a try catch
// otherwise you get javascript stack traces when you make a mistake.

module.exports = function (opts, print = console.error) { // eslint-disable-line no-console
  const central = _central(opts)

  for (let method in central) {
    if (typeof central[method] === 'function') {
      const og = central[method]
      central[method] = async function (...args) {
        return og(...args).catch(error => {
          print(error.message)
        })
      }
    }
  }
  return central
}
