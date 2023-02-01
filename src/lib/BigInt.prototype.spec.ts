import Q from './Q'
import './BigInt.prototype'

describe('BigInt.prototype', () => {
  describe('plus(), minus(), times() and dividedBy()', () => {
    it('works', () => {
      expect(4n.plus(Q.of(1n, 2n))).toEqual({ nu: 9n, de: 2n })
      expect(4n.minus(Q.of(1n, 2n))).toEqual({ nu: 7n, de: 2n })
      expect(4n.times(Q.of(1n, 2n))).toEqual({ nu: 2n, de: 1n })
      expect(4n.dividedBy(Q.of(1n, 2n))).toEqual({ nu: 8n, de: 1n })
    })
  })
})
