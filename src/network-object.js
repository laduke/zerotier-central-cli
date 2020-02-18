const assert = require('assert')
const isIp = require('is-ip')
const isCidr = require('is-cidr')

function ipCompare(a, b) {
  return String(a).localeCompare(
    String(b),
    {},
    {numeric: true, sensitivity: 'base'}
  )
}

class Or {
  constructor($value) {
    this.$value = $value
  }

  static of($value) {
    return new Or($value)
  }

  concat(that) {
    return new Or(that.$value !== undefined ? that.$value : this.$value)
  }

  equal(that) {
    return this.$value === that.$value
  }

  join() {
    return this.value ? this.$value : this
  }
}

// remove keys where the value is undefined
function strip(obj) {
  return JSON.parse(JSON.stringify(obj))
}

class Network {
  constructor(opts) {
    Object.keys(opts).forEach(p => (this[p] = opts[p]))
  }

  static of(opts) {
    return new Network(opts)
  }

  static fromAPI(opts) {
    const {
      id,
      description,
      rulesSource,
      config: {
        name,
        mtu,
        v4AssignMode: {zt: zt4} = {},
        v6AssignMode: {zt: zt6, '6plane': plane6, rfc4193} = {},
        enableBroadcast,
        multicastLimit,
        routes = [],
        ipAssignmentPools = [],
      } = {},
    } = opts

    return new Network({
      ipAssignmentPools,
      enableBroadcast,
      multicastLimit,
      description,
      rulesSource,
      rfc4193,
      plane6,
      routes,
      name,
      mtu,
      zt4,
      zt6,
      id,
    })
  }

  concat(that) {
    Object.keys(this).reduce((acc, el) => {})
  }

  toAPI() {
    const {
      ipAssignmentPools,
      enableBroadcast,
      multicastLimit,
      description,
      rulesSource,
      rfc4193,
      plane6,
      routes,
      name,
      zt4,
      zt6,
      id,
    } = this

    return {
      id,
      description,
      rulesSource,
      config: {
        v6AssignMode: {zt: zt6, '6plane': plane6, rfc4193},
        v4AssignMode: {zt: zt4},
        ipAssignmentPools,
        enableBroadcast,
        multicastLimit,
        routes,
        name,
      },
    }
  }
}

class Routes {
  constructor(rs) {
    this.$routes = rs
  }

  static of(routes) {
    return new Routes(routes)
  }

  filter(fn) {
    return this.$routes.filter(fn)
  }

  concat(route) {
    return this.$routes.filter(r => !r.equals(route)).concat(route)
  }
}

class Route {
  constructor(target, via) {
    assert(
      isCidr(target),
      `target should be subnet in CIDR format. Got: ${target}`
    )

    assert(
      isIp(via) || via == null,
      `target should be an IP address or undefined. Got: ${via}`
    )

    this.$target = target
    this.$via = via || ''
  }

  static of(target, via) {
    return new Route(target, via)
  }

  static fromAPI({target, via}) {
    return new Route(target, via)
  }

  equals(that) {
    return this.$target === that.$target && this.$via === that.$via
  }

  lte(that) {
    const s1 = toValue(this.$target.split('/')[0])
    const s2 = toValue(that.$target.split('/')[0])

    const m1 = Number(this.$target.split('/')[1])
    const m2 = Number(that.$target.split('/')[1])

    return s1 + m1 <= s2 + m2
  }
}

function toValue(subnet) {
  const [a, b, c, d] = subnet.split('.').map(Number)
  return a * 256 ** 4 + b * 256 ** 3 + c * 256 ** 2 + d * 256 ** 1
}

module.exports = {Or, Network, Route, Routes}

class Maybe {
  constructor(x) {
    this.$value = x
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined
  }

  get isJust() {
    return !this.isNothing
  }

  join() {
    return this.isNothing ? this : this.$value
  }

  static of(x) {
    return new Maybe(x)
  }

  // map(fn) {
  //   return this.isNothing ? this : Maybe.of(fn(this.$value))
  // }

  concat(that) {
    return Maybe.of(that.isJust ? that.$value : this.$value)
  }
}
