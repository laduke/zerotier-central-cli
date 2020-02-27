// const {inspect} = require('util')
const omitEmpty = require('omit-empty')

const keys = [
  'ipAssignmentPools',
  'enableBroadcast',
  'multicastLimit',
  'capabilities',
  'permissions',
  'description',
  'rulesSource',
  'rfc4193',
  'private',
  'routes',
  'rules',
  'plane',
  'name',
  'tags',
  'name',
  'mtu',
  'zt4',
  'zt6'
]

class Network {
  constructor (n) {
    for (const p in n) {
      if (keys.includes(p)) {
        this[p] = n[p]
      }
    }
  }

  static fromObj (n = {}) {
    return new Network(n)
  }

  static fromJSON (n = {}) {
    return new Network(flatten(n))
  }

  merge (that) {
    // only props that are set in `that` will be added
    // or overwritten from the orig network
    return Network.fromObj({ ...this, ...omitEmpty(that) })
  }

  toJSON () {
    const x = omitEmpty(nest(this))

    return x
  }
}

function nest (o) {
  const {
    ipAssignmentPools,
    enableBroadcast,
    permissions,
    multicastLimit,
    private: priv,
    capabilities,
    rulesSource,
    description,
    plane,
    rfc4193,
    routes,
    rules,
    tags,
    name,
    mtu,
    zt4,
    zt6
  } = o

  return {
    description,
    rulesSource,
    permissions,
    config: {
      ipAssignmentPools,
      enableBroadcast,
      multicastLimit,
      private: priv,
      capabilities,
      routes,
      rules,
      tags,
      name,
      mtu,
      v4AssignMode: { zt: zt4 },
      v6AssignMode: { zt: zt6, '6plane': plane, rfc4193 }
    }
  }
}

function flatten (o) {
  const {
    description = '',
    rulesSource = '',
    permissions,
    config: {
      ipAssignmentPools = [],
      capabilities = [],
      enableBroadcast,
      multicastLimit,
      private: priv,
      routes = [],
      rules = [],
      name = '',
      tags = [],
      mtu,
      v4AssignMode: { zt: zt4 } = {},
      v6AssignMode: { zt: zt6, rfc4193, '6plane': plane } = {}
    } = {}
  } = o

  return {
    ipAssignmentPools,
    permissions,
    enableBroadcast,
    multicastLimit,
    private: priv,
    capabilities,
    rulesSource,
    description,
    rfc4193,
    routes,
    rules,
    plane,
    name,
    tags,
    mtu,
    zt4,
    zt6
  }
}

module.exports = { Network, keys }
