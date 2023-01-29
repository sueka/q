import * as assert from 'assert'
import abs from './abs'
import gcd from './gcd'

export default class Q {
  private constructor (
    private nu: bigint,
    private de: bigint = 1n
  ) {
    assert(de !== 0n)
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

  get reduced() {
    const deSign = (this.de < 0n) ? -1n : 1n
    const d = deSign * abs(gcd(this.nu, this.de))
    const result = new Q(this.nu / d, this.de / d)

    return result
  }

  static of(nu: bigint, de?: bigint): Q {
    return new Q(nu, de).reduced
  }
}
