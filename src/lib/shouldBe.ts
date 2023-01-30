export default function shouldBe<T extends unknown>(it: T | null | undefined): asserts it is T {
  if (it == null) {
    throw new Error
  }

  it.valueOf
}
