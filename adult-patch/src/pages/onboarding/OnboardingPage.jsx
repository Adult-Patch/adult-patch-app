import { useState } from "react";
import { useNavigate } from "react-router";

import ChoiceButton from "../../components/common/ChoiceButton";
import PrimaryButton from "../../components/common/PrimaryButton";
import AppLayout from "../../components/layout/AppLayout";
import {
  getAppState,
  saveOnboarding,
} from "../../utils/appStorage";

const situationOptions = [
  {
    id: "living-alone",
    label: "처음 자취를 시작했어요.",
  },
  {
    id: "first-job",
    label:
      "취업이나 첫 직장을 준비하고 있어요.",
  },
  {
    id: "general-life",
    label:
      "생활 전반을 하나씩 배우고 싶어요.",
  },
];

function OnboardingPage() {
  const navigate = useNavigate();

  const [selectedSituation, setSelectedSituation] =
    useState(
      () => getAppState().selectedSituation,
    );

  const handleNext = () => {
    if (!selectedSituation) {
      return;
    }

    saveOnboarding(selectedSituation);
    navigate("/home");
  };

  return (
    <AppLayout className="page">
      <header className="page-header">
        <p className="eyebrow">
          나에게 필요한 패치
        </p>

        <h1>
          지금 어떤 생활을
          <br />
          준비하고 있나요?
        </h1>

        <p>
          현재 상황에 맞는 생활 콘텐츠를
          먼저 추천해드릴게요.
        </p>
      </header>

      <section className="choice-list">
        {situationOptions.map((option) => (
          <ChoiceButton
            key={option.id}
            selected={
              selectedSituation === option.id
            }
            onClick={() =>
              setSelectedSituation(option.id)
            }
          >
            {option.label}
          </ChoiceButton>
        ))}
      </section>

      <div className="page-bottom-action">
        <PrimaryButton
          disabled={!selectedSituation}
          onClick={handleNext}
        >
          추천 패치 확인하기
        </PrimaryButton>
      </div>
    </AppLayout>
  );
}

export default OnboardingPage;