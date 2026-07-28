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
    <AppLayout className="px-[22px] pt-[calc(24px+env(safe-area-inset-top))] pb-7">
      <div className="grid grid-cols-[42px_1fr_42px] items-center text-center text-[13px] font-bold text-content-secondary">
        <button
          type="button"
          className="flex size-[42px] items-center justify-center rounded-full bg-surface text-xl text-content"
          aria-label="이전 화면"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <span>{patch.level}</span>

        <span className="size-[42px]" />
      </div>

      <ProgressBar
        current={patch.progress.current}
        total={patch.progress.total}
      />

      <header className="mt-[30px]">
        <p className="mb-2 text-[13px] font-bold text-brand-600">
          {patch.category}
        </p>

        <h1 className="text-[30px] leading-[1.25] font-extrabold tracking-[-0.045em] text-content">
          {patch.title}
        </h1>
      </header>

      <section className="mt-6 rounded-3xl border border-brand-100 bg-brand-50 p-[21px]">
        <span className="mb-[10px] inline-block text-xs font-extrabold text-brand-700">
          상황
        </span>

        <p className="text-[15px] leading-[1.65] tracking-[-0.025em] text-content">
          {patch.situation}
        </p>
      </section>

      <section className="mt-[30px]">
        <h2 className="text-xl leading-[1.4] font-extrabold tracking-[-0.035em] text-content">
          {patch.question}
        </h2>

        <div className="mt-8 grid gap-3">
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

      <div className="mt-auto pt-8">
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