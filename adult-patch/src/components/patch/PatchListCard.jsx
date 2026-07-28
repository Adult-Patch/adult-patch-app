function PatchListCard({
  patch,
  completed = false,
  onClick,
}) {
  return (
    <article
      className={[
        "patch-list-card",
        completed
          ? "patch-list-card--completed"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="patch-list-card__header">
        <div className="patch-list-card__category">
          <span
            className={[
              "patch-list-card__category-symbol",
              `patch-list-card__category-symbol--${patch.categoryId}`,
            ].join(" ")}
            aria-hidden="true"
          >
            {patch.category.slice(0, 1)}
          </span>

          <div>
            <span className="patch-list-card__category-name">
              {patch.category}
            </span>

            <span className="patch-list-card__level">
              {patch.level}
            </span>
          </div>
        </div>

        {completed && (
          <span className="patch-list-card__completed">
            완료
          </span>
        )}
      </div>

      <h2 className="patch-list-card__title">
        {patch.title}
      </h2>

      <p className="patch-list-card__description">
        {patch.description}
      </p>

      <div className="patch-list-card__footer">
        <span className="patch-list-card__time">
          약 {patch.estimatedMinutes}분
        </span>

        <button
          type="button"
          className="patch-list-card__button"
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