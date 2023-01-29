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
})
