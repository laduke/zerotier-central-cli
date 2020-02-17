var test = require('tape')

var {
  Network,
  Config,
  V6AssignModes,
  V4AssignModes,
  Or,
} = require('./network-object.js')
var sample = require('./network-sample.js')

test.only('Or type thing', t => {
  const zt1 = Or.of(undefined)
  const zt2 = Or.of(true)
  const zt3 = Or.of(false)

  t.ok(zt2.concat(zt1).equal(zt2))
  t.ok(zt3.concat(zt1).equal(zt3))
  t.ok(zt1.concat(zt2).equal(zt2))
  t.ok(zt1.concat(zt3).equal(zt3))

  t.ok(zt2.concat(zt3).equal(zt3))
  t.ok(zt3.concat(zt2).equal(zt2))

  t.ok(zt1.concat(zt1).equal(zt1))

  t.end()
})

test('v4assignmode', t => {
  t.ok(1)

  const a = V4AssignModes.of({zt: Or.of(true)})
  const b = V4AssignModes.of({zt: Or.of(undefined)})

  t.ok(a.concat(b).equal(a))
  t.ok(b.concat(a).equal(a))

  t.end()
})

test('v6assignmode', t => {
  t.ok(1)

  const a = V6AssignModes.of({zt: Or.of(true)})
  const b = V6AssignModes.of({zt: Or.of(undefined)})
  const c = V6AssignModes.of({'6plane': Or.of(true)})
  const d = V6AssignModes.of({rfc4193: Or.of(false)})

  t.ok(a.concat(b).equal(a))
  t.ok(b.concat(a).equal(a))
  t.ok(b.concat(c).equal(c))
  t.ok(b.concat(d).equal(d))

  t.ok(
    a
    .concat(b)
    .concat(c)
    .concat(d)
    .equal(a.concat(b.concat(c.concat(d))))
  )

  t.end()
})

test('config', t => {
  t.ok(1)

  const a = Config.of({
    v4AssignMode: V4AssignModes.of({zt: Or.of(true)}),
    v6AssignMode: V6AssignModes.of({zt: Or.of(false), rfc4193: Or.of(true)}),
    name: Or.of('bob'),
  })
  const b = Config.of({
    v4AssignMode: V4AssignModes.of({zt: Or.of(false)}),
    v6AssignMode: V6AssignModes.of({zt: Or.of(true), rfc4193: Or.of(false)}),
    name: Or.of('alice'),
  })

  t.ok(a.concat(b).equal(b))
  t.ok(b.concat(a).equal(a))

  t.end()
})

test('network', t => {
  t.ok(1)

  const a = Network.of({
    description: Or.of('cov'),
    config: Config.of({
      v4AssignMode: V4AssignModes.of({zt: Or.of(true)}),
      v6AssignMode: V6AssignModes.of({
        zt: Or.of(false),
        rfc4193: Or.of(true),
      }),
      name: Or.of('bob'),
    }),
  })

  // const b = Network.of({
  //   description: Or.of('lolita'),
  //   config: Config.of({
  //     v4AssignMode: V4AssignModes.of({zt: Or.of(false)}),
  //     v6AssignMode: V6AssignModes.of({
  //       zt: Or.of(true),
  //       rfc4193: Or.of(false),
  //     }),
  //     name: Or.of('alice'),
  //   }),
  // })

  const c = Network.of({
    description: Or.of('c network'),
  })

  // t.ok(a.concat(b).equal(b))
  // t.ok(b.concat(a).equal(a))

  console.log(c.join())
  console.log(a.concat(c))

  t.end()
})
