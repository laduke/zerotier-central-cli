// const assert = require('assert')
const traverse = require('traverse')

const ids = [
  'member:get',
  'member:list',
  'member:set',
  'network:get',
  'network:list',
  'network:set',
  'setup',
  'status',
  'tabtab:install',
  'tabtab:uninstall',
  'tabtab:use',
  'help'
]

function Node (value) {
  this.$value = value
  this.$parent = null
  this.$children = []
}

function Tree (value) {
  var node = new Node(value)
  this.$root = node
}

Tree.prototype.traverseDF = function traverseDF (callback) {
  (function recurse (currentNode) {
    for (var i = 0, length = currentNode.$children.length; i < length; i++) {
      recurse(currentNode.$children[i])
    }

    callback(currentNode)
  })(this.$root)
}

Tree.prototype.contains = function (callback, traversal) {
  traversal.call(this, callback)
}

Tree.prototype.add = function (data, toData, traversal) {
  var child = new Node(data)
  var parent = null
  var callback = function (node) {
    if (node.$value === toData) {
      parent = node
    }
  }

  this.contains(callback, traversal)

  if (parent) {
    parent.$children.push(child)
    child.$parent = parent
  } else {
    throw new Error('Cannot add node to a non-existent parent.')
  }
}

var tree = new Tree('ztc')
tree.add('member', 'ztc', tree.traverseDF)
tree.add('get', 'member', tree.traverseDF)

// tree.$root.$children.push(new Node('member'))
// tree.$root.$children[0].$parent = tree

// tree.$root.$children.push(new Node('network'))
// tree.$root.$children[1].$parent = tree

// tree.$root.$children[0].$children.push(new Node('get'))
// tree.$root.$children[0].$children[0].$parent = tree

// console.log(tree)

tree.traverseDF(function (node) {
  console.log('df: ', node.$value)
})

const x = traverse({})
x.set(['ztc'], 'member')
console.log(x.nodes())

// const env = {
//   complete: true,
//   words: 1,
//   point: 9,
//   line: 'ztc membe',
//   partial: 'ztc membe',
//   last: 'membe',
//   lastPartial: 'membe',
//   prev: 'ztc',
// }

// function run() {
//   const tree = Tree.from(ids)
// prev = ztc, last = member
// const matches = tree.find(prev, last)
// matches = ['member']

// prev = member, last = :
// const matches = tree.find(prev, last)
// matches = ['get', 'set', 'list']
// }
// .reduce((acc, el) => {
//  }, {})

// console.log(
//   JSON.stringify(
//     [
//       {
//         name: 'member',
//         children: [{name: 'get', children: {}}, {name: 'set', children: {}}],
//       },
//     ],
//     0,
//     4
//   )
// )

// console.log(env)

// console.log(ids)
