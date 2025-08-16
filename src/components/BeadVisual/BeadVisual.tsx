import Cross from '../../assets/cross.jpg';
import type { BeadType } from '../../types';

const BeadVisual = ({ beadType }: { beadType: BeadType }) => {
  const label =
    beadType === 'ourFather'
      ? 'Our Father'
      : beadType === 'hailMary'
      ? 'Hail Mary'
      : beadType === 'apostlesCreed'
      ? "Apostles' Creed"
      : beadType === 'gloryBe'
      ? 'Glory Be'
      : beadType === 'fatimaPrayer'
      ? 'Fatima Prayer'
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
    // Render a cross
    return (
      <div className="rw-bead-wrap">
        <div className="rw-cross-wrap" aria-hidden>
          <img src={Cross} alt="cross" width={120} />
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
};

export default BeadVisual;
