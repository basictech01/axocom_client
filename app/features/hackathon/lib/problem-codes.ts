export const allowedProblemCodes = [
  'P-001',
  'P-002',
  'P-003',
  'P-004',
  'P-005',
  'P-006',
  'P-007',
  'P-008',
  'P-009',
  'P-010',
  'P-011',
  'P-012',
  'P-013',
  'P-014',
] as const;

export type ProblemCode = typeof allowedProblemCodes[number];

export function isValidProblemCode(code: string): code is ProblemCode {
  return (allowedProblemCodes as readonly string[]).includes(code);
}
