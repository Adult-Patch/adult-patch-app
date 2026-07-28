function ChoiceButton({
  children,
  selected = false,
  disabled = false,
  onClick,
}) {
  const className = [
    "choice-button",
    selected ? "choice-button--selected" : "",
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
      <span className="choice-button__indicator" />

      <span className="choice-button__label">
        {children}
      </span>
    </button>
  );
}

export default ChoiceButton;