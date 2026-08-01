export const allowedProblemCodes = [
  'P-001',
  'P-002',
  'P-003',
  'P-004',
  'P-005',
] as const;

export type ProblemCode = typeof allowedProblemCodes[number];

export function isValidProblemCode(code: string): code is ProblemCode {
  return (allowedProblemCodes as readonly string[]).includes(code);
}
