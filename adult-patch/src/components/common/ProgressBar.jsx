function ProgressBar({ current, total }) {
  const safeTotal = Math.max(total, 1);
  const safeCurrent = Math.min(
    Math.max(current, 0),
    safeTotal,
  );

  const progress =
    (safeCurrent / safeTotal) * 100;

  return (
    <div className="progress">
      <div className="progress__information">
        <span>
          {safeCurrent} / {safeTotal}
        </span>

        <span>{Math.round(progress)}%</span>
      </div>

      <div
        className="progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeTotal}
        aria-valuenow={safeCurrent}
      >
        <div
          className="progress__value"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;