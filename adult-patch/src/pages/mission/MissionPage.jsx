import { useState } from "react";
import {
  Navigate,
  useNavigate,
  useParams,
} from "react-router";

import CharacterStage from "../../components/brand/CharacterStage";
import PrimaryButton from "../../components/common/PrimaryButton";
import AppLayout from "../../components/layout/AppLayout";
import { getPatchById } from "../../data/patches";
import {
  completePatch,
  getAppState,
} from "../../utils/appStorage";

function MissionPage() {
  const navigate = useNavigate();
  const { patchId } = useParams();

  const patch = getPatchById(patchId);

  const [completed, setCompleted] =
    useState(() => {
      if (!patchId) {
        return false;
      }

      return getAppState()
        .completedMissionIds.includes(
          patchId,
        );
    });

  if (!patch) {
    return <Navigate to="/home" replace />;
  }

  const isAlreadyCompleted =
    getAppState().completedPatchIds.includes(
      patch.id,
    );

  const handleComplete = () => {
    if (!completed) {
      return;
    }

    completePatch(patch.id);
    navigate("/my-patch");
  };

  return (
    <AppLayout className="page mission-page">
      <CharacterStage
        size="medium"
        className="mission-page__character"
      />

      <header className="mission-page__header">
        <p className="eyebrow">
          오늘의 어른미션
        </p>

        <h1>
          배운 내용을 직접 해볼까요?
        </h1>

        <p>
          작은 행동 하나가 새로운 생활 능력이
          됩니다.
        </p>
      </header>

      <button
        type="button"
        className={[
          "mission-check",
          completed
            ? "mission-check--completed"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-pressed={completed}
        onClick={() =>
          setCompleted(
            (previous) => !previous,
          )
        }
      >
        <span className="mission-check__box">
          {completed ? "✓" : ""}
        </span>

        <span className="mission-check__content">
          <strong>실천 미션</strong>

          <span>{patch.mission}</span>
        </span>
      </button>

      <div className="page-bottom-action">
        <PrimaryButton
          disabled={!completed}
          onClick={handleComplete}
        >
          {isAlreadyCompleted
            ? "완료 상태 저장하기"
            : "패치 완료하기"}
        </PrimaryButton>
      </div>
    </AppLayout>
  );
}

export default MissionPage;