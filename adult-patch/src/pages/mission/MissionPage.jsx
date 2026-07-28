import { useState } from "react";
import {
  Navigate,
  useNavigate,
  useParams,
} from "react-router";

import PrimaryButton from "../../components/common/PrimaryButton";
import AppLayout from "../../components/layout/AppLayout";
import { getPatchById } from "../../data/patches";

function MissionPage() {
  const navigate = useNavigate();
  const { patchId } = useParams();

  const patch = getPatchById(patchId);

  const [completed, setCompleted] = useState(false);

  if (!patch) {
    return <Navigate to="/home" replace />;
  }

  const handleComplete = () => {
    if (!completed) {
      return;
    }

    navigate("/my-patch", {
      state: {
        completedPatchId: patch.id,
      },
    });
  };

  return (
    <AppLayout className="page mission-page">
      <div className="mission-page__visual">
        <span className="mission-page__visual-head" />

        <span className="mission-page__visual-body">
          <span className="mission-page__visual-tie" />
        </span>
      </div>

      <header className="mission-page__header">
        <p className="eyebrow">오늘의 어른미션</p>

        <h1>배운 내용을 직접 해볼까요?</h1>

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
          setCompleted((previous) => !previous)
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
          패치 완료하기
        </PrimaryButton>
      </div>
    </AppLayout>
  );
}

export default MissionPage;