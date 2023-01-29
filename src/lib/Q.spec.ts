import Q from './Q'

describe('Q', () => {
  describe('Q.of() the factory method', () => {
    it('works with one argument', () => {
      expect(Q.of(4n)).toMatchObject({ nu: 4n, de: 1n })
      expect(Q.of(-9n)).toMatchObject({ nu: -9n, de: 1n })
    })

    it('ensures the denominator is positive', () => {
      expect(Q.of( 6351638n,  123n)).toMatchObject({ nu:  154918n, de: 3n })
      expect(Q.of( 6351638n, -123n)).toMatchObject({ nu: -154918n, de: 3n })
      expect(Q.of(-6351638n,  123n)).toMatchObject({ nu: -154918n, de: 3n })
      expect(Q.of(-6351638n, -123n)).toMatchObject({ nu:  154918n, de: 3n })
    })
  })

  describe('plus(), minus(), times() and dividedBy()', () => {
    it('works', () => {
      const oneHalf = Q.of(1n, 2n)
      const twoFifths = Q.of(2n, 5n)

      expect(oneHalf.plus(twoFifths)).toMatchObject({ nu: 9n, de: 10n })
      expect(oneHalf.minus(twoFifths)).toMatchObject({ nu: 1n, de: 10n })
      expect(oneHalf.times(twoFifths)).toMatchObject({ nu: 1n, de: 5n })
      expect(oneHalf.dividedBy(twoFifths)).toMatchObject({ nu: 5n, de: 4n })
    })
  })
})
