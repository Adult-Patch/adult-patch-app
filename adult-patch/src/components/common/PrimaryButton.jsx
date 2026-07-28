const variantClassNames = {
  primary: [
    "bg-gradient-to-br from-brand-500 to-brand-700",
    "text-white",
    "shadow-[0_10px_20px_rgb(49_95_209/24%)]",
  ].join(" "),

  secondary: [
    "bg-brand-50",
    "text-brand-700",
  ].join(" "),
};

function PrimaryButton({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  onClick,
}) {
  const buttonClassName = [
    "inline-flex min-h-[54px] w-full items-center justify-center",
    "rounded-[18px] px-5 py-[15px]",
    "text-base leading-[1.4] font-bold tracking-[-0.025em]",
    "transition duration-150",
    "enabled:cursor-pointer enabled:active:scale-[0.985]",
    "disabled:bg-[#e8ebf0] disabled:text-[#a5adba] disabled:shadow-none",
    variantClassNames[variant] ??
      variantClassNames.primary,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;