import { dim, red, green } from 'chalk'
import { stringify } from 'jest-matcher-utils'

// export {}

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeOneOf(...actual: any[]): R;
    }
  }
}

expect.extend({
  toBeOneOf(received, ...actual) {
    const pass = actual.includes(received)

    return {
      pass,
      message() {
        return `
${ dim('expect(') }${ red('received') }${ dim(')') }.toBeOneOf${ dim('(') }${ green('expected') }${ dim(') // includes') }

Expected array: ${ green(stringify(actual)) }
Received value: ${ red(stringify(received)) }
        `.trim()
      },
    }
  },
})
