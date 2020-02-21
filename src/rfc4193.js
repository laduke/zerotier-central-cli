module.exports = function (networkId, memberId) {
  return `fd${networkId}9993${memberId}`.match(/.{1,4}/g).join(':')
}
