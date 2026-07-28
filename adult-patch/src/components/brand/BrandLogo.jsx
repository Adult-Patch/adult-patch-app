import logoImage from "../../assets/images/logo.png";

const sizeClassNames = {
  small: "w-28",
  medium: "w-48",
  large: "w-[min(82%,330px)]",
};

function BrandLogo({
  className = "",
  size = "medium",
  showDescription = false,
}) {
  const logoClassName = [
    "flex flex-col items-center",
    sizeClassNames[size] ?? sizeClassNames.medium,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={logoClassName}>
      <img
        className="block h-auto w-full object-contain"
        src={logoImage}
        alt="어른패치"
      />

      {showDescription && (
        <p className="mx-auto mt-[18px] max-w-[290px] text-center text-[15px] leading-[1.65] font-medium tracking-[-0.025em] text-content-secondary">
          학교에서는 배우지 못한 생활을
          하나씩 익혀보세요.
        </p>
      )}
    </div>
  );
}

export default BrandLogo;