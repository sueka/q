import Q from './Q'

declare global {
  interface BigInt {
    plus(that: Q): Q
    minus(that: Q): Q
    times(that: Q): Q
    dividedBy(that: Q): Q
  }
}

Object.defineProperties(BigInt.prototype, {
  plus: {
    value(this: bigint, that: Q) {
      return that.plus(this)
    },
  },
  minus: {
    value(this: bigint, that: Q) {
      return that.minus(this).opposite
    },
  },
  times: {
    value(this: bigint, that: Q) {
      return that.times(this)
    },
  },
  dividedBy: {
    value(this: bigint, that: Q) {
      return that.dividedBy(this).reciprocal
    },
  },
})
