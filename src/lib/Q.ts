import * as assert from 'assert'
import abs from './abs'
import gcd from './gcd'
import parse from './parse'

export default class Q {
  private constructor (
    private nu: bigint,
    private de: bigint = 1n
  ) {
    assert(de !== 0n)
  }

  static ZERO = new Q(0n)
  static ONE = new Q(1n)

  plus(that: Q): Q
  plus(that: bigint): Q

  /**
   * Calculates a total of `this` and `that`.
   *
   * @param that
   * @returns the reduced total
   */
  plus(that: Q | bigint): Q {
    if (that instanceof Q) {
      return this.#plusQ(that)
    }

    return this.#plusZ(that)
  }

  #plusQ(that: Q): Q {
    const nu = that.de * this.nu + this.de * that.nu
    const de = this.de * that.de

    return new Q(nu, de).reduced
  }

  #plusZ(that: bigint): Q {
    const nu = this.nu + this.de * that
    const de = this.de

    return new Q(nu, de).reduced
  }

  /**
   * Calculates a difference between `this` and `that`.
   *
   * @param that the subtrahend
   * @returns the reduced difference
   */
  minus(that: Q): Q {
    const nu = that.de * this.nu - this.de * that.nu
    const de = this.de * that.de

    return new Q(nu, de).reduced
  }

  /**
   * Calculates a product of `this` and `that`.
   *
   * @param that
   * @returns the reduced product
   */
  times(that: Q): Q {
    const nu = this.nu * that.nu
    const de = this.de * that.de

    return new Q(nu, de).reduced
  }

  /**
   * Raises `this` to the power of `that`.
   *
   * @remarks This method sees 0⁰ = 1
   *
   * @param that the exponent
   * @returns the reduced power
   */
  toPowerOf(this: Q, that: number): Q {
    if (! Number.isInteger(that)) {
      throw new Error('Real exponents not supported.')
    }

    if (! Number.isSafeInteger(that)) {
      console.warn()
    }

    if (that < 0) {
      return this.toPowerOf(-that).reciprocal
    }

    const nu = this.nu ** BigInt(that)
    const de = this.de ** BigInt(that)

    return new Q(nu, de).reduced
  }

  /**
   * Calculates a quatient of `this` divided by `that`.
   *
   * @param that the divisor
   * @returns the reduced quatient
   */
  dividedBy(that: Q) {
    const nu = this.nu * that.de
    const de = this.de * that.nu

    return new Q(nu, de).reduced
  }

  equals(that: Q): boolean
  equals(that: bigint): boolean
  equals(that: Q | bigint): boolean {
    if (that instanceof Q) {
      return this.#equalsQ(that)
    }

    return this.#equalsZ(that)
  }

  #equalsQ(that: Q): boolean {
    return that.de * this.nu === this.de * that.nu
  }

  #equalsZ(that: bigint): boolean {
    return this.nu === this.de * that
  }

  get reciprocal() {
    if (this.equals(Q.ZERO)) {
      throw new Error('Reciprocal of zero does not exist.')
    }

    return Q.ONE.dividedBy(this)
  }

  get opposite() {
    return new Q(-1n).times(this)
  }

  /**
   * Reduces `this` to its lowest terms. Ensures the denominator ≥ one.
   *
   * @returns the reduced
   */
  get reduced() {
    const deSign = (this.de < 0n) ? -1n : 1n
    const d = deSign * abs(gcd(this.nu, this.de))
    const nu = this.nu / d
    const de = this.de / d

    assert(de >= 1n)

    return new Q(nu, de)
  }

  /**
   * Constructs a Q object.
   *
   * @param nu the numerator
   * @param de the denominator
   * @returns the reduced fraction `nu` over `de`
   */
  static of(nu: bigint, de?: bigint): Q {
    return new Q(nu, de).reduced
  }

  /**
   * Constructs a Q object.
   *
   * @param double
   * @returns the reduced fraction equal to `double`
   */
  static from(double: number): Q {
    const {
      sign = '+',
      integer,
      decimal = '',
      exponent = '+0'
    } = parse(double)

    const base = BigInt(`${ sign }${ integer }${ decimal }`)
    const ex = Number(exponent) - decimal.length

    const nu = (ex > 0 ? 10n ** BigInt( ex) : 1n) * base
    const de = (ex < 0 ? 10n ** BigInt(-ex) : 1n)

    return new Q(nu, de).reduced
  }
}
