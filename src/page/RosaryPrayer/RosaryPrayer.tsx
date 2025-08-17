import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import BeadVisual from '../../components/BeadVisual/BeadVisual';
import MysteryCard from '../../components/MysteryCard/MysteryCard';
import { monthNames, mysteries, weekday } from '../../utils/constants';
import {
  buildSequenceWithMysteries,
  dayToMysterySet,
  findMysteryById,
} from '../../utils/helperFunctions';
import './RosaryPrayer.css';

const RosaryPrayer = () => {
  const today = new Date();
  const [mysterySetName, setMysterySetName] = useState(
    dayToMysterySet(today.getDay())
  );

  const beads = useMemo(
    () => buildSequenceWithMysteries(mysterySetName),
    [mysterySetName]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hailMaryCount, setHailMaryCount] = useState(1);

  const current = beads[currentIndex];
  const isMysteryCard = current.type === 'mysteryCard';

  const advance = () => {
    if (
      currentIndex < beads.length - 1 &&
      current.type === 'hailMary' &&
      currentIndex > 6
    ) {
      setHailMaryCount((currIndex) => currIndex + 1);
      setCurrentIndex((currIndex) => currIndex + 1);
    } else if (currentIndex < beads.length - 1) {
      setCurrentIndex((currIndex) => currIndex + 1);
    } else {
      alert('Rosary completed — Amen 🙏');
      setCurrentIndex(0);
    }

    if (hailMaryCount === 10) setHailMaryCount(1);
  };

  const beginDecadeFromMystery = () => {
    setCurrentIndex((i) => Math.min(i + 1, beads.length - 1));
  };

  return (
    <div className="rw-root">
      <div className="rw-card">
        <div className="rw-header">
          <h1 className="rw-title">Rosary — {mysterySetName} Mysteries</h1>

          <div className="rw-day-selector">
            <label className="rw-day-label">Mystery:</label>
            <select
              value={mysterySetName}
              onChange={(e) =>
                setMysterySetName(e.target.value as typeof mysterySetName)
              }
              className="rw-select"
            >
              {mysteries.map((mystery) => (
                <option key={mystery} value={mystery}>
                  {mystery}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="rw-subtitle">
          {weekday[today.getDay()]}
          {', '} {monthNames[today.getMonth()]} {today.getDate()},{' '}
          {today.getFullYear()}
        </div>

        <div className="rw-body">
          <AnimatePresence mode="wait">
            {!isMysteryCard ? (
              <div className="rw-mystery-container">
                <div key={currentIndex} className="rw-step">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 30 }}
                    onDragEnd={(event, info) => {
                      if (info.offset.y > 10) {
                        advance();
                      }
                    }}
                  >
                    <BeadVisual
                      beadType={current.type}
                      hailMaryCount={hailMaryCount}
                      currentIndex={currentIndex}
                    />
                  </motion.div>
                </div>

                <div className="rw-step-2">
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

export default RosaryPrayer;
