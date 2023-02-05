import parseRepeating from './parseRepeating'

describe('parseRepeating()', () => {
  it('works', () => {
    expect(parseRepeating('0.1(142857)')).toEqual({ integer: '0', decimal: '1', repetend: '142857' })
    expect(parseRepeating('0.1')).toEqual({ integer: '0', decimal: '1' })
    expect(parseRepeating('0.0(9)')).toEqual({ integer: '0', decimal: '0', repetend: '9' })
    expect(parseRepeating('0.1(0)')).toEqual({ integer: '0', decimal: '1', repetend: '0' })
  })
})
