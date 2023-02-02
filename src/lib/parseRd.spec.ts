import parseRd from './parseRd'

describe('parseRd()', () => {
  it('works', () => {
    expect(parseRd('0.1(142857)')).toEqual({ integer: '0', decimal: '1', repetend: '142857' })
    expect(parseRd('0.1')).toEqual({ integer: '0', decimal: '1' })
    expect(parseRd('0.0(9)')).toEqual({ integer: '0', decimal: '0', repetend: '9' })
    expect(parseRd('0.1(0)')).toEqual({ integer: '0', decimal: '1', repetend: '0' })
  })
})
