import type { Bead, Mystery } from '../types';
import { MYSTERY_SETS, prayers } from './constants';

export const buildSequenceWithMysteries = (
  mysterySetName: keyof typeof MYSTERY_SETS
) => {
  const sequence: Bead[] = [];

  sequence.push({ type: 'apostlesCreed', prayer: prayers.apostlesCreed });
  sequence.push({ type: 'ourFather', prayer: prayers.ourFather });
  sequence.push({ type: 'hailMary', prayer: prayers.hailMary });
  sequence.push({ type: 'hailMary', prayer: prayers.hailMary });
  sequence.push({ type: 'hailMary', prayer: prayers.hailMary });
  sequence.push({
    type: 'gloryBeFatimaPrayer',
    prayer: prayers.gloryBeFatimaPrayer,
  });

  const mysterySet = MYSTERY_SETS[mysterySetName];
  for (let d = 0; d < 5; d++) {
    const mystery = mysterySet[d];
    sequence.push({ type: 'mysteryCard', mysteryId: mystery.id });
    sequence.push({ type: 'ourFather', prayer: prayers.ourFather });
    for (let i = 0; i < 10; i++) {
      sequence.push({ type: 'hailMary', prayer: prayers.hailMary });
    }
    sequence.push({
      type: 'gloryBeFatimaPrayer',
      prayer: prayers.gloryBeFatimaPrayer,
    });
  }

  sequence.push({ type: 'hailHolyQueen', prayer: prayers.hailHolyQueen });

  return sequence;
};

export const findMysteryById = (id: string): Mystery => {
  const sets = Object.values(MYSTERY_SETS).flat();
  const found = sets.find((s) => s.id === id);
  if (!found) {
    return {
      id: 'unknown',
      title: 'Mystery',
      scripture: '',
      meditation: '',
    };
  }
  return found;
};

export const dayToMysterySet = (day: number): keyof typeof MYSTERY_SETS => {
  if (day === 1 || day === 6) return 'Joyful';
  if (day === 2 || day === 5) return 'Sorrowful';
  if (day === 3 || day === 0) return 'Glorious';
  return 'Luminous';
};
