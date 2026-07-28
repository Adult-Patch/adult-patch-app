import { useMemo } from "react";

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

import { getRecommendedPatches } from "../../data/patches";
import { useAppState } from "../../hooks/useAppState";

function OnboardingResultPage() {
  const navigate = useNavigate();

  const { appState } = useAppState();

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
    <AppLayout className="px-[22px] pt-[calc(46px+env(safe-area-inset-top))] pb-7">
      <header className="text-center">
        <div className="relative mx-auto mb-[25px] flex size-[82px] rotate-[-4deg] items-center justify-center rounded-[28px] bg-brand-50">
          <span className="size-[54px] rounded-[18px] border-4 border-brand-500" />

          <span className="absolute h-[14px] w-[27px] -translate-y-[3px] -rotate-45 border-b-[5px] border-l-[5px] border-brand-700" />
        </div>

        <p className="mb-2 text-[13px] font-bold text-brand-600">
          맞춤 분석 완료
        </p>

        <h1 className="text-[29px] leading-[1.3] font-extrabold tracking-[-0.05em] text-content">
          지금 시작하기 좋은
          <br />
          패치를 찾았어요.
        </h1>

        <p className="mt-[14px] text-sm leading-[1.6] tracking-[-0.025em] text-content-secondary">
          선택한 생활 상황과 경험 정도를
          기준으로 두 가지 패치를 추천해요.
        </p>
      </header>

      <section className="mt-[25px] flex flex-wrap justify-center gap-2">
        {situationOption && (
          <span className="inline-flex min-h-8 items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-[7px] text-xs font-bold text-brand-700">
            {situationOption.shortLabel}
          </span>
        )}

        {selectedInterestOptions.map(
          (option) => (
            <span
              key={option.id}
              className="inline-flex min-h-8 items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-[7px] text-xs font-bold text-brand-700"
            >
              {option.label}
            </span>
          ),
        )}

        {experienceOption && (
          <span className="inline-flex min-h-8 items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-[7px] text-xs font-bold text-brand-700">
            {experienceOption.shortLabel}
          </span>
        )}
      </section>

      <section className="mt-[30px] grid gap-[14px]">
        {recommendedPatches.map(
          (patch, index) => (
            <article
              key={patch.id}
              className="rounded-3xl border border-line bg-white p-5 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-[31px] items-center justify-center rounded-[11px] bg-brand-500 text-[13px] font-extrabold text-white">
                  {index + 1}
                </span>

                <span className="rounded-full bg-brand-50 px-[10px] py-[7px] text-[11px] font-bold text-brand-700">
                  {patch.category}
                </span>
              </div>

              <span className="mt-[17px] block text-xs font-bold text-brand-600">
                {patch.level}
              </span>

              <h2 className="mt-[7px] text-[19px] leading-[1.4] font-extrabold tracking-[-0.035em] text-content">
                {patch.title}
              </h2>

              <p className="mt-[9px] text-[13px] leading-[1.55] tracking-[-0.02em] text-content-secondary">
                {patch.description}
              </p>

              <p className="mt-[14px] rounded-xl bg-brand-50 px-[13px] py-3 text-xs leading-[1.5] font-semibold tracking-[-0.02em] text-brand-800">
                {patch.recommendationReason}
              </p>

              <div className="mt-[17px] flex items-center justify-between">
                <span className="text-xs font-semibold text-content-tertiary">
                  약 {patch.estimatedMinutes}분
                </span>

                <button
                  type="button"
                  className="min-h-[38px] min-w-[88px] rounded-xl bg-brand-600 px-[14px] py-[9px] text-[13px] font-bold text-white active:scale-[0.97]"
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

      <div className="mt-auto pt-8">
        <PrimaryButton
          onClick={() =>
            navigate("/home")
          }
        >
          홈에서 시작하기
        </PrimaryButton>
      </div>
    </AppLayout>
  );
}

export default OnboardingResultPage;