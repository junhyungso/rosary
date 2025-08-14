export type Mystery = {
  id: string;
  title: string;
  scripture: string;
  meditation: string;
};

export type BeadType =
  | 'apostlesCreed'
  | 'ourFather'
  | 'hailMary'
  | 'gloryBe'
  | 'fatimaPrayer'
  | 'hailHolyQueen'
  | 'mysteryCard';

export type Bead = {
  type: BeadType;
  prayer?: string;
  mysteryId?: string;
};
