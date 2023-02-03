import * as assert from 'assert'
import abs from './abs'
import gcd from './gcd'
import parse from './parse'
import parseRd from './parseRd'
import shouldBe from './shouldBe'

interface QLike {
  nu: bigint
  de: bigint
}

export default class Q {
  private constructor (
    readonly nu: bigint,
    readonly de: bigint = 1n
  ) {
    assert(de !== 0n)
  }

  static ZERO = new Q(0n)
  static ONE = new Q(1n)

  toString() {
    if (this.de === 1n) {
      return `${ this.nu }`
    }

    return `${ this.nu }/${ this.de }`
  }

  // NOTE: It throws an error rather than returns zero when `nu` is finite and `de` equals `Infinity`.
  toDouble() {
    const nu = Number(this.nu)
    const de = Number(this.de)

    if (! (Number.isFinite(nu) && Number.isFinite(de) && Number.isFinite(nu / de))) {
      throw new Error('Numerator or denominator too large.')
    }

    return nu / de
  }

  #brand: any

  static isQ(arg: any): arg is Q {
    return typeof arg === 'object' && arg !== null && #brand in arg
  }

  /**
   * Calculates a total of `this` and `that`.
   *
   * @param that
   * @returns the reduced total
   */
  plus(that: Q): Q {
    const nu = that.de * this.nu + this.de * that.nu
    const de = this.de * that.de

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
  dividedBy(that: Q): Q {
    const nu = this.nu * that.de
    const de = this.de * that.nu

    return new Q(nu, de).reduced
  }

  equals(that: Q): boolean {
    return that.de * this.nu === this.de * that.nu
  }

  isNotEqualTo(that: Q): boolean {
    return ! this.equals(that)
  }

  isLessThan(that: Q): boolean {
    return that.de * this.nu < this.de * that.nu
  }

  isLessThanOrEqualTo(that: Q): boolean {
    return ! this.isGreaterThan(that)
  }

  isGreaterThan(that: Q): boolean {
    return that.isLessThan(this)
  }

  isGreaterThanOrEqualTo(that: Q): boolean {
    return ! this.isLessThan(that)
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
  static of(nu: bigint, de?: bigint): Q

  /**
   * Constructs a Q object.
   *
   * @param q the Q-like object
   * @returns the reduced fraction of the Q object
   */
  static of(q: QLike): Q

  static of(nuQ: bigint | QLike, de?: bigint) {
    if (typeof nuQ === 'bigint') {
      return this.#ofNuDe(nuQ, de)
    }

    return this.#ofQLike(nuQ)
  }

  static #ofNuDe(nu: bigint, de?: bigint): Q {
    return new Q(nu, de).reduced
  }

  static #ofQLike(q: QLike): Q {
    return new Q(q.nu, q.de).reduced
  }

  /**
   * Constructs a Q object.
   *
   * @param real
   * @returns the reduced fraction equal to `real`
   */
  static from(real: number): Q

  /**
   * Constructs a Q object
   *
   * @param repeating the
   */
  static from(repeating: string): Q

  static from(realRepeating: number | string): Q {
    if (typeof realRepeating === 'number') {
      return Q.#fromR(realRepeating)
    }

    return Q.#fromRepeating(realRepeating)
  }

  static #fromR(real: number): Q {
    const {
      sign = '+',
      integer,
      decimal = '',
      exponent = '+0'
    } = parse(String(real))

    const base = BigInt(`${ sign }${ integer }${ decimal }`)
    const ex = Number(exponent) - decimal.length

    const nu = (ex > 0 ? 10n ** BigInt( ex) : 1n) * base
    const de = (ex < 0 ? 10n ** BigInt(-ex) : 1n)

    return new Q(nu, de).reduced
  }

  static #fromRepeating(repeating: string): Q {
    const {
      sign = '+',
      integer,
      decimal,
      repetend,
    } = parseRd(repeating)

    const s = BigInt(`${ sign }1`)
    const term = Number(`${ integer }.${ decimal }`)

    if (repetend === undefined) {
      return Q.#fromR(term)
    }

    // shouldBe(repetend)

    const repeat = {
      nu: BigInt(repetend),
      de: BigInt(10 ** decimal.length * (10 ** repetend.length - 1)),
    }

    return new Q(s).times(Q.#fromR(term).plus(Q.of(repeat)))
  }

  // Aliases
  add(that: Q): Q { return this.plus(that) }
  sub(that: Q): Q { return this.minus(that) }
  mul(that: Q): Q { return this.times(that) }
  pow(that: number): Q { return this.toPowerOf(that) }
  div(that: Q): Q { return this.dividedBy(that) }
  eq(that: Q): boolean { return this.equals(that) }
  ne(that: Q): boolean { return this.isNotEqualTo(that) }
  lt(that: Q): boolean { return this.isLessThan(that) }
  lte(that: Q): boolean { return this.isLessThanOrEqualTo(that) }
  gt(that: Q): boolean { return this.isGreaterThan(that) }
  gte(that: Q): boolean { return this.isGreaterThanOrEqualTo(that) }
  ['+'](that: Q): Q { return this.plus(that) }
  ['-'](that: Q): Q { return this.minus(that) }
  ['*'](that: Q): Q { return this.times(that) }
  ['**'](that: number): Q { return this.toPowerOf(that) }
  ['/'](that: Q): Q { return this.dividedBy(that) }
  ['==='](that: Q): boolean { return this.equals(that) }
  ['!=='](that: Q): boolean { return this.isNotEqualTo(that) }
  ['<'](that: Q): boolean { return this.isLessThan(that) }
  ['<='](that: Q): boolean { return this.isLessThanOrEqualTo(that) }
  ['>'](that: Q): boolean { return this.isGreaterThan(that) }
  ['>='](that: Q): boolean { return this.isGreaterThanOrEqualTo(that) }
}
