function CharacterStage({
  src,
  alt = "어른패치 캐릭터",
  size = "medium",
  className = "",
  message = "",
}) {
  const stageClassName = [
    "character-stage",
    `character-stage--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={stageClassName}>
      <div className="character-stage__visual">
        {src ? (
          <img
            className="character-stage__image"
            src={src}
            alt={alt}
          />
        ) : (
          <div
            className="character-stage__placeholder"
            aria-hidden="true"
          >
            <span className="character-stage__head">
              <span className="character-stage__eye character-stage__eye--left" />
              <span className="character-stage__eye character-stage__eye--right" />
              <span className="character-stage__mouth" />
            </span>

            <span className="character-stage__body">
              <span className="character-stage__shirt" />

              <span className="character-stage__lapel character-stage__lapel--left" />
              <span className="character-stage__lapel character-stage__lapel--right" />

              <span className="character-stage__tie">
                <span className="character-stage__tie-knot" />
                <span className="character-stage__tie-body" />
              </span>
            </span>

            <span className="character-stage__arm character-stage__arm--left" />
            <span className="character-stage__arm character-stage__arm--right" />
          </div>
        )}

        <span className="character-stage__ground" />
      </div>

      {message && (
        <p className="character-stage__message">
          {message}
        </p>
      )}
    </div>
  );
}

export default CharacterStage;