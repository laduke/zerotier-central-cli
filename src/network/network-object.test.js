const test = require('tape')

const { Network, keys } = require('./network-object.js')

test('empty', t => {
  const n = Network.fromObj()
  t.deepEqual(n.toJSON(), {})

  t.end()
})

test('one thing', t => {
  const description = '2'
  const network = Network.fromObj({ description })

  t.notOk(network.toJSON().config)
  t.equal(description, network.description)

  t.end()
})

test('merge', t => {
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

  t.equal(network2.name, 'k')
  t.equal(network2.description, 'd')
  t.equal(network2.private, true)
  t.equal(network2.multicastLimit, 1)

  t.end()
})

test('it ignores weird keys', t => {
  const network = Network.fromObj()

  const network2 = network.merge({ foojiwooji: 1 })

  t.deepEqual(network2.toJSON(), {})
  t.ok(network2 instanceof Network)

  t.end()
})

test('round trip', t => {
  const json = require('./sample.js')

  const nw1 = Network.fromJSON(json)
  const nw2 = Network.fromObj(nw1)
  const nw3 = Network.fromJSON(nw2.toJSON())

  for (const key of keys) {
    t.deepEqual(nw1[key], nw2[key], `a ${key}`)
  }

  for (const key of keys) {
    t.deepEqual(nw1[key], nw3[key], `b ${key}`)
  }

  t.end()
})
