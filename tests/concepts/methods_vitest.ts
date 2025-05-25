// 🧪 Type- and Logic-Focused Matchers
// Matcher	Description
// toBe(value)	Exact match (for numbers, booleans, etc.)
// toEqual(object)	Deep match for objects/arrays
// toMatchObject(object)	Partial match on object
// toHaveProperty('prop', value)	Check if object has property
// toBeInstanceOf(Class)	Check if instance is of a class
// toThrow() / toThrowError()	Checks if function throws error
// toBeTypeOf('string')	With plugin or helper
// typeof result === 'string'	Use for raw type checks in expect(...)

// Feature	Use When You Want To…	Example
// vi.fn()	Mock or spy on function calls	vi.fn(() => 123)
// toHaveBeenCalledWith()	Check what arguments were passed	expect(mock).toHaveBeenCalledWith(...)
// toThrow()	Check that a function throws any error	expect(() => fn()).toThrow()
// toThrowError()	Check for a specific error message or type	expect(() => fn()).toThrowError('msg')

// Function	Purpose
// vi.fn()	Create a mock/spied function
// vi.spyOn()	Spy on existing object methods
// vi.mock()	Mock entire modules
// vi.clearAllMocks()	Clear mock call history
// vi.resetAllMocks()	Reset mocks to original behavior
// vi.restoreAllMocks()	Restore real implementations
// vi.useFakeTimers()	Control time (e.g., setTimeout)
// vi.useRealTimers()	Revert to real timers

// 🧪 Example: vi.fn()
// ts
// Copy
// Edit
// import { vi, test, expect } from 'vitest'

// const myMock = vi.fn()

// myMock('hello')
// myMock('world')

// test('vi.fn tracks calls', () => {
//   expect(myMock).toHaveBeenCalledTimes(2)
//   expect(myMock).toHaveBeenCalledWith('hello')
// })
// 🧪 Example: vi.spyOn()
// ts
// Copy
// Edit
// const user = {
//   greet(name: string) {
//     return `Hello, ${name}`
//   }
// }

// test('spy on method', () => {
//   const spy = vi.spyOn(user, 'greet')
//   user.greet('John')
//   expect(spy).toHaveBeenCalledWith('John')
// })
