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
    assert.strictEqual(description, network.description)
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

    assert.strictEqual(network2.name, 'k')
    assert.strictEqual(network2.description, 'd')
    assert.strictEqual(network2.private, true)
    assert.strictEqual(network2.multicastLimit, 1)
  },

  'merge network instances': () => {
    const network1 = Network.fromObj({
      name: 'g',
      description: 'd',
      private: false,
      multicastLimit: 0
    })
    const network2 = Network.fromObj({
      name: 'k',
      description: null,
      private: true,
      multicastLimit: 1
    })

    const network3 = network1.merge(network2)

    assert.strictEqual(network3.name, 'k')
    assert.strictEqual(network3.description, 'd')
    assert.strictEqual(network3.private, true)
    assert.strictEqual(network3.multicastLimit, 1)
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
