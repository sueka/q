import './toBeOneOf'

describe('Matchers#toBeOneOf()', () => {
  it('has a neat error message', () => {
    expect(() => expect(1).toBeOneOf([2, 3, 5, 7])).toThrowErrorMatchingSnapshot()
  })
})
