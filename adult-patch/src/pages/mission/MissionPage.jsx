import { useState } from "react";

import {
  Navigate,
  useNavigate,
  useParams,
} from "react-router";

import characterMain from "../../assets/images/characters/character-main.png";

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

  const [appState] = useState(() =>
    getAppState(),
  );

  const [completed, setCompleted] =
    useState(() => {
      if (!patchId) {
        return false;
      }

      return appState.completedMissionIds.includes(
        patchId,
      );
    });

  if (!patch) {
    return <Navigate to="/home" replace />;
  }

  const reviewCompleted =
    appState.reviewCompletedPatchIds.includes(
      patch.id,
    );

  if (!reviewCompleted) {
    return (
      <Navigate
        to={`/patch/${patch.id}?step=3`}
        replace
      />
    );
  }

  const isAlreadyCompleted =
    appState.completedPatchIds.includes(
      patch.id,
    );

  const handleComplete = () => {
    if (!completed) {
      return;
    }

    completePatch(patch.id);

    navigate(
      `/patch/${patch.id}/complete`,
      {
        replace: true,
      },
    );
  };

  return (
    <AppLayout className="px-[22px] pt-[calc(54px+env(safe-area-inset-top))] pb-7">
      <CharacterStage
        src={characterMain}
        alt="어른패치 미션 캐릭터"
        size="medium"
        className="mt-2"
      />

      <header className="mt-7 text-center">
        <p className="mb-2 text-[13px] font-bold text-brand-600">
          오늘의 어른미션
        </p>

        <h1 className="text-[27px] leading-[1.35] font-extrabold tracking-[-0.045em] text-content">
          배운 내용을 직접 해볼까요?
        </h1>

        <p className="mt-3 text-sm leading-[1.55] text-content-secondary">
          작은 행동 하나가 새로운 생활 능력이
          됩니다.
        </p>
      </header>

      <section className="mt-8 rounded-3xl border border-brand-100 bg-brand-50 p-5">
        <span className="text-xs font-bold text-brand-600">
          이번 패치에서 배운 내용
        </span>

        <h2 className="mt-[7px] text-[17px] leading-[1.45] font-extrabold tracking-[-0.03em] text-content">
          {patch.title}
        </h2>
      </section>

      <button
        type="button"
        className={[
          "mt-4 flex w-full items-start gap-[14px] rounded-3xl border-[1.5px] p-5 text-left",
          "transition active:scale-[0.99]",
          completed
            ? "border-brand-500 bg-brand-50"
            : "border-line bg-white",
        ].join(" ")}
        aria-pressed={completed}
        onClick={() =>
          setCompleted(
            (previous) => !previous,
          )
        }
      >
        <span
          className={[
            "flex size-[26px] flex-none items-center justify-center rounded-lg border-2",
            "text-[13px] font-extrabold text-white",
            completed
              ? "border-brand-500 bg-brand-500"
              : "border-[#c6ceda] bg-white",
          ].join(" ")}
        >
          {completed ? "✓" : ""}
        </span>

        <span className="grid gap-[6px]">
          <strong className="text-xs font-bold text-brand-700">
            실천 미션
          </strong>

          <span className="text-[15px] leading-[1.55] font-semibold tracking-[-0.025em] text-content">
            {patch.mission}
          </span>
        </span>
      </button>

      <div className="mt-auto pt-8">
        <PrimaryButton
          disabled={!completed}
          onClick={handleComplete}
        >
          {isAlreadyCompleted
            ? "완료 패치 확인하기"
            : "패치 완료하기"}
        </PrimaryButton>
      </div>
    </AppLayout>
  );
}

export default MissionPage;