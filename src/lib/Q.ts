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
