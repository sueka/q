import Q from './Q'

describe('Q', () => {
  describe('Q.isQ()', () => {
    it('works', () => {
      expect(Q.isQ(Q.from('0.1'))).toBeTruthy()
      expect(Q.isQ(1)).toBeFalsy()
    })
  })

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

  describe('Q.from() the factory method', () => {
    it('converts floats to rationals', () => {
      expect(Q.from('3.14')).toMatchObject({ nu: 157n, de: 50n })
      expect(Q.from('6.62607015e-34')).toMatchObject({ nu: 132521403n, de: 2n * 10n ** 41n })
    })

    it('fails with a non-finite argument', () => {
      expect(() => Q.from('NaN')).toThrowError()
      expect(() => Q.from('Infinity')).toThrowError()
    })

    it('converts repeating decimals to rationals', () => {
      expect(Q.from('0.(6)')).toEqual({ nu: 2n, de: 3n })
      expect(Q.from('0.1(142857)')).toEqual({ nu: 4n, de: 35n })
      expect(Q.from('-0.1(142857)')).toEqual({ nu: -4n, de: 35n })
      expect(Q.from('0.1')).toEqual({ nu: 1n, de: 10n })
      expect(Q.from('0.0(9)')).toEqual({ nu: 1n, de: 10n })
      expect(Q.from('0.1(0)')).toEqual({ nu: 1n, de: 10n })
    })
  })

  describe('plus(), minus(), times() and dividedBy()', () => {
    it('works', () => {
      expect(Q.of(1n, 2n).plus(Q.of(2n, 5n))).toMatchObject({ nu: 9n, de: 10n })
      expect(Q.of(1n, 2n).minus(Q.of(2n, 5n))).toMatchObject({ nu: 1n, de: 10n })
      expect(Q.of(1n, 2n).times(Q.of(2n, 5n))).toMatchObject({ nu: 1n, de: 5n })
      expect(Q.of(1n, 2n).dividedBy(Q.of(2n, 5n))).toMatchObject({ nu: 5n, de: 4n })
    })
  })

  describe('toPowerOf()', () => {
    it('works', () => {
      expect(Q.of(2n).toPowerOf(1)).toMatchObject({ nu: 2n, de: 1n })
      expect(Q.of(2n).toPowerOf(-3)).toMatchObject({ nu: 1n, de: 8n })
      expect(Q.of(2n, 5n).toPowerOf(10)).toMatchObject({ nu: 1024n, de: 9765625n })
    })

    it('also works with larger exponents', () => {
      expect(Q.of(2n, 3n).toPowerOf(1000)).toMatchObject({
        nu: 10715086071862673209484250490600018105614048117055336074437503883703510511249361224931983788156958581275946729175531468251871452856923140435984577574698574803934567774824230985421074605062371141877954182153046474983581941267398767559165543946077062914571196477686542167660429831652624386837205668069376n,
        de: 1322070819480806636890455259752144365965422032752148167664920368226828597346704899540778313850608061963909777696872582355950954582100618911865342725257953674027620225198320803878014774228964841274390400117588618041128947815623094438061566173054086674490506178125480344405547054397038895817465368254916136220830268563778582290228416398307887896918556404084898937609373242171846359938695516765018940588109060426089671438864102814350385648747165832010614366132173102768902855220001n,
      })
    })

    it('sees zero to the power of zero is one', () => {
      expect(Q.of(0n).toPowerOf(0)).toMatchObject({ nu: 1n, de: 1n })
    })
  })
})
