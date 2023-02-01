type NumberString = `${ number }` | 'Infinity' | '-Infinity' | 'NaN'

interface StringConstructor {
  (value: number): NumberString
}

interface Number {
  toString(): NumberString
}
