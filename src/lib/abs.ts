export default function abs(a: bigint): bigint {
  return (a < 0n) ? -a : a
}
