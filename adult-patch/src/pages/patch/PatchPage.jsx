import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";

import ChoiceButton from "../../components/common/ChoiceButton";
import PrimaryButton from "../../components/common/PrimaryButton";
import ProgressBar from "../../components/common/ProgressBar";
import AppLayout from "../../components/layout/AppLayout";
import { getPatchById } from "../../data/patches";
import { getPatchReviewQuestion } from "../../data/patchReviewQuestions";
import { useAppState } from "../../hooks/useAppState";

const TOTAL_STEP_COUNT = 3;

function getSafeStep(value) {
  const numericStep = Number(value);

  if (
    !Number.isInteger(numericStep) ||
    numericStep < 1 ||
    numericStep > TOTAL_STEP_COUNT
  ) {
    return 1;
  }

  return numericStep;
}

function PatchPage() {
  const navigate = useNavigate();
  const { patchId } = useParams();

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const {
    appState,
    saving,
    savePatchSelection,
    savePatchReviewSelection,
    savePatchProgress,
    completePatchReview,
  } = useAppState();

  const patch = getPatchById(patchId);

  const [
    selectedChoiceId,
    setSelectedChoiceId,
  ] = useState(
    () =>
      appState.patchSelections[
        patchId
      ] ?? "",
  );

  const [
    selectedReviewChoiceId,
    setSelectedReviewChoiceId,
  ] = useState(
    () =>
      appState.patchReviewSelections[
        patchId
      ] ?? "",
  );

  const [
    reviewSubmitted,
    setReviewSubmitted,
  ] = useState(() =>
    appState.reviewCompletedPatchIds.includes(
      patchId,
    ),
  );

  const requestedStep =
    searchParams.get("step");

  const savedStep =
    appState.patchProgress[patchId] ?? 1;

  const currentStep = requestedStep
    ? getSafeStep(requestedStep)
    : getSafeStep(savedStep);

  const reviewQuestion =
    getPatchReviewQuestion(patchId);

  const selectedChoice = useMemo(
    () =>
      patch?.choices.find(
        (choice) =>
          choice.id ===
          selectedChoiceId,
      ) ?? null,
    [patch, selectedChoiceId],
  );

  const selectedReviewChoice = useMemo(
    () =>
      reviewQuestion?.choices.find(
        (choice) =>
          choice.id ===
          selectedReviewChoiceId,
      ) ?? null,
    [
      reviewQuestion,
      selectedReviewChoiceId,
    ],
  );

  useEffect(() => {
    if (!requestedStep) {
      setSearchParams(
        {
          step: String(savedStep),
        },
        {
          replace: true,
        },
      );
    }
  }, [
    requestedStep,
    savedStep,
    setSearchParams,
  ]);

  useEffect(() => {
    const scrollContainer =
      document.querySelector("main");

    scrollContainer?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  if (!patch) {
    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

  if (
    currentStep >= 2 &&
    !selectedChoice
  ) {
    return (
      <Navigate
        to={`/patch/${patch.id}?step=1`}
        replace
      />
    );
  }

  if (!reviewQuestion) {
    return (
      <Navigate
        to="/explore"
        replace
      />
    );
  }

  const moveToStep = async (
    nextStep,
  ) => {
    const safeStep =
      getSafeStep(nextStep);

    await savePatchProgress(
      patch.id,
      safeStep,
    );

    setSearchParams({
      step: String(safeStep),
    });
  };

  const handleBack = async () => {
    if (currentStep === 1) {
      navigate(-1);
      return;
    }

    await moveToStep(
      currentStep - 1,
    );
  };

  const handleSituationSubmit =
    async () => {
      if (
        !selectedChoiceId ||
        saving
      ) {
        return;
      }

      await savePatchSelection(
        patch.id,
        selectedChoiceId,
      );

      await moveToStep(2);
    };

  const handleLearningNext =
    async () => {
      if (saving) {
        return;
      }

      await moveToStep(3);
    };

  const handleReviewSubmit =
    async () => {
      if (
        !selectedReviewChoice ||
        saving
      ) {
        return;
      }

      await savePatchReviewSelection(
        patch.id,
        selectedReviewChoice.id,
      );

      if (
        selectedReviewChoice.correct
      ) {
        await completePatchReview(
          patch.id,
        );
      }

      setReviewSubmitted(true);
    };

  const handleReviewRetry = () => {
    setSelectedReviewChoiceId("");
    setReviewSubmitted(false);
  };

  const renderSituationStep = () => (
    <>
      <header className="mt-[30px]">
        <p className="mb-2 text-[13px] font-bold text-brand-600">
          1단계 · 상황 판단
        </p>

        <h1 className="text-[30px] leading-[1.25] font-extrabold tracking-[-0.045em] text-content">
          {patch.title}
        </h1>

        <p className="mt-[14px] text-[15px] leading-[1.55] tracking-[-0.025em] text-content-secondary">
          실제 생활에서 마주칠 수 있는
          상황을 보고 먼저 판단해보세요.
        </p>
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
          {patch.choices.map(
            (choice) => (
              <ChoiceButton
                key={choice.id}
                selected={
                  selectedChoiceId ===
                  choice.id
                }
                disabled={saving}
                onClick={() =>
                  setSelectedChoiceId(
                    choice.id,
                  )
                }
              >
                {choice.label}
              </ChoiceButton>
            ),
          )}
        </div>
      </section>

      <div className="mt-auto pt-8">
        <PrimaryButton
          disabled={
            !selectedChoiceId ||
            saving
          }
          onClick={
            handleSituationSubmit
          }
        >
          {saving
            ? "저장 중..."
            : "선택 결과 확인하기"}
        </PrimaryButton>
      </div>
    </>
  );

  const renderLearningStep = () => (
    <>
      <header className="mt-[30px]">
        <p className="mb-2 text-[13px] font-bold text-brand-600">
          2단계 · 핵심 학습
        </p>

        <h1 className="text-[30px] leading-[1.25] font-extrabold tracking-[-0.045em] text-content">
          선택한 행동을
          <br />
          함께 확인해볼게요.
        </h1>
      </header>

      <section
        className={[
          "mt-6 rounded-3xl border p-[22px]",
          selectedChoice.recommended
            ? "border-positive/20 bg-positive-light"
            : "border-caution/20 bg-caution-light",
        ].join(" ")}
      >
        <div className="flex items-start gap-[14px]">
          <span
            className={[
              "flex size-10 flex-none items-center justify-center rounded-[14px] text-lg font-extrabold text-white",
              selectedChoice.recommended
                ? "bg-positive"
                : "bg-caution",
            ].join(" ")}
          >
            {selectedChoice.recommended
              ? "✓"
              : "!"}
          </span>

          <div>
            <span
              className={[
                "text-xs font-bold",
                selectedChoice.recommended
                  ? "text-positive"
                  : "text-caution",
              ].join(" ")}
            >
              {selectedChoice.recommended
                ? "안전한 선택"
                : "확인이 필요한 선택"}
            </span>

            <h2 className="mt-[5px] text-lg leading-[1.4] font-extrabold tracking-[-0.035em] text-content">
              {
                selectedChoice.resultTitle
              }
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-[1.65] tracking-[-0.025em] text-content-secondary">
          {selectedChoice.feedback}
        </p>
      </section>

      <section className="mt-[22px] rounded-3xl bg-surface p-[22px]">
        <p className="mb-2 text-xs font-bold text-brand-600">
          이번 패치의 핵심
        </p>

        <h2 className="text-[18px] leading-[1.4] font-extrabold tracking-[-0.035em] text-content">
          지금은 이것만 기억하세요
        </h2>

        <ul className="mt-[18px] grid gap-[14px]">
          {patch.checklist.map(
            (item, index) => (
              <li
                key={item}
                className="flex items-start gap-[11px]"
              >
                <span className="flex size-6 flex-none items-center justify-center rounded-[9px] bg-brand-500 text-xs font-extrabold text-white">
                  {index + 1}
                </span>

                <p className="pt-0.5 text-sm leading-[1.55] text-content">
                  {item}
                </p>
              </li>
            ),
          )}
        </ul>
      </section>

      <div className="mt-auto pt-8">
        <PrimaryButton
          disabled={saving}
          onClick={handleLearningNext}
        >
          {saving
            ? "저장 중..."
            : "최종 확인 문제 풀기"}
        </PrimaryButton>
      </div>
    </>
  );

  const renderReviewStep = () => {
    const isCorrect =
      reviewSubmitted &&
      selectedReviewChoice?.correct;

    const isIncorrect =
      reviewSubmitted &&
      selectedReviewChoice &&
      !selectedReviewChoice.correct;

    return (
      <>
        <header className="mt-[30px]">
          <p className="mb-2 text-[13px] font-bold text-brand-600">
            3단계 · 최종 확인
          </p>

          <h1 className="text-[30px] leading-[1.25] font-extrabold tracking-[-0.045em] text-content">
            마지막으로
            <br />
            한 번 더 확인해볼까요?
          </h1>

          <p className="mt-[14px] text-[15px] leading-[1.55] tracking-[-0.025em] text-content-secondary">
            방금 배운 내용을 실제 상황에서
            적용할 수 있는지 확인합니다.
          </p>
        </header>

        <section className="mt-[30px]">
          <h2 className="text-xl leading-[1.4] font-extrabold tracking-[-0.035em] text-content">
            {reviewQuestion.question}
          </h2>

          <div className="mt-8 grid gap-3">
            {reviewQuestion.choices.map(
              (choice) => (
                <ChoiceButton
                  key={choice.id}
                  selected={
                    selectedReviewChoiceId ===
                    choice.id
                  }
                  disabled={
                    reviewSubmitted ||
                    saving
                  }
                  onClick={() =>
                    setSelectedReviewChoiceId(
                      choice.id,
                    )
                  }
                >
                  {choice.label}
                </ChoiceButton>
              ),
            )}
          </div>
        </section>

        {reviewSubmitted &&
          selectedReviewChoice && (
            <section
              className={[
                "mt-5 rounded-3xl border p-5",
                isCorrect
                  ? "border-positive/20 bg-positive-light"
                  : "border-caution/20 bg-caution-light",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <span
                  className={[
                    "flex size-9 items-center justify-center rounded-xl text-base font-extrabold text-white",
                    isCorrect
                      ? "bg-positive"
                      : "bg-caution",
                  ].join(" ")}
                >
                  {isCorrect ? "✓" : "!"}
                </span>

                <h2 className="text-[17px] font-extrabold text-content">
                  {isCorrect
                    ? "정확하게 이해했어요."
                    : "한 번 더 확인해보세요."}
                </h2>
              </div>

              <p className="mt-[14px] text-sm leading-[1.6] text-content-secondary">
                {
                  selectedReviewChoice.feedback
                }
              </p>
            </section>
          )}

        <div className="mt-auto pt-8">
          {!reviewSubmitted && (
            <PrimaryButton
              disabled={
                !selectedReviewChoiceId ||
                saving
              }
              onClick={handleReviewSubmit}
            >
              {saving
                ? "저장 중..."
                : "정답 확인하기"}
            </PrimaryButton>
          )}

          {isIncorrect && (
            <PrimaryButton
              onClick={handleReviewRetry}
            >
              다시 선택하기
            </PrimaryButton>
          )}

          {isCorrect && (
            <PrimaryButton
              onClick={() =>
                navigate(
                  `/patch/${patch.id}/mission`,
                )
              }
            >
              오늘의 미션 확인하기
            </PrimaryButton>
          )}
        </div>
      </>
    );
  };

  return (
    <AppLayout className="px-[22px] pt-[calc(24px+env(safe-area-inset-top))] pb-7">
      <div className="grid grid-cols-[42px_1fr_42px] items-center text-center text-[13px] font-bold text-content-secondary">
        <button
          type="button"
          className="flex size-[42px] items-center justify-center rounded-full bg-surface text-xl text-content"
          aria-label="이전 단계"
          disabled={saving}
          onClick={handleBack}
        >
          ←
        </button>

        <span>{patch.level}</span>

        <span className="size-[42px]" />
      </div>

      <ProgressBar
        current={currentStep}
        total={TOTAL_STEP_COUNT}
      />

      {currentStep === 1 &&
        renderSituationStep()}

      {currentStep === 2 &&
        renderLearningStep()}

      {currentStep === 3 &&
        renderReviewStep()}
    </AppLayout>
  );
}

export default PatchPage;