import parseR from './parseR'

describe('parseR()', () => {
  it('parses numbers', () => {
    expect(parseR(String(-2147483648))).toEqual({ sign: '-', integer: '2147483648' })
    expect(parseR(String(Math.E))).toEqual({ integer: '2', decimal: '718281828459045' })
    expect(() => parseR(String(NaN))).toThrowError()
    expect(() => parseR(String(Infinity))).toThrowError()
    expect(() => parseR(String(-Infinity))).toThrowError()
    expect(parseR(String(0))).toEqual({ integer: '0' })
    expect(parseR(String(-0))).toEqual({ integer: '0' })
    expect(parseR(String(Number.MAX_VALUE))).toEqual({ integer: '1', decimal: '7976931348623157', exponent: '+308' })
    expect(parseR(String(Number.MIN_VALUE))).toEqual({ integer: '5', exponent: '-324' })
    expect(parseR('+1')).toEqual({ sign: '+', integer: '1' })
    expect(parseR('6.02214076e23')).toEqual({ integer: '6', decimal: '02214076', exponent: '23' })
  })
})
