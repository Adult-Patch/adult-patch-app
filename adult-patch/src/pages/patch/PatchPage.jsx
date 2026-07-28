import {
  useEffect,
  useState,
} from "react";

import {
  Navigate,
  useNavigate,
  useParams,
} from "react-router";

import ChoiceButton from "../../components/common/ChoiceButton";
import PrimaryButton from "../../components/common/PrimaryButton";
import ProgressBar from "../../components/common/ProgressBar";
import AppLayout from "../../components/layout/AppLayout";
import { getPatchById } from "../../data/patches";
import {
  getAppState,
  savePatchSelection,
} from "../../utils/appStorage";

function PatchPage() {
  const navigate = useNavigate();
  const { patchId } = useParams();

  const patch = getPatchById(patchId);

  const [
    selectedChoiceId,
    setSelectedChoiceId,
  ] = useState("");

  useEffect(() => {
    if (!patchId) {
      setSelectedChoiceId("");
      return;
    }

    const savedChoiceId =
      getAppState().patchSelections[patchId];

    setSelectedChoiceId(
      savedChoiceId ?? "",
    );
  }, [patchId]);

  if (!patch) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = () => {
    if (!selectedChoiceId) {
      return;
    }

    savePatchSelection(
      patch.id,
      selectedChoiceId,
    );

    navigate(`/patch/${patch.id}/result`, {
      state: {
        selectedChoiceId,
      },
    });
  };

  return (
    <AppLayout className="page patch-page">
      <div className="top-bar">
        <button
          type="button"
          className="icon-button"
          aria-label="이전 화면"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <span>{patch.level}</span>

        <span className="top-bar__empty" />
      </div>

      <ProgressBar
        current={patch.progress.current}
        total={patch.progress.total}
      />

      <header className="page-header patch-page__header">
        <p className="eyebrow">
          {patch.category}
        </p>

        <h1>{patch.title}</h1>
      </header>

      <section className="situation-card">
        <span className="situation-card__label">
          상황
        </span>

        <p>{patch.situation}</p>
      </section>

      <section className="patch-question">
        <h2>{patch.question}</h2>

        <div className="choice-list">
          {patch.choices.map((choice) => (
            <ChoiceButton
              key={choice.id}
              selected={
                selectedChoiceId === choice.id
              }
              onClick={() =>
                setSelectedChoiceId(choice.id)
              }
            >
              {choice.label}
            </ChoiceButton>
          ))}
        </div>
      </section>

      <div className="page-bottom-action">
        <PrimaryButton
          disabled={!selectedChoiceId}
          onClick={handleSubmit}
        >
          선택 확인하기
        </PrimaryButton>
      </div>
    </AppLayout>
  );
}

export default PatchPage;