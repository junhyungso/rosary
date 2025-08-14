import type { Mystery } from '../../types';

const MysteryCard = ({
  mystery,
  onBegin,
}: {
  mystery: Mystery;
  onBegin: () => void;
}) => {
  return (
    <div className="rw-mystery-card">
      <h2 className="rw-mystery-title">{mystery.title}</h2>
      <p className="rw-mystery-scripture">{mystery.scripture}</p>
      <p className="rw-mystery-text">{mystery.meditation}</p>

      <div className="rw-mystery-actions">
        <button onClick={onBegin} className="rw-btn rw-btn-primary">
          Begin Decade
        </button>
      </div>
    </div>
  );
};

export default MysteryCard;
