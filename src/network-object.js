// const assert = require('assert')
// TODO see test, we got problems with undefined nested things

class Or {
  constructor(val) {
    this.val = val
  }

  static of(val) {
    return new Or(val)
  }

  concat(that) {
    return new Or(that.val != null ? that.val : this.val)
  }

  equal(that) {
    return this.val === that.val
  }

  join() {
    return this.val
  }
}

class V4AssignModes {
  constructor(props) {
    const {zt} = props

    this.zt = zt || Or.of()
  }

  static of(props) {
    return new V4AssignModes(props)
  }

  concat(that) {
    const zt = this.zt.concat(that.zt)
    return new V4AssignModes({zt})
  }

  equal(that) {
    return this.zt.val === that.zt.val
  }

  join() {
    return strip({zt: this.zt.join()})
  }
}

class V6AssignModes {
  constructor(props) {
    const {'6plane': s, rfc4193, zt} = props

    this['6plane'] = s || Or.of(undefined)
    this.rfc4193 = rfc4193 || Or.of(undefined)
    this.zt = zt || Or.of(undefined)
  }

  static of(props) {
    return new V6AssignModes(props)
  }

  concat(that) {
    const zt = this.zt.concat(that.zt)
    const six = this['6plane'].concat(that['6plane'])
    const rfc4193 = this.rfc4193.concat(that.rfc4193)

    return new V6AssignModes({zt, '6plane': six, rfc4193})
  }

  equal(that) {
    return (
      this.zt.equal(that.zt) &&
      this['6plane'].equal(that['6plane']) &&
      this.rfc4193.equal(that.rfc4193)
    )
  }

  join() {
    return strip({
      zt: this.zt.join(),
      '6plane': this['6plane'].join(),
      rfc4193: this.rfc4193.join(),
    })
  }
}

class Config {
  constructor(props) {
    const {v4AssignMode, v6AssignMode, name} = props
    this.v4AssignMode = v4AssignMode || Or.of({})
    this.v6AssignMode = v6AssignMode || Or.of({})
    this.name = name || Or.of()
  }

  static of(props) {
    return new Config(props)
  }

  concat(that) {
    const v4AssignMode = this.v4AssignMode.concat(that.v4AssignMode)
    const v6AssignMode = this.v6AssignMode.concat(that.v6AssignMode)
    const name = this.name.concat(that.name)
    return new Config({v4AssignMode, v6AssignMode, name})
  }

  equal(that) {
    return (
      this.v6AssignMode.equal(that.v6AssignMode) &&
      this.v4AssignMode.equal(that.v4AssignMode)
    )
  }

  join() {
    return strip({
      v4AssignMode: this.v4AssignMode.join(),
      v6AssignMode: this.v6AssignMode.join(),
      name: this.name.join(),
    })
  }
}

class Network {
  constructor(props) {
    this.config = props.config || Or.of()
    this.description = props.description || Or.of()
  }

  static of(props) {
    return new Network(props)
  }

  concat(that) {
    const config = this.config.concat(that.config)
    const description = this.description.concat(that.description)
    return new Network({config, description})
  }

  equal(that) {
    return this.config.equal(that.config)
  }

  join() {
    return strip({config: this.config.join(), description: this.description.join()})
  }
}

// remove keys where the value is undefined
function strip(obj) {
  return JSON.parse(JSON.stringify(obj))
}

module.exports = {Network, V6AssignModes, V4AssignModes, Or, Config}
