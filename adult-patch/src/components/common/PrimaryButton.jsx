function PrimaryButton({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  onClick,
}) {
  const buttonClassName = [
    "button",
    `button--${variant}`,
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