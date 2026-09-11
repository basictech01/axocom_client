import { problems } from "./data";

export const HACKATHON_BASE_PATH = "/UKISHackathon" as const;
export const HACKATHON_SITE_MAP_PATH = `${HACKATHON_BASE_PATH}/site-map` as const;

export const HACKATHON_PROBLEM_IDS: readonly string[] = Object.freeze(
  problems.map(({ id }) => id),
);

const HACKATHON_PROBLEM_PATHS = HACKATHON_PROBLEM_IDS.map(
  (problemId) => `${HACKATHON_BASE_PATH}/problems/${problemId}`,
);

/**
 * Canonical public pages that may be prerendered, indexed, and included in the
 * sitemap. Private, legacy, proposal, and catch-all routes deliberately do not
 * belong in this registry.
 */
export const HACKATHON_INDEXABLE_PATHS: readonly string[] = Object.freeze([
  HACKATHON_BASE_PATH,
  `${HACKATHON_BASE_PATH}/problems`,
  ...HACKATHON_PROBLEM_PATHS,
  `${HACKATHON_BASE_PATH}/solutions`,
  `${HACKATHON_BASE_PATH}/mentors`,
  `${HACKATHON_BASE_PATH}/register/solution`,
  `${HACKATHON_BASE_PATH}/register/mentor`,
  `${HACKATHON_BASE_PATH}/terms-and-conditions`,
]);

// Guards against a non-problem route being added or dropped; problem pages scale with `problems`.
const HACKATHON_FIXED_PATH_COUNT = 7;
const expectedPathCount = HACKATHON_FIXED_PATH_COUNT + HACKATHON_PROBLEM_IDS.length;

if (HACKATHON_INDEXABLE_PATHS.length !== expectedPathCount) {
  throw new Error(
    `The UKIS public-route registry must contain exactly ${expectedPathCount} URLs.`,
  );
}
