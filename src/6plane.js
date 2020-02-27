var splitBy2Re = /.{1,2}/g
var splitBy4Re = /.{1,4}/g

function sixPlane (networkId, nodeId) {
  var bytes = networkId.match(splitBy2Re)

  // split network id into bytes, d5e04297a19bbd70
  // [ 'd5', 'e0', '42', '97', 'a1', '9b', 'bd', '70' ]
  // convert hex strings to numbers
  // xor each byte with with byte 4 away
  // d5 ^ a1, e0 ^ 9b, 42 ^ bd, 97 ^ 70, a1 ^ 00, 9b ^ 00, bd ^ 00, 70 ^ 00
  // the last 4 bytes get xor'd with undefined, but they get thrown out anyways
  // pad any single digit bytes with a leading 0

  // string -> list string
  var networkPart = bytes
    .map(parse16)
    .map(xor)
    .map(toHexString)
    .slice(0, 4)
    .map(pad)

  // split nodeId into bytes, keep only first 5
  // there are only 5 bytes; can't remember if slice was necessary
  // string -> list string
  var nodePart = nodeId.match(splitBy2Re)// .slice(0, 5);

  // smoosh networkPart and nodePart strings together with some paddings
  // split into 2 byte sections, like an ipv6 address
  // list string -> string
  var result = ['fc']
    .concat(networkPart)
    .concat(nodePart)
    .concat(['00', '00', '00', '00', '00', '01'])
    .join('')
    .match(splitBy4Re)
    .join(':')

  return result

  // hex string -> number
  function parse16 (substr) {
    return parseInt(substr, 16)
  }

  // (number -> idx -> array) -> number
  function xor (substr, idx, arr) {
    return substr ^ arr[idx + 4]
  }

  // hex number -> string
  function toHexString (byte) {
    return byte.toString(16).toLowerCase()
  }

  // string -> string
  function pad (byte) {
    return byte.length === 2 ? byte : '0' + byte
  }
}

// var assert = require("assert");

// var networkId = '1d7193940403e728'
// var nodeId = '12345fedcb'

// assert(
//   sixPlane(networkId, nodeId) === "fc19:7274:bc12:345f:edcb:0000:0000:0001"
// );

// assert.strictEqual(
//   sixPlane("d5e04297a19bbd70", "7e2d4b9975"),
//   "fc74:7bff:e77e:2d4b:9975:0000:0000:0001"
// );
// assert.strictEqual(
//   sixPlane("d5e04297a19bbd70", "9935981b1e"),
//   "fc74:7bff:e799:3598:1b1e:0000:0000:0001"
// );

// assert.strictEqual(
//   sixPlane("d5e04297a19bbd70", "2f2fda6eff"),
//   "fc74:7bff:e72f:2fda:6eff:0000:0000:0001"
// );

// assert.strictEqual(
//   sixPlane("d5e04297a19bbd70", "0000000000"),
//   "fc74:7bff:e700:0000:0000:0000:0000:0001"
// );

module.exports = sixPlane
