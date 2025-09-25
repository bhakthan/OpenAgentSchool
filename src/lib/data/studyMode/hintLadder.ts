// Progressive Hinting Ladder (#17)
export interface HintLadderEntry { id: string; patternId: string; tiers: { level: 1|2|3; hint: string }[] }
export const hintLadders: HintLadderEntry[] = [
  { id: 'hl-query-intent-1', patternId: 'query-intent-structured-access', tiers: [
    { level: 1, hint: 'Restate the user goal in one precise sentence.' },
    { level: 2, hint: 'List the entities and operations embedded in the goal.' },
    { level: 3, hint: 'Provide a canonical structured query template mapping each entity.' }
  ]}
];
