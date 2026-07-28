const visualSizeClassNames = {
  small: "h-[138px] w-[150px]",
  medium: "h-[190px] w-[210px]",
  large: "h-[235px] w-[270px]",
};

function CharacterStage({
  src,
  alt = "어른패치 캐릭터",
  size = "medium",
  className = "",
  message = "",
}) {
  const stageClassName = [
    "flex w-full flex-col items-center",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={stageClassName}>
      <div
        className={[
          "relative flex items-end justify-center",
          visualSizeClassNames[size] ??
            visualSizeClassNames.medium,
        ].join(" ")}
      >
        {src ? (
          <img
            className="relative z-10 block max-h-[92%] max-w-[92%] object-contain"
            src={src}
            alt={alt}
          />
        ) : (
          <div
            className="relative z-10 flex h-[82%] w-[68%] items-center justify-center rounded-[40%] border-4 border-brand-800 bg-brand-500"
            aria-hidden="true"
          >
            <span className="rounded-full bg-white/90 px-3 py-2 text-xs font-extrabold text-brand-800">
              어른패치
            </span>
          </div>
        )}

        <span className="absolute right-[8%] bottom-[3%] left-[8%] h-3 rounded-full bg-brand-100" />
      </div>

      {message && (
        <p className="mt-3 inline-flex max-w-[310px] rounded-[18px_18px_18px_5px] border border-brand-100 bg-brand-50 px-4 py-[11px] text-center text-[13px] leading-[1.45] font-semibold tracking-[-0.02em] text-brand-800">
          {message}
        </p>
      )}
    </div>
  );
}

export default CharacterStage;