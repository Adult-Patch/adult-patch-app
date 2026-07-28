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
      className="gap-[26px] px-[22px] pt-[calc(24px+env(safe-area-inset-top))] pb-9"
    >
      <header className="flex items-start justify-between">
        <div>
          <p className="mb-2 text-[13px] font-bold text-brand-600">
            오늘의 어른패치
          </p>

          <h1 className="text-[28px] leading-[1.3] font-extrabold tracking-[-0.045em] text-content">
            오늘은 어떤 능력을
            <br />
            업데이트할까요?
          </h1>
        </div>

        <div
          className="flex size-11 flex-none items-center justify-center rounded-full border-[3px] border-brand-100 bg-brand-500 text-sm font-extrabold text-white"
          aria-label="프로필"
        >
          어
        </div>
      </header>

      <CharacterStage
        src={characterMain}
        alt="정장을 입은 어른패치 캐릭터"
        size="small"
        className="rounded-3xl border border-brand-100 bg-gradient-to-b from-[#f6f9ff] to-white px-2.5 pt-2.5 pb-1"
        message="처음이라 모르는 건 당연해요."
      />

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-[18px] bg-surface p-[18px]">
          <span className="mb-[7px] block text-xs font-semibold text-content-secondary">
            완료한 패치
          </span>

          <strong className="text-[22px] font-extrabold text-content">
            {appState.completedPatchIds.length}개
          </strong>
        </div>

        <div className="rounded-[18px] bg-surface p-[18px]">
          <span className="mb-[7px] block text-xs font-semibold text-content-secondary">
            완료한 미션
          </span>

          <strong className="text-[22px] font-extrabold text-content">
            {appState.completedMissionIds.length}개
          </strong>
        </div>
      </section>

      <section className="grid gap-[14px]">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-2 text-[13px] font-bold text-brand-600">
              나의 관심 분야
            </p>

            <h2 className="text-[22px] font-extrabold tracking-[-0.04em] text-content">
              {situationOption?.shortLabel ??
                "생활 전반"}
            </h2>
          </div>

          <button
            type="button"
            className="rounded-[10px] bg-surface px-[10px] py-[7px] text-[11px] font-bold text-content-secondary"
            onClick={() =>
              navigate("/onboarding")
            }
          >
            다시 설정
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
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
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-2 text-[13px] font-bold text-brand-600">
              맞춤 추천
            </p>

            <h2 className="text-[22px] font-extrabold tracking-[-0.04em] text-content">
              지금 시작하기 좋은 패치
            </h2>
          </div>

          <span className="inline-flex min-h-[30px] min-w-[42px] items-center justify-center rounded-full bg-brand-50 px-[10px] py-[6px] text-xs font-bold text-brand-700">
            2개
          </span>
        </div>

        <div className="grid gap-[14px]">
          {recommendedPatches.map(
            (patch, index) => {
              const isCompleted =
                appState.completedPatchIds.includes(
                  patch.id,
                );

              return (
                <article
                  key={patch.id}
                  className="shrink-0 rounded-3xl border border-line bg-white p-5 shadow-card"
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
                    {isCompleted
                      ? "완료한 패치"
                      : patch.level}
                  </span>

                  <h3 className="mt-[7px] text-[19px] leading-[1.4] font-extrabold tracking-[-0.035em] text-content">
                    {patch.title}
                  </h3>

                  <p className="mt-[9px] text-[13px] leading-[1.55] tracking-[-0.02em] text-content-secondary">
                    {patch.description}
                  </p>

                  <p className="mt-[14px] rounded-xl bg-brand-50 px-[13px] py-3 text-xs leading-[1.5] font-semibold text-brand-800">
                    {patch.recommendationReason}
                  </p>

                  <div className="mt-[17px] flex items-center justify-between">
                    <span className="text-xs font-semibold text-content-tertiary">
                      {isCompleted
                        ? "패치 완료"
                        : `약 ${patch.estimatedMinutes}분`}
                    </span>

                    <button
                      type="button"
                      className="min-h-[38px] rounded-xl bg-brand-600 px-[14px] py-[9px] text-[13px] font-bold text-white active:scale-[0.97]"
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