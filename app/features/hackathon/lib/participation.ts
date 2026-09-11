export const MAX_TEAM_SIZE = 4;

export const PARTICIPATION_OPTIONS = [
  "Solo",
  "Team of 2",
  "Team of 3",
  `Team of ${MAX_TEAM_SIZE}`,
] as const;

export const PARTICIPATION_RULE_SUMMARY =
  `Participate solo or in one team of 2, 3, or ${MAX_TEAM_SIZE} people. ` +
  "Each person may participate only once and cannot enter both individually and as part of a team, or join more than one team.";
