import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import characterMain from "../../assets/images/characters/character-main.png";

import CharacterStage from "../../components/brand/CharacterStage";
import AppLayout from "../../components/layout/AppLayout";

import {
  getInterestOption,
  getSituationOption,
} from "../../data/onboardingOptions";

import {
  getRecommendedPatches,
} from "../../data/patches";

import { getAppState } from "../../utils/appStorage";

function HomePage() {
  const navigate = useNavigate();

  const [appState] = useState(() =>
    getAppState(),
  );

  const recommendedPatches = useMemo(
    () =>
      getRecommendedPatches(
        appState,
        2,
      ),
    [appState],
  );

  const completedPatchCount =
    appState.completedPatchIds.length;

  const completedMissionCount =
    appState.completedMissionIds.length;

  const situationOption =
    getSituationOption(
      appState.selectedSituation,
    );

  const selectedInterestOptions =
    appState.selectedInterests
      .map((interestId) =>
        getInterestOption(interestId),
      )
      .filter(Boolean);

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

      <CharacterStage
        src={characterMain}
        alt="정장을 입은 어른패치 캐릭터"
        size="small"
        className="home-page__character"
        message="처음이라 모르는 건 당연해요."
      />

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

      <section className="home-profile-summary">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              나의 관심 분야
            </p>

            <h2>
              {situationOption?.shortLabel ??
                "생활 전반"}
            </h2>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/onboarding")
            }
          >
            다시 설정
          </button>
        </div>

        <div className="home-interest-list">
          {selectedInterestOptions.map(
            (option) => (
              <span key={option.id}>
                {option.label}
              </span>
            ),
          )}
        </div>
      </section>

      <section className="recommended-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              맞춤 추천
            </p>

            <h2>지금 시작하기 좋은 패치</h2>
          </div>

          <span className="recommendation-count">
            2개
          </span>
        </div>

        <div className="recommendation-list recommendation-list--home">
          {recommendedPatches.map(
            (patch, index) => {
              const isCompleted =
                appState.completedPatchIds.includes(
                  patch.id,
                );

              return (
                <article
                  key={patch.id}
                  className="recommendation-card"
                >
                  <div className="recommendation-card__top">
                    <span className="recommendation-card__number">
                      {index + 1}
                    </span>

                    <span className="category-badge">
                      {patch.category}
                    </span>
                  </div>

                  <span className="recommendation-card__level">
                    {isCompleted
                      ? "완료한 패치"
                      : patch.level}
                  </span>

                  <h3>{patch.title}</h3>

                  <p className="recommendation-card__description">
                    {patch.description}
                  </p>

                  <p className="recommendation-card__reason">
                    {patch.recommendationReason}
                  </p>

                  <div className="recommendation-card__footer">
                    <span>
                      {isCompleted
                        ? "패치 완료"
                        : `약 ${patch.estimatedMinutes}분`}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/patch/${patch.id}`,
                        )
                      }
                    >
                      {isCompleted
                        ? "다시 보기"
                        : "시작하기"}
                    </button>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </section>
    </AppLayout>
  );
}

export default HomePage;