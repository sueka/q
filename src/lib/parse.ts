import * as assert from 'assert'
import shouldBe from './shouldBe'

interface ParseResult {
  sign?: '-'
  integer: string // decimal natural with no leading zeros
  decimal?: string // decimal natural (leading zeros can occur.)
  exponent?: `${ '+' | '-' }${ string }` // from -324 to +308 except from -6 to +20
}

export default function parse(a: NumberString): ParseResult {
  const pattern = /(?<sign>-)?(?<integer>\d+)(\.(?<decimal>\d+))?(e(?<exponent>(\+|-)\d+))?/
  const result = pattern.exec(a)

  shouldBe(result?.groups) // NaN, Infinity and -Infinity

  const { sign, integer, decimal, exponent } = result.groups

  // TODO: Replace the below with `return result.groups as ParseResult`.

  shouldBe(integer) // Integer part should exist.
  assert(sign != null ? sign === '-' : true) // '-' if any

  return { sign, integer, decimal, exponent } as ParseResult
}
