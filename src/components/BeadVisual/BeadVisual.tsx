import type { BeadType } from '../../types';

const BeadVisual = ({
  beadType,
  hailMaryCount,
  currentIndex,
}: {
  beadType: BeadType;
  hailMaryCount: number;
  currentIndex: number;
}) => {
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
            {/* <img src={Cross} alt="cross" width={50} /> */}
            {/* vertical */}
            <rect x="48" y="8" width="24" height="120" rx="6" />
            {/* horizontal */}
            <rect x="20" y="44" width="80" height="20" rx="6" />
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
      <div className="rw-bead-label">
        {label}{' '}
        {beadType === 'hailMary' && currentIndex > 6 ? hailMaryCount : ''}
      </div>
    </div>
  );
};

export default BeadVisual;
