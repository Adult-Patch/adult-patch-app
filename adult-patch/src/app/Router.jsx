import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router";

import HomePage from "../pages/home/HomePage";
import MissionPage from "../pages/mission/MissionPage";
import MyPatchPage from "../pages/my-patch/MyPatchPage";
import OnboardingPage from "../pages/onboarding/OnboardingPage";
import PatchPage from "../pages/patch/PatchPage";
import PatchResultPage from "../pages/patch/PatchResultPage";
import SplashPage from "../pages/splash/SplashPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />

        <Route
          path="/onboarding"
          element={<OnboardingPage />}
        />

        <Route path="/home" element={<HomePage />} />

        <Route
          path="/patch/:patchId"
          element={<PatchPage />}
        />

        <Route
          path="/patch/:patchId/result"
          element={<PatchResultPage />}
        />

        <Route
          path="/patch/:patchId/mission"
          element={<MissionPage />}
        />

        <Route
          path="/my-patch"
          element={<MyPatchPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;