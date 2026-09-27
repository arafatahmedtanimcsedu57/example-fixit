import type { RequestHandler } from 'msw'

// Add handlers here as features define their API contract. Parse every fixture through the
// feature's Zod schema so the mock can't drift from the contract, e.g.
//   const books = [bookSchema.parse({ id: '1', title: 'Example' })]

/** Restore the fixtures; called between tests so one test's writes don't leak into the next. */
export function resetMockData() {}

export const handlers: RequestHandler[] = []
