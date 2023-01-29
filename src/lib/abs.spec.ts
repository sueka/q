import abs from './abs'

describe('abs()', () => {
  it('works', () => {
    expect(abs(-2n)).toBe(2n)
    expect(abs( 2n)).toBe(2n)
  })
})
