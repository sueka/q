export default function gcd(a: bigint, b: bigint): bigint {
  if (b === 0n) {
    return a
  }

  return gcd(b, a % b)
}
