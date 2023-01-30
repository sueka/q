import parse from './parse'

describe('parse()', () => {
  it('parses numbers', () => {
    expect(parse(-2147483648)).toEqual({ sign: '-', integer: '2147483648' })
    expect(parse(Math.E)).toEqual({ integer: '2', decimal: '718281828459045' })
    expect(() => parse(NaN)).toThrowError()
    expect(() => parse(Infinity)).toThrowError()
    expect(() => parse(-Infinity)).toThrowError()
    expect(parse(0)).toEqual({ integer: '0' })
    expect(parse(-0)).toEqual({ integer: '0' })
    expect(parse(Number.MAX_VALUE)).toEqual({ integer: '1', decimal: '7976931348623157', exponent: '+308' })
    expect(parse(Number.MIN_VALUE)).toEqual({ integer: '5', exponent: '-324' })
  })
})
