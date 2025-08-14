import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import './RosaryWithMysteries.css';
import { MYSTERY_SETS, prayers } from './constants';
import type { Mystery } from './types';

type BeadType =
  | 'apostlesCreed'
  | 'ourFather'
  | 'hailMary'
  | 'gloryBe'
  | 'hailHolyQueen'
  | 'mysteryCard';

interface Bead {
  type: BeadType;
  prayer?: string;
  mysteryId?: string;
}

const dayToMysterySet = (day: number): keyof typeof MYSTERY_SETS => {
  if (day === 1 || day === 6) return 'Joyful';
  if (day === 2 || day === 5) return 'Sorrowful';
  if (day === 3 || day === 0) return 'Glorious';
  return 'Luminous';
};

const RosaryWithMysteries = () => {
  const today = new Date();
  const [dayOverride, setDayOverride] = useState<number>(today.getDay());
  const mysterySetName = useMemo(
    () => dayToMysterySet(dayOverride),
    [dayOverride]
  );

  const beads = useMemo(
    () => buildSequenceWithMysteries(mysterySetName),
    [mysterySetName]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = beads[currentIndex];
  const isMysteryCard = current.type === 'mysteryCard';

  function advance() {
    if (currentIndex < beads.length - 1) setCurrentIndex((i) => i + 1);
    else {
      alert('Rosary completed — Amen 🙏');
      setCurrentIndex(0);
    }
  }

  function beginDecadeFromMystery() {
    setCurrentIndex((i) => Math.min(i + 1, beads.length - 1));
  }

  return (
    <div className="rw-root">
      <div className="rw-card">
        <div className="rw-header">
          <h1 className="rw-title">Rosary — {mysterySetName} Mysteries</h1>

          <div className="rw-day-selector">
            <label className="rw-day-label">Day:</label>
            <select
              value={dayOverride}
              onChange={(e) => setDayOverride(Number(e.target.value))}
              className="rw-select"
            >
              <option value={0}>Sunday</option>
              <option value={1}>Monday</option>
              <option value={2}>Tuesday</option>
              <option value={3}>Wednesday</option>
              <option value={4}>Thursday</option>
              <option value={5}>Friday</option>
              <option value={6}>Saturday</option>
            </select>
          </div>
        </div>

        <div className="rw-body">
          <AnimatePresence mode="wait">
            {!isMysteryCard ? (
              <div className="rw-mystery-container">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  drag="y"
                  dragConstraints={{ top: -500, bottom: 0 }}
                  onDragEnd={() => {
                    advance();
                  }}
                  className="rw-step"
                >
                  <BeadVisual beadType={current.type} />
                </motion.div>

                <div className="rw-step">
                  <div className="rw-prayer-block">
                    <p className="rw-prayer-text">{current.prayer ?? ''}</p>
                    <p className="rw-progress">
                      {currentIndex + 1} of {beads.length}
                    </p>
                  </div>
                  <div className="rw-controls">
                    <button
                      onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                      className="rw-btn rw-btn-ghost"
                      aria-label="Previous bead"
                    >
                      Previous
                    </button>
                    <button
                      onClick={advance}
                      className="rw-btn rw-btn-primary"
                      aria-label="Next bead"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                key={`mystery-${current.mysteryId}-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="rw-mystery"
              >
                <MysteryCard
                  mystery={findMysteryById(current.mysteryId!)}
                  onBegin={beginDecadeFromMystery}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RosaryWithMysteries;

/* ---------- helpers and subcomponents ---------- */

function buildSequenceWithMysteries(mysterySetName: keyof typeof MYSTERY_SETS) {
  const sequence: Bead[] = [];

  sequence.push({ type: 'apostlesCreed', prayer: prayers.apostlesCreed });
  sequence.push({ type: 'ourFather', prayer: prayers.ourFather });
  sequence.push({ type: 'hailMary', prayer: prayers.hailMary });
  sequence.push({ type: 'hailMary', prayer: prayers.hailMary });
  sequence.push({ type: 'hailMary', prayer: prayers.hailMary });
  sequence.push({ type: 'gloryBe', prayer: prayers.gloryBe });

  const mysterySet = MYSTERY_SETS[mysterySetName];
  for (let d = 0; d < 5; d++) {
    const mystery = mysterySet[d];
    sequence.push({ type: 'mysteryCard', mysteryId: mystery.id });
    sequence.push({ type: 'ourFather', prayer: prayers.ourFather });
    for (let i = 0; i < 10; i++) {
      sequence.push({ type: 'hailMary', prayer: prayers.hailMary });
    }
    sequence.push({ type: 'gloryBe', prayer: prayers.gloryBe });
  }

  sequence.push({ type: 'hailHolyQueen', prayer: prayers.hailHolyQueen });

  return sequence;
}

function findMysteryById(id: string): Mystery {
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
}

function BeadVisual({ beadType }: { beadType: BeadType }) {
  const label =
    beadType === 'ourFather'
      ? 'Our Father'
      : beadType === 'hailMary'
      ? 'Hail Mary'
      : beadType === 'apostlesCreed'
      ? "Apostles' Creed"
      : beadType === 'gloryBe'
      ? 'Glory Be'
      : beadType === 'hailHolyQueen'
      ? 'Hail Holy Queen'
      : '';

  // only classes for round beads; apostlesCreed handled separately
  const className =
    beadType === 'ourFather'
      ? 'rw-bead rw-bead-ourfather'
      : beadType === 'hailHolyQueen'
      ? 'rw-bead rw-bead-hailqueen'
      : 'rw-bead rw-bead-hailmary';

  if (beadType === 'apostlesCreed') {
    // Render a cross SVG instead of a round bead
    return (
      <div className="rw-bead-wrap">
        <div className="rw-cross-wrap" aria-hidden>
          <svg
            className="rw-cross"
            viewBox="0 0 120 160"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Cross"
          >
            {/* vertical */}
            <rect x="48" y="8" width="24" height="120" rx="6" />
            {/* horizontal */}
            <rect x="20" y="56" width="80" height="20" rx="6" />
          </svg>
        </div>
        <div className="rw-bead-label">{label}</div>
      </div>
    );
  }

  // default round bead
  return (
    <div className="rw-bead-wrap">
      <div className={className} aria-hidden />
      <div className="rw-bead-label">{label}</div>
    </div>
  );
}

function MysteryCard({
  mystery,
  onBegin,
}: {
  mystery: Mystery;
  onBegin: () => void;
}) {
  return (
    <div className="rw-mystery-card">
      <h2 className="rw-mystery-title">{mystery.title}</h2>
      <p className="rw-mystery-scripture">{mystery.scripture}</p>
      <p className="rw-mystery-text">{mystery.meditation}</p>

      <div className="rw-mystery-actions">
        <button onClick={onBegin} className="rw-btn rw-btn-primary">
          Begin Decade
        </button>
        <button
          onClick={() => navigator.vibrate?.(50)}
          className="rw-btn rw-btn-ghost"
        >
          Ready
        </button>
      </div>
    </div>
  );
}
