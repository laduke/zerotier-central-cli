// const {inspect} = require('util')
const omitEmpty = require('omit-empty')

// writable
const writable = [
  'authorized',
  'name',
  'hidden',
  'description',
  'ipAssignments',
  'activeBridge',
  'capabilities',
  'tags',
  'noAutoAssignIps'
]

const readable = ['nodeId', 'networkId']

class Member {
  constructor (m) {
    for (const p in m) {
      if (writable.concat(readable).includes(p)) {
        this[p] = m[p]
      }
    }
  }

  static fromObj (m = {}) {
    return new Member(m)
  }

  no () {
    const { nodeId, networkId, ...rest } = this.toJSON()
    return rest
  }

  static fromJSON (m = {}) {
    return new Member(flatten(m))
  }

  merge (that) {
    // only values that are not undefined in `that` will be added
    // or overwritten from the orig network
    return Member.fromObj({ ...this, ...omitEmpty(that) })
  }

  static keys () {
    return writable
  }

  toJSON () {
    return omitEmpty(nest(this))
  }
}

function flatten (o) {
  const {
    nodeId,
    networkId,
    description,
    name,
    hidden,
    config: {
      authorized,
      ipAssignments,
      activeBridge,
      capabilities,
      tags,
      noAutoAssignIps
    }
  } = o

  return {
    nodeId,
    networkId,
    name,
    hidden,
    description,
    authorized,
    ipAssignments,
    activeBridge,
    capabilities,
    tags,
    noAutoAssignIps
  }
}

function nest (o) {
  const {
    nodeId,
    networkId,
    name,
    hidden,
    description,
    authorized,
    ipAssignments,
    activeBridge,
    capabilities,
    tags,
    noAutoAssignIps
  } = o

  return {
    description,
    nodeId,
    networkId,
    // if hidden not defined, re-creating a member doesn't work, for some reason
    ...(hidden != null ? { ...hidden } : { hidden: false }),
    name,
    config: {
      authorized,
      ipAssignments,
      activeBridge,
      capabilities,
      tags,
      noAutoAssignIps
    }
  }
}

module.exports = { Member }
