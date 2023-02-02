import shouldBe from './shouldBe'

interface ParseResult {
  sign?: '+' | '-'
  integer: string // decimal natural with no leading zeros
  decimal: string // digits
  repetend?: string // digits
}

/**
 * Parses a repeating decimal into its `repetend` and the rest.
 *
 * @param repeating the repeating decimal in the parentheses notation
 */
export default function parseRd(repeating: string): ParseResult {
  const pattern = /^(?<sign>\+|-)?(?<integer>\d+)\.(?<decimal>\d*)(\((?<repetend>\d+)\))?$/
  const result = pattern.exec(repeating)

  shouldBe(result?.groups)

  // TODO: Replace the below with `return result.groups as ParseResult`.
  const { sign, integer, decimal, repetend } = result.groups
  return { sign, integer, decimal, repetend } as ParseResult
}
