import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import BeadVisual from './components/BeadVisual/BeadVisual';
import MysteryCard from './components/MysteryCard/MysteryCard';
import './RosaryWithMysteries.css';
import {
  buildSequenceWithMysteries,
  dayToMysterySet,
  findMysteryById,
} from './utils/helperFunctions';

const RosaryWithMysteries = () => {
  const today = new Date();
  const [dayOverride, setDayOverride] = useState<number>(today.getDay());
  const mysterySetName = useMemo(
    () => dayToMysterySet(dayOverride),
    [dayOverride]
  );
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

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
              {weekday.map((day, index) => (
                <option value={index}>{day}</option>
              ))}
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
