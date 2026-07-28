import { useState } from "react";
import { useNavigate } from "react-router";

import PrimaryButton from "../../components/common/PrimaryButton";
import AppLayout from "../../components/layout/AppLayout";
import { getAppState } from "../../utils/appStorage";

function SplashPage() {
  const navigate = useNavigate();

  const [appState] = useState(() =>
    getAppState(),
  );

  const handleStart = () => {
    if (appState.onboardingCompleted) {
      navigate("/home");
      return;
    }

    navigate("/onboarding");
  };

  return (
    <AppLayout className="splash-page">
      <section className="splash-page__content">
        <div
          className="brand-symbol"
          aria-hidden="true"
        >
          <span className="brand-symbol__head" />

          <span className="brand-symbol__body">
            <span className="brand-symbol__tie" />
          </span>
        </div>

        <div className="splash-page__text">
          <p className="eyebrow">
            생활 능력 업데이트
          </p>

          <h1>어른패치</h1>

          <p>
            학교에서는 배우지 못한 현실의 생활을
            하나씩 익혀보세요.
          </p>
        </div>
      </section>

      <PrimaryButton onClick={handleStart}>
        {appState.onboardingCompleted
          ? "이어서 하기"
          : "시작하기"}
      </PrimaryButton>
    </AppLayout>
  );
}

export default SplashPage;