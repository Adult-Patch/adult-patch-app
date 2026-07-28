function ChoiceButton({
  children,
  selected = false,
  disabled = false,
  onClick,
}) {
  const className = [
    "flex min-h-[66px] w-full items-center rounded-[18px]",
    "border-[1.5px] px-4 py-4 text-left",
    "transition duration-150",
    "enabled:cursor-pointer enabled:active:scale-[0.99]",
    selected
      ? "border-brand-500 bg-brand-50 shadow-[0_0_0_3px_rgb(70_121_239/10%)]"
      : "border-line bg-white",
    disabled
      ? "cursor-not-allowed opacity-45"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
    >
      <span
        className={[
          "mr-[13px] size-[22px] flex-none rounded-full",
          selected
            ? "border-[6px] border-brand-500 bg-white"
            : "border-2 border-[#c4cbd7]",
        ].join(" ")}
      />

      <span className="text-[15px] leading-[1.45] font-semibold tracking-[-0.025em] text-content">
        {children}
      </span>
    </button>
  );
}

export default ChoiceButton;