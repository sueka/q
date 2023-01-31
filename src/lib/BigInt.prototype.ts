import Q from './Q'

declare global {
  interface BigInt {
    plus: Inverse<Q['plus']>
  }
}

Object.defineProperties(BigInt.prototype, {
  plus: {
    value(that: Q) {
      return that.plus(this)
    },
  },
})
