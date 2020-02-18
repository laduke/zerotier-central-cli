var test = require('tape')

var {Or, Network, Route, Routes} = require('./network-object.js')
var sample = require('./network-sample.js')

// zt4, zt6, rfc4193, 6plane, description, rulesSource
// capabilities[], tags[], enableBroadcast, ipAssignmentPools[], routes[], rules[]
// mtu, multicastLimit, name, private

test('Any type thing', t => {
  const zt1 = Or.of(undefined)
  const zt2 = Or.of(true)
  const zt3 = Or.of(false)

  t.ok(zt1.concat(zt1).equal(zt1))
  t.ok(zt1.concat(zt2).equal(zt2))
  t.ok(zt1.concat(zt3).equal(zt3))

  t.ok(zt2.concat(zt1).equal(zt2))
  t.ok(zt2.concat(zt2).equal(zt2))
  t.ok(zt2.concat(zt3).equal(zt3))

  t.ok(zt3.concat(zt1).equal(zt3))
  t.ok(zt3.concat(zt2).equal(zt2))
  t.ok(zt3.concat(zt3).equal(zt3))

  t.end()
})

// zt4, zt6, rfc4193, 6plane, description, rulesSource
// capabilities[], tags[], enableBroadcast, ipAssignmentPools[], routes[], rules[]
// mtu, multicastLimit, name, private

function strip(obj) {
  return JSON.parse(JSON.stringify(obj))
}

test.only('routes', t => {
  const route1 = Route.of('192.168.168.192/24')
  const route2 = Route.of('192.168.168.193/24')
  const route3 = Route.of('172.25.0.0/24')
  const route4 = Route.of('172.25.0.0/10', '1.1.1.1')
  const route5 = Route.of('172.25.0.0/8')
  const route6 = Route.of('172.25.0.0/31')

  const network = Network.fromAPI(sample)
  // const routes = network.routes.map(Route.fromAPI)
  const routes = [route1, route2, route3, route4, route5, route6]
  // console.log(routes.filter(r => r.equals(route1)))
  // console.log(
  //   routes
  //   .filter(r => !r.equals(route3))
  //   .concat(route1)
  //   .concat(route2)
  //   .concat(route3)
  // )
  // console.log(routes.concat(Route.of({target: '192.168.168.192'})))

  console.log(
    routes.sort((a, b) => (a.lte(b) ? -1 : 1))
  )

  // network routes concat(route)
  // network routes filter(route)

  t.end()
})
