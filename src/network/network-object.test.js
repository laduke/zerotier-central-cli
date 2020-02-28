const assert = require('assert')

const { Network } = require('./network-object.js')

module.exports = {
  empty: () => {
    const n = Network.fromObj()
    assert.deepStrictEqual(n.toJSON(), {})
  },

  'one thing': () => {
    const description = '2'
    const network = Network.fromObj({ description })

    assert.ok(!network.toJSON().config)
    assert.equal(description, network.description)
  },

  merge: () => {
    const network = Network.fromObj({
      name: 'g',
      description: 'd',
      private: false,
      multicastLimit: 0
    })
    const network2 = network.merge({
      name: 'k',
      description: null,
      private: true,
      multicastLimit: 1
    })

    assert.equal(network2.name, 'k')
    assert.equal(network2.description, 'd')
    assert.equal(network2.private, true)
    assert.equal(network2.multicastLimit, 1)
  },

  'it ignores weird keys': () => {
    const network = Network.fromObj()

    const network2 = network.merge({ foojiwooji: 1 })

    assert.deepStrictEqual(network2.toJSON(), {})
    assert.ok(network2 instanceof Network)
  },

  'round trip': () => {
    const json = require('./sample.js')

    const nw1 = Network.fromJSON(json)
    const nw2 = Network.fromObj(nw1)
    const nw3 = Network.fromJSON(nw2.toJSON())

    for (const key of Network.keys()) {
      assert.deepStrictEqual(nw1[key], nw2[key], `a ${key}`)
    }

    for (const key of Network.keys()) {
      assert.deepStrictEqual(nw1[key], nw3[key], `b ${key}`)
    }
  }
}
