import '../jest/toBeOneOf'
import gcd from './gcd'

describe('gcd()', () => {
  it('returns the other argument if one argument is zero', () => {
    expect(gcd(0n, 2n)).toBe(2n)
    expect(gcd(-11n, 0n)).toBe(-11n)
  })

  it('returns it as is if the arguments are the same', () => {
    expect(gcd(120n, 120n)).toBe(120n)
    expect(gcd(-120n, -120n)).toBe(-120n)
  })

  it('works well', () => {
    expect(gcd(2n, 3n)).toBe(1n)
    expect(gcd(84n, 132n)).toBe(12n)

    expect(gcd( 12n,  18n)).toBe(6n)
    expect(gcd( 12n, -18n)).toBeOneOf(6n, -6n)
    expect(gcd(-12n,  18n)).toBeOneOf(6n, -6n)
    expect(gcd(-12n, -18n)).toBe(-6n)

    expect(gcd(19622450385513150338859905220847726215898282944n, 105727477780691088976696996493788504869716897248n)).toBe(32567410099013314287738418350752n)
  })
})
