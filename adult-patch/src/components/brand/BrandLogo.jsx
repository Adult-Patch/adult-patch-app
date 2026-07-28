import logoImage from "../../assets/images/logo.png";

function BrandLogo({
  className = "",
  size = "medium",
  showDescription = false,
}) {
  const logoClassName = [
    "brand-logo",
    `brand-logo--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={logoClassName}>
      <img
        className="brand-logo__image"
        src={logoImage}
        alt="어른패치"
      />

      {showDescription && (
        <p className="brand-logo__description">
          학교에서는 배우지 못한 생활을
          하나씩 익혀보세요.
        </p>
      )}
    </div>
  );
}

export default BrandLogo;