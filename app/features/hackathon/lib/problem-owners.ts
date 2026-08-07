import { governmentDepartments } from "~/features/hackathon/lib/departments";

export interface ProblemOwner {
  name: string;
  url?: string;
}

/**
 * Organisations that currently own published problems. Government departments,
 * companies and institutions can all be added to this directory.
 */
export const problemOwners = {
  ...governmentDepartments,
} as const satisfies Record<string, ProblemOwner>;

export type ProblemOwnerId = keyof typeof problemOwners;

export function getProblemOwner(id: ProblemOwnerId): ProblemOwner {
  return problemOwners[id];
}