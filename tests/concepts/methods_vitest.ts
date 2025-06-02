// Matchers — To Assert Expected Behavior
// Matcher	Description	Example
// toBe(value)	Exact match (primitives: number, boolean, string)	expect(a).toBe(3)
// toEqual(object)	Deep equality for objects/arrays	expect(obj).toEqual({ x: 1, y: 2 })
// toMatchObject(object)	Partial match on object (some properties)	expect(obj).toMatchObject({ x: 1 })
// toHaveProperty('prop', value)	Check if object has property (optionally with value)	expect(obj).toHaveProperty('name', 'Bob')
// toBeInstanceOf(Class)	Check if an object is an instance of a class	expect(date).toBeInstanceOf(Date)
// toThrow()	Check if function throws any error	expect(() => fn()).toThrow()
// toThrowError('msg')	Check if function throws error with specific message/type	expect(() => fn()).toThrowError('fail')
// toBeTypeOf('string')*	Check the type of a value (needs helper/plugin)	expect(name).toBeTypeOf('string')
// typeof value === 'string'	Raw JavaScript type check in expect	expect(typeof name).toBe('string')

// Mocking & Spying — Control & Observe Functions
// Method	Purpose	Example
// vi.fn()	Create a mock/spied function	const mock = vi.fn(() => 123)
// vi.spyOn(object, 'method')	Spy on an existing method (track calls, arguments, etc.)	const spy = vi.spyOn(console, 'log')
// vi.mock('module')	Mock entire modules	vi.mock('axios')
// vi.clearAllMocks()	Clear call history of mocks	vi.clearAllMocks()
// vi.resetAllMocks()	Reset mocks to initial implementation	vi.resetAllMocks()
// vi.restoreAllMocks()	Restore all spies/mocks to original real implementations	vi.restoreAllMocks()
// vi.useFakeTimers()	Replace real timers (setTimeout, setInterval) with fakes	vi.useFakeTimers()
// vi.useRealTimers()	Switch back to real timers	vi.useRealTimers()

// Examples
// vi.fn() — Create mock function and check calls
// ts
// Copy
// Edit
// const myMock = vi.fn()

// myMock('hello')
// myMock('world')

// expect(myMock).toHaveBeenCalledTimes(2)
// expect(myMock).toHaveBeenCalledWith('hello')
// vi.spyOn() — Spy on an object’s method
// ts
// Copy
// Edit
// const user = {
//   greet(name: string) {
//     return `Hello, ${name}`
//   }
// }

// const spy = vi.spyOn(user, 'greet')
// user.greet('John')

// expect(spy).toHaveBeenCalledWith('John')
// Additional Useful Matchers
// Matcher	Description	Example
// toBeTruthy()	Value coerces to true	expect(val).toBeTruthy()
// toBeFalsy()	Value coerces to false	expect(val).toBeFalsy()
// toContain(item)	Check if array/string contains an item	expect(arr).toContain(3)
// toHaveLength(number)	Check length of array/string	expect(arr).toHaveLength(5)
// toMatch(regex)	String matches regex	expect(str).toMatch(/hello/i)
// toBeCloseTo(number, digits?)	Number is close to expected value (decimal digits optional)	expect(pi).toBeCloseTo(3.14, 2)
// toBeDefined()	Value is not undefined	expect(val).toBeDefined()
// toBeUndefined()	Value is undefined	expect(val).toBeUndefined()
// toBeNull()	Value is null	expect(val).toBeNull()
// toStrictEqual(object)	Deep strict equality (checks types too)	expect(obj).toStrictEqual({ a: 1 })

// Advanced Mock Controls
// Method	Description	Example
// mockImplementation(fn)	Provide a custom implementation for mock fn	mock.mockImplementation(() => 42)
// mockReturnValue(value)	Return a fixed value from mock fn	mock.mockReturnValue('fixed')
// mockResolvedValue(value)	Return a resolved promise (async mocks)	mock.mockResolvedValue('data')
// mockRejectedValue(error)	Return a rejected promise (async error mocks)	mock.mockRejectedValue(new Error())
