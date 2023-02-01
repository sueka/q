import parse from './parse'

describe('parse()', () => {
  it('parses numbers', () => {
    expect(parse(String(-2147483648))).toEqual({ sign: '-', integer: '2147483648' })
    expect(parse(String(Math.E))).toEqual({ integer: '2', decimal: '718281828459045' })
    expect(() => parse(String(NaN))).toThrowError()
    expect(() => parse(String(Infinity))).toThrowError()
    expect(() => parse(String(-Infinity))).toThrowError()
    expect(parse(String(0))).toEqual({ integer: '0' })
    expect(parse(String(-0))).toEqual({ integer: '0' })
    expect(parse(String(Number.MAX_VALUE))).toEqual({ integer: '1', decimal: '7976931348623157', exponent: '+308' })
    expect(parse(String(Number.MIN_VALUE))).toEqual({ integer: '5', exponent: '-324' })
    expect(parse('+1')).toEqual({ sign: '+', integer: '1' })
    expect(parse('6.02214076e23')).toEqual({ integer: '6', decimal: '02214076', exponent: '23' })
  })
})
