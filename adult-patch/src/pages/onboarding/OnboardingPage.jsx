import { useState } from "react";
import { useNavigate } from "react-router";

import BrandLogo from "../../components/brand/BrandLogo";
import ChoiceButton from "../../components/common/ChoiceButton";
import PrimaryButton from "../../components/common/PrimaryButton";
import ProgressBar from "../../components/common/ProgressBar";
import AppLayout from "../../components/layout/AppLayout";

import {
  EXPERIENCE_OPTIONS,
  INTEREST_OPTIONS,
  SITUATION_OPTIONS,
} from "../../data/onboardingOptions";

import {
  getAppState,
  saveOnboarding,
} from "../../utils/appStorage";

const TOTAL_STEP_COUNT = 3;
const MAX_INTEREST_COUNT = 2;

function OnboardingPage() {
  const navigate = useNavigate();
  const savedState = getAppState();

  const [currentStep, setCurrentStep] =
    useState(1);

  const [
    selectedSituation,
    setSelectedSituation,
  ] = useState(savedState.selectedSituation);

  const [
    selectedInterests,
    setSelectedInterests,
  ] = useState(savedState.selectedInterests);

  const [
    experienceLevel,
    setExperienceLevel,
  ] = useState(savedState.experienceLevel);

  const isCurrentStepComplete = (() => {
    if (currentStep === 1) {
      return Boolean(selectedSituation);
    }

    if (currentStep === 2) {
      return selectedInterests.length > 0;
    }

    return Boolean(experienceLevel);
  })();

  const toggleInterest = (interestId) => {
    setSelectedInterests(
      (previousInterests) => {
        const isSelected =
          previousInterests.includes(interestId);

        if (isSelected) {
          return previousInterests.filter(
            (id) => id !== interestId,
          );
        }

        if (
          previousInterests.length >=
          MAX_INTEREST_COUNT
        ) {
          return previousInterests;
        }

        return [
          ...previousInterests,
          interestId,
        ];
      },
    );
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate(-1);
      return;
    }

    setCurrentStep(
      (previousStep) => previousStep - 1,
    );
  };

  const handleNext = () => {
    if (!isCurrentStepComplete) {
      return;
    }

    if (currentStep < TOTAL_STEP_COUNT) {
      setCurrentStep(
        (previousStep) => previousStep + 1,
      );

      return;
    }

    saveOnboarding({
      selectedSituation,
      selectedInterests,
      experienceLevel,
    });

    navigate("/onboarding/result");
  };

  const renderHeader = ({
    eyebrow,
    title,
    description,
  }) => (
    <header className="mt-[30px]">
      <p className="mb-2 text-[13px] leading-[1.3] font-bold tracking-[-0.02em] text-brand-600">
        {eyebrow}
      </p>

      <h1 className="text-[30px] leading-[1.25] font-extrabold tracking-[-0.045em] text-content">
        {title}
      </h1>

      <p className="mt-[14px] text-[15px] leading-[1.55] tracking-[-0.025em] text-content-secondary">
        {description}
      </p>
    </header>
  );

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <>
          {renderHeader({
            eyebrow: "현재 생활 상황",
            title: (
              <>
                지금 어떤 생활을
                <br />
                준비하고 있나요?
              </>
            ),
            description:
              "현재 상황을 기준으로 먼저 필요한 생활 능력을 찾아드릴게요.",
          })}

          <section className="mt-8 grid gap-3 pb-3">
            {SITUATION_OPTIONS.map(
              (option) => (
                <ChoiceButton
                  key={option.id}
                  selected={
                    selectedSituation ===
                    option.id
                  }
                  onClick={() =>
                    setSelectedSituation(
                      option.id,
                    )
                  }
                >
                  {option.label}
                </ChoiceButton>
              ),
            )}
          </section>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          {renderHeader({
            eyebrow: "어려운 생활 분야",
            title: (
              <>
                어떤 부분이
                <br />
                가장 어렵게 느껴지나요?
              </>
            ),
            description:
              "지금 배우고 싶은 분야를 최대 두 개까지 선택해주세요.",
          })}

          <div className="mt-6 flex justify-between rounded-xl bg-surface px-[14px] py-3 text-xs font-bold text-content-secondary">
            <span className="text-brand-600">
              선택 {selectedInterests.length}
            </span>

            <span>
              최대 {MAX_INTEREST_COUNT}개
            </span>
          </div>

          <section className="mt-3 grid gap-3 pb-3">
            {INTEREST_OPTIONS.map(
              (option) => {
                const isSelected =
                  selectedInterests.includes(
                    option.id,
                  );

                const isDisabled =
                  selectedInterests.length >=
                    MAX_INTEREST_COUNT &&
                  !isSelected;

                return (
                  <ChoiceButton
                    key={option.id}
                    selected={isSelected}
                    disabled={isDisabled}
                    onClick={() =>
                      toggleInterest(option.id)
                    }
                  >
                    <span className="grid gap-[5px]">
                      <strong className="text-[15px] leading-[1.4] font-bold text-content">
                        {option.label}
                      </strong>

                      <span className="text-xs leading-[1.45] font-medium text-content-secondary">
                        {option.description}
                      </span>
                    </span>
                  </ChoiceButton>
                );
              },
            )}
          </section>
        </>
      );
    }

    return (
      <>
        {renderHeader({
          eyebrow: "현재 경험 정도",
          title: (
            <>
              혼자 해결해본 경험이
              <br />
              어느 정도인가요?
            </>
          ),
          description:
            "경험 정도에 맞춰 기본편과 실전편을 구분해 추천해드릴게요.",
        })}

        <section className="mt-8 grid gap-3 pb-3">
          {EXPERIENCE_OPTIONS.map(
            (option) => (
              <ChoiceButton
                key={option.id}
                selected={
                  experienceLevel === option.id
                }
                onClick={() =>
                  setExperienceLevel(option.id)
                }
              >
                {option.label}
              </ChoiceButton>
            ),
          )}
        </section>
      </>
    );
  };

  return (
    <AppLayout className="px-[22px] pt-[calc(24px+env(safe-area-inset-top))] pb-7">
      <div className="grid grid-cols-[42px_1fr_42px] items-center">
        <button
          type="button"
          className="flex size-[42px] items-center justify-center rounded-full bg-surface text-xl text-content"
          aria-label="이전 단계"
          onClick={handleBack}
        >
          ←
        </button>

        <BrandLogo
          size="small"
          className="w-[92px] justify-self-center"
        />

        <span className="size-[42px]" />
      </div>

      <ProgressBar
        current={currentStep}
        total={TOTAL_STEP_COUNT}
      />

      {renderStepContent()}

      <div className="mt-auto pt-8">
        <PrimaryButton
          disabled={!isCurrentStepComplete}
          onClick={handleNext}
        >
          {currentStep === TOTAL_STEP_COUNT
            ? "맞춤 패치 확인하기"
            : "다음"}
        </PrimaryButton>
      </div>
    </AppLayout>
  );
}

export default OnboardingPage;