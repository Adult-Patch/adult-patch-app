import { useState } from "react";
import { useNavigate } from "react-router";

import PrimaryButton from "../../components/common/PrimaryButton";
import AppLayout from "../../components/layout/AppLayout";
import { patches } from "../../data/patches";
import { getAppState } from "../../utils/appStorage";

function HomePage() {
  const navigate = useNavigate();

  const [appState] = useState(() =>
    getAppState(),
  );

  const recommendedPatch = patches[0];

  const isRecommendedPatchCompleted =
    appState.completedPatchIds.includes(
      recommendedPatch.id,
    );

  const completedPatchCount =
    appState.completedPatchIds.length;

  const completedMissionCount =
    appState.completedMissionIds.length;

  return (
    <AppLayout
      showBottomNavigation
      className="page home-page"
    >
      <header className="home-header">
        <div>
          <p className="eyebrow">
            오늘의 어른패치
          </p>

          <h1>
            오늘은 어떤 능력을
            <br />
            업데이트할까요?
          </h1>
        </div>

        <div
          className="home-header__profile"
          aria-label="프로필"
        >
          어
        </div>
      </header>

      <section className="home-status">
        <div>
          <span>완료한 패치</span>
          <strong>
            {completedPatchCount}개
          </strong>
        </div>

        <div>
          <span>완료한 미션</span>
          <strong>
            {completedMissionCount}개
          </strong>
        </div>
      </section>

      <section className="recommended-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {isRecommendedPatchCompleted
                ? "완료한 패치"
                : "추천 패치"}
            </p>

            <h2>첫 자취 기본편</h2>
          </div>

          <span className="category-badge">
            {recommendedPatch.category}
          </span>
        </div>

        <article className="patch-card">
          <div className="patch-card__visual">
            <span className="patch-card__visual-circle" />

            <span className="patch-card__visual-shirt">
              <span className="patch-card__visual-tie" />
            </span>
          </div>

          <div className="patch-card__content">
            <span className="patch-card__meta">
              {isRecommendedPatchCompleted
                ? "패치 완료"
                : `약 ${recommendedPatch.estimatedMinutes}분`}
            </span>

            <h3>{recommendedPatch.title}</h3>

            <p>{recommendedPatch.description}</p>

            <PrimaryButton
              onClick={() =>
                navigate(
                  `/patch/${recommendedPatch.id}`,
                )
              }
            >
              {isRecommendedPatchCompleted
                ? "다시 학습하기"
                : "패치 시작하기"}
            </PrimaryButton>
          </div>
        </article>
      </section>
    </AppLayout>
  );
}

export default HomePage;