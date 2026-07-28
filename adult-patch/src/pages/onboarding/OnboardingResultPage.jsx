import { useMemo, useState } from "react";

import {
  Navigate,
  useNavigate,
} from "react-router";

import PrimaryButton from "../../components/common/PrimaryButton";
import AppLayout from "../../components/layout/AppLayout";

import {
  getExperienceOption,
  getInterestOption,
  getSituationOption,
} from "../../data/onboardingOptions";

import {
  getRecommendedPatches,
} from "../../data/patches";

import { getAppState } from "../../utils/appStorage";

function OnboardingResultPage() {
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

  if (!appState.onboardingCompleted) {
    return (
      <Navigate
        to="/onboarding"
        replace
      />
    );
  }

  const situationOption =
    getSituationOption(
      appState.selectedSituation,
    );

  const experienceOption =
    getExperienceOption(
      appState.experienceLevel,
    );

  const selectedInterestOptions =
    appState.selectedInterests
      .map((interestId) =>
        getInterestOption(interestId),
      )
      .filter(Boolean);

  return (
    <AppLayout className="page recommendation-result-page">
      <header className="recommendation-result-header">
        <div className="recommendation-result-symbol">
          <span />
        </div>

        <p className="eyebrow">
          맞춤 분석 완료
        </p>

        <h1>
          지금 시작하기 좋은
          <br />
          패치를 찾았어요.
        </h1>

        <p>
          선택한 생활 상황과 경험 정도를
          기준으로 두 가지 패치를 추천해요.
        </p>
      </header>

      <section className="recommendation-summary">
        {situationOption && (
          <span>
            {situationOption.shortLabel}
          </span>
        )}

        {selectedInterestOptions.map(
          (option) => (
            <span key={option.id}>
              {option.label}
            </span>
          ),
        )}

        {experienceOption && (
          <span>
            {experienceOption.shortLabel}
          </span>
        )}
      </section>

      <section className="recommendation-list">
        {recommendedPatches.map(
          (patch, index) => (
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
                {patch.level}
              </span>

              <h2>{patch.title}</h2>

              <p className="recommendation-card__description">
                {patch.description}
              </p>

              <p className="recommendation-card__reason">
                {patch.recommendationReason}
              </p>

              <div className="recommendation-card__footer">
                <span>
                  약 {patch.estimatedMinutes}분
                </span>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/patch/${patch.id}`,
                    )
                  }
                >
                  바로 시작
                </button>
              </div>
            </article>
          ),
        )}
      </section>

      <div className="page-bottom-action">
        <PrimaryButton
          onClick={() => navigate("/home")}
        >
          홈에서 시작하기
        </PrimaryButton>
      </div>
    </AppLayout>
  );
}

export default OnboardingResultPage;