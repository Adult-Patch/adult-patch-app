import {
  Navigate,
  useNavigate,
  useParams,
} from "react-router";

import characterMain from "../../assets/images/characters/character-main.png";

import CharacterStage from "../../components/brand/CharacterStage";
import PrimaryButton from "../../components/common/PrimaryButton";
import AppLayout from "../../components/layout/AppLayout";
import PatchBadge from "../../components/patch/PatchBadge";
import { getPatchBadge } from "../../data/patchBadges";
import { getPatchById } from "../../data/patches";
import { useAppState } from "../../hooks/useAppState";

function formatCompletedDate(value) {
  if (!value) {
    return "완료 날짜가 기록되지 않았어요.";
  }

  const completedDate = new Date(value);

  if (
    Number.isNaN(
      completedDate.getTime(),
    )
  ) {
    return "완료 날짜를 확인할 수 없어요.";
  }

  return new Intl.DateTimeFormat(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  ).format(completedDate);
}

function PatchCompletePage() {
  const navigate = useNavigate();
  const { patchId } = useParams();

  const { appState } = useAppState();

  const patch = getPatchById(patchId);
  const badge = getPatchBadge(patchId);

  if (!patch) {
    return (
      <Navigate
        to="/explore"
        replace
      />
    );
  }

  const isCompleted =
    appState.completedPatchIds.includes(
      patch.id,
    );

  if (!isCompleted) {
    return (
      <Navigate
        to={`/patch/${patch.id}/mission`}
        replace
      />
    );
  }

  const completedDate =
    formatCompletedDate(
      appState.patchCompletedAt[
        patch.id
      ],
    );

  return (
    <AppLayout className="px-[22px] pt-[calc(34px+env(safe-area-inset-top))] pb-7">
      <header className="text-center">
        <p className="mb-2 text-[13px] font-bold text-brand-600">
          패치 업데이트 완료
        </p>

        <h1 className="text-[30px] leading-[1.3] font-extrabold tracking-[-0.05em] text-content">
          새로운 어른 능력이
          <br />
          추가됐어요.
        </h1>

        <p className="mt-[14px] text-[15px] leading-[1.6] tracking-[-0.025em] text-content-secondary">
          학습과 미션을 모두 완료해
          새로운 패치를 획득했습니다.
        </p>
      </header>

      <CharacterStage
        src={characterMain}
        alt="패치를 획득한 어른패치 캐릭터"
        size="small"
        className="mt-6"
      />

      <section className="relative mt-4 overflow-hidden rounded-[32px] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-brand-100/60 px-5 py-7 text-center shadow-card-strong">
        <div className="relative z-10 flex flex-col items-center">
          <PatchBadge
            badge={badge}
            size="large"
          />

          <span className="mt-6 text-xs font-bold text-brand-600">
            {patch.category}
          </span>

          <h2 className="mt-2 text-[24px] font-extrabold tracking-[-0.045em] text-content">
            {badge.name}
          </h2>

          <p className="mt-[10px] max-w-[290px] text-sm leading-[1.6] tracking-[-0.02em] text-content-secondary">
            {badge.description}
          </p>
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-surface p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-content-tertiary">
              완료한 학습
            </span>

            <h2 className="mt-[7px] text-[16px] leading-[1.45] font-extrabold tracking-[-0.03em] text-content">
              {patch.title}
            </h2>
          </div>

          <span className="flex size-9 flex-none items-center justify-center rounded-xl bg-positive-light font-extrabold text-positive">
            ✓
          </span>
        </div>

        <div className="mt-4 border-t border-line pt-4">
          <span className="text-xs font-semibold text-content-secondary">
            {completedDate}
          </span>
        </div>
      </section>

      <div className="mt-auto grid gap-3 pt-8">
        <PrimaryButton
          onClick={() =>
            navigate("/my-patch")
          }
        >
          나의 패치 보기
        </PrimaryButton>

        <PrimaryButton
          variant="secondary"
          onClick={() =>
            navigate("/home")
          }
        >
          홈으로 돌아가기
        </PrimaryButton>
      </div>
    </AppLayout>
  );
}

export default PatchCompletePage;