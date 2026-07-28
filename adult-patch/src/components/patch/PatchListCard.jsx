const categoryClassNames = {
  "daily-life": "bg-brand-500",
  "housing-contract": "bg-[#6271c7]",
  finance: "bg-[#387f83]",
  work: "bg-[#536595]",
  safety: "bg-[#8866a9]",
};

function PatchListCard({
  patch,
  completed = false,
  onClick,
}) {
  return (
    <article
      className={[
        "shrink-0 rounded-3xl border p-[19px] shadow-card",
        completed
          ? "border-brand-100 bg-gradient-to-br from-white to-brand-50"
          : "border-line bg-white",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-[11px]">
          <span
            className={[
              "flex size-[42px] flex-none items-center justify-center",
              "rounded-[14px] text-sm font-extrabold text-white",
              categoryClassNames[patch.categoryId] ??
                "bg-brand-500",
            ].join(" ")}
            aria-hidden="true"
          >
            {patch.category.slice(0, 1)}
          </span>

          <div className="grid gap-[3px]">
            <span className="text-[13px] leading-[1.3] font-bold text-content">
              {patch.category}
            </span>

            <span className="text-[11px] leading-[1.3] font-semibold text-content-tertiary">
              {patch.level}
            </span>
          </div>
        </div>

        {completed && (
          <span className="inline-flex min-h-[29px] items-center justify-center rounded-full bg-positive-light px-[10px] py-[6px] text-[11px] font-bold text-positive">
            완료
          </span>
        )}
      </div>

      <h2 className="mt-[17px] text-lg leading-[1.4] font-extrabold tracking-[-0.035em] text-content">
        {patch.title}
      </h2>

      <p className="mt-2 text-[13px] leading-[1.55] tracking-[-0.02em] text-content-secondary">
        {patch.description}
      </p>

      <div className="mt-[17px] flex items-center justify-between border-t border-line pt-[15px]">
        <span className="text-xs font-semibold text-content-tertiary">
          약 {patch.estimatedMinutes}분
        </span>

        <button
          type="button"
          className="inline-flex min-h-[38px] items-center justify-center gap-[6px] rounded-xl bg-brand-50 px-[13px] py-[9px] text-xs font-bold text-brand-700 transition active:scale-[0.97]"
          onClick={onClick}
        >
          {completed ? "다시 보기" : "시작하기"}

          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

export default PatchListCard;