import { useState } from "react";
import { useNavigate } from "react-router";

import characterMain from "../../assets/images/characters/character-main.png";

import CharacterStage from "../../components/brand/CharacterStage";
import PrimaryButton from "../../components/common/PrimaryButton";
import AppLayout from "../../components/layout/AppLayout";
import PatchBadge from "../../components/patch/PatchBadge";
import { getPatchBadge } from "../../data/patchBadges";
import {
  getPatchById,
  patches,
} from "../../data/patches";
import { getAppState } from "../../utils/appStorage";

function formatCompletedDate(value) {
  if (!value) {
    return "완료 날짜 미기록";
  }

  const completedDate = new Date(value);

  if (
    Number.isNaN(
      completedDate.getTime(),
    )
  ) {
    return "완료 날짜 미기록";
  }

  return new Intl.DateTimeFormat(
    "ko-KR",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  ).format(completedDate);
}

function MyPatchPage() {
  const navigate = useNavigate();

  const [appState] = useState(() =>
    getAppState(),
  );

  const completedPatchItems =
    appState.completedPatchIds
      .map((patchId) => {
        const patch =
          getPatchById(patchId);

        if (!patch) {
          return null;
        }

        return {
          patch,
          badge:
            getPatchBadge(patchId),
          completedAt:
            appState.patchCompletedAt[
              patchId
            ],
        };
      })
      .filter(Boolean);

  const completedCount =
    completedPatchItems.length;

  const totalCount = patches.length;

  const progress =
    totalCount > 0
      ? Math.round(
          (completedCount / totalCount) *
            100,
        )
      : 0;

  return (
    <AppLayout
      showBottomNavigation
      className="px-[22px] pt-[calc(24px+env(safe-area-inset-top))] pb-9"
    >
      <header>
        <p className="mb-2 text-[13px] font-bold text-brand-600">
          나의 어른 능력
        </p>

        <h1 className="text-[30px] font-extrabold tracking-[-0.045em] text-content">
          나의 패치
        </h1>

        <p className="mt-[14px] text-[15px] leading-[1.55] tracking-[-0.025em] text-content-secondary">
          지금까지 배우고 실천한 생활 능력을
          확인할 수 있어요.
        </p>
      </header>

      {completedPatchItems.length > 0 ? (
        <>
          <section className="mt-7 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-card-strong">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-semibold text-white/70">
                  획득한 패치
                </span>

                <strong className="mt-1 block text-[30px] font-extrabold">
                  {completedCount}
                  <span className="ml-1 text-base font-semibold text-white/65">
                    / {totalCount}
                  </span>
                </strong>
              </div>

              <span className="text-sm font-bold text-white/85">
                {progress}%
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <p className="mt-4 text-[13px] leading-[1.5] text-white/75">
              새로운 생활 능력을 익힐 때마다
              나의 패치가 하나씩 채워집니다.
            </p>
          </section>

          <section className="mt-7">
            <div className="flex items-end justify-between">
              <div>
                <p className="mb-2 text-[13px] font-bold text-brand-600">
                  획득한 배지
                </p>

                <h2 className="text-[22px] font-extrabold tracking-[-0.04em] text-content">
                  업데이트된 능력
                </h2>
              </div>

              <span className="rounded-full bg-brand-50 px-3 py-2 text-xs font-bold text-brand-700">
                {completedCount}개
              </span>
            </div>

            <div className="mt-4 grid gap-3 pb-3">
              {completedPatchItems.map(
                ({
                  patch,
                  badge,
                  completedAt,
                }) => (
                  <button
                    key={patch.id}
                    type="button"
                    className="grid w-full grid-cols-[64px_minmax(0,1fr)_24px] items-center gap-4 rounded-3xl border border-line bg-white p-4 text-left shadow-card transition active:scale-[0.99]"
                    onClick={() =>
                      navigate(
                        `/patch/${patch.id}/complete`,
                      )
                    }
                  >
                    <PatchBadge
                      badge={badge}
                      size="small"
                    />

                    <span className="min-w-0">
                      <span className="text-xs font-bold text-brand-600">
                        {patch.category}
                      </span>

                      <strong className="mt-1 block truncate text-[17px] font-extrabold tracking-[-0.03em] text-content">
                        {badge.name}
                      </strong>

                      <span className="mt-[5px] block text-xs text-content-tertiary">
                        {formatCompletedDate(
                          completedAt,
                        )}
                      </span>
                    </span>

                    <span
                      className="text-xl text-content-tertiary"
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </button>
                ),
              )}
            </div>
          </section>
        </>
      ) : (
        <section className="flex flex-1 flex-col items-center justify-center pb-[50px] text-center">
          <CharacterStage
            src={characterMain}
            alt="어른패치 캐릭터"
            size="small"
            className="mb-[14px]"
          />

          <h2 className="text-xl font-extrabold tracking-[-0.035em] text-content">
            아직 획득한 패치가 없어요.
          </h2>

          <p className="mt-[10px] mb-6 max-w-[290px] text-sm leading-[1.6] text-content-secondary">
            학습과 오늘의 미션을 완료하면
            새로운 어른 능력 배지를 획득할 수
            있어요.
          </p>

          <PrimaryButton
            onClick={() =>
              navigate("/explore")
            }
          >
            첫 패치 시작하기
          </PrimaryButton>
        </section>
      )}
    </AppLayout>
  );
}

export default MyPatchPage;