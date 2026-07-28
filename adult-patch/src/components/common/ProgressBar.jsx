function ProgressBar({ current, total }) {
  const safeTotal = Math.max(total, 1);
  const safeCurrent = Math.min(
    Math.max(current, 0),
    safeTotal,
  );

  const progress =
    (safeCurrent / safeTotal) * 100;

  return (
    <div className="mt-5">
      <div className="mb-2 flex justify-between text-xs font-bold text-content-secondary">
        <span>
          {safeCurrent} / {safeTotal}
        </span>

        <span>{Math.round(progress)}%</span>
      </div>

      <div
        className="h-[7px] w-full overflow-hidden rounded-full bg-surface-strong"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeTotal}
        aria-valuenow={safeCurrent}
      >
        <div
          className="h-full rounded-full bg-brand-500 transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;