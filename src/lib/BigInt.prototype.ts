import Q from './Q'

declare global {
  interface BigInt {
    plus(that: Q): Q
  }
}

Object.defineProperties(BigInt.prototype, {
  plus: {
    value(this: bigint, that: Q) {
      return that.plus(this)
    },
  },
})
