import Q from './Q'
import './BigInt.prototype'

describe('BigInt.prototype', () => {
  describe('plus()', () => {
    it('works', () => {
      expect(4n.plus(Q.of(1n, 2n))).toEqual({ nu: 9n, de: 2n })
    })
  })
})
