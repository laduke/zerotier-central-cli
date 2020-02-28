// const {inspect} = require('util')
const omitEmpty = require('omit-empty')

// writable
const writable = [
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
  'ip6plane',
  'name',
  'tags',
  'name',
  'mtu',
  'zt4',
  'zt6'
]

const readable = [
  'id',
  'creationTime',
  'lastModified',
  'totalMemberCount',
  'onlineMemberCount',
  'authorizedMemberCount',
  'ownerId'
]

class Network {
  constructor (n) {
    for (const p in n) {
      if (writable.concat(readable).includes(p)) {
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

  static keys () {
    return writable
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
    ip6plane,
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
      v6AssignMode: { zt: zt6, '6plane': ip6plane, rfc4193 }
    }
  }
}

function flatten (o) {
  const {
    id,
    description = '',
    rulesSource = '',
    permissions = {},

    ownerId = '',
    totalMemberCount = 0,
    onlineMemberCount = 0,
    authorizedMemberCount = 0,
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
      v6AssignMode: { zt: zt6, rfc4193, '6plane': ip6plane } = {},

      creationTime = 0,
      lastModified = 0
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
    ip6plane,
    name,
    tags,
    mtu,
    zt4,
    zt6,

    id,
    ownerId,
    creationTime,
    lastModified,
    totalMemberCount,
    onlineMemberCount,
    authorizedMemberCount
  }
}

module.exports = { Network }
