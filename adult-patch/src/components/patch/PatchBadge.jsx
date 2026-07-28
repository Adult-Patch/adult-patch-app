const sizeClassNames = {
  small: {
    wrapper: "size-16 rounded-[22px]",
    inner: "inset-[5px] rounded-[17px]",
    symbol: "text-xl",
    shine: "size-5",
  },

  medium: {
    wrapper: "size-24 rounded-[30px]",
    inner: "inset-[7px] rounded-[23px]",
    symbol: "text-[30px]",
    shine: "size-7",
  },

  large: {
    wrapper: "size-32 rounded-[38px]",
    inner: "inset-[9px] rounded-[29px]",
    symbol: "text-[42px]",
    shine: "size-9",
  },
};

const toneClassNames = {
  blue: {
    background:
      "from-brand-400 to-brand-800",
    border: "border-brand-200",
    inner: "border-white/45",
  },

  sky: {
    background:
      "from-sky-400 to-blue-700",
    border: "border-sky-200",
    inner: "border-white/45",
  },

  purple: {
    background:
      "from-purple-400 to-purple-800",
    border: "border-purple-200",
    inner: "border-white/45",
  },

  indigo: {
    background:
      "from-indigo-400 to-indigo-800",
    border: "border-indigo-200",
    inner: "border-white/45",
  },

  teal: {
    background:
      "from-teal-400 to-teal-800",
    border: "border-teal-200",
    inner: "border-white/45",
  },

  green: {
    background:
      "from-emerald-400 to-emerald-800",
    border: "border-emerald-200",
    inner: "border-white/45",
  },

  slate: {
    background:
      "from-slate-400 to-slate-800",
    border: "border-slate-200",
    inner: "border-white/45",
  },

  navy: {
    background:
      "from-[#65749c] to-[#283552]",
    border: "border-[#c7cee0]",
    inner: "border-white/45",
  },

  violet: {
    background:
      "from-violet-400 to-violet-800",
    border: "border-violet-200",
    inner: "border-white/45",
  },

  rose: {
    background:
      "from-rose-400 to-rose-800",
    border: "border-rose-200",
    inner: "border-white/45",
  },
};

function PatchBadge({
  badge,
  size = "medium",
  unlocked = true,
  className = "",
}) {
  const sizeClasses =
    sizeClassNames[size] ??
    sizeClassNames.medium;

  const toneClasses =
    toneClassNames[badge?.tone] ??
    toneClassNames.blue;

  return (
    <div
      className={[
        "relative flex flex-none rotate-[-3deg] items-center justify-center",
        "border shadow-[0_12px_28px_rgb(29_50_84/20%)]",
        "bg-gradient-to-br",
        sizeClasses.wrapper,
        unlocked
          ? [
              toneClasses.background,
              toneClasses.border,
            ].join(" ")
          : "border-line bg-gradient-to-br from-[#d8dde7] to-[#929bad]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={
        unlocked
          ? `${badge?.name ?? "획득한 패치"} 배지`
          : "아직 획득하지 않은 패치"
      }
    >
      <span
        className={[
          "absolute border-2",
          sizeClasses.inner,
          toneClasses.inner,
        ].join(" ")}
      />

      <span
        className={[
          "relative z-10 font-extrabold text-white",
          "drop-shadow-[0_2px_2px_rgb(0_0_0/18%)]",
          sizeClasses.symbol,
        ].join(" ")}
      >
        {unlocked ? badge?.symbol ?? "어" : "?"}
      </span>

      <span
        className={[
          "absolute top-[14%] left-[17%]",
          "rounded-full bg-white/25 blur-[1px]",
          sizeClasses.shine,
        ].join(" ")}
        aria-hidden="true"
      />

      <span
        className="absolute right-[14%] bottom-[13%] size-2 rounded-full bg-white/40"
        aria-hidden="true"
      />
    </div>
  );
}

export default PatchBadge;