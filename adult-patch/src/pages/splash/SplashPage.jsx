import { useState } from "react";
import { useNavigate } from "react-router";

import BrandLogo from "../../components/brand/BrandLogo";
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
    <AppLayout className="splash-page splash-page--brand">
      <section className="splash-brand-content">
        <BrandLogo
          size="large"
          showDescription
        />
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