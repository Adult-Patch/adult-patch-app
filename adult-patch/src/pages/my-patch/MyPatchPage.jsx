import { useState } from "react";
import { useNavigate } from "react-router";

import characterMain from "../../assets/images/characters/character-main.png";

import CharacterStage from "../../components/brand/CharacterStage";
import PrimaryButton from "../../components/common/PrimaryButton";
import AppLayout from "../../components/layout/AppLayout";
import { getPatchById } from "../../data/patches";
import { getAppState } from "../../utils/appStorage";

function MyPatchPage() {
  const navigate = useNavigate();

  const [appState] = useState(() =>
    getAppState(),
  );

  const completedPatches =
    appState.completedPatchIds
      .map((patchId) =>
        getPatchById(patchId),
      )
      .filter(Boolean);

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

      {completedPatches.length > 0 ? (
        <section className="mt-[30px] grid gap-3 pb-3">
          {completedPatches.map((patch) => (
            <article
              key={patch.id}
              className="flex items-start gap-4 rounded-3xl border border-brand-100 bg-brand-50 p-[21px]"
            >
              <div className="flex size-[42px] flex-none items-center justify-center rounded-[14px] bg-brand-500 font-extrabold text-white">
                ✓
              </div>

              <div>
                <span className="text-xs font-bold text-brand-600">
                  {patch.category}
                </span>

                <h2 className="mt-[6px] text-[17px] leading-[1.45] font-extrabold tracking-[-0.03em] text-content">
                  {patch.title}
                </h2>

                <p className="mt-[7px] text-[13px] leading-[1.5] text-content-secondary">
                  새로운 어른 능력이
                  업데이트됐어요.
                </p>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="flex flex-1 flex-col items-center justify-center pb-[50px] text-center">
          <CharacterStage
            src={characterMain}
            alt="어른패치 캐릭터"
            size="small"
            className="mb-[14px]"
          />

          <h2 className="text-xl font-extrabold tracking-[-0.035em] text-content">
            아직 완료한 패치가 없어요.
          </h2>

          <p className="mt-[10px] mb-6 max-w-[290px] text-sm leading-[1.6] text-content-secondary">
            오늘의 패치를 완료하면 여기에
            새로운 생활 능력이 기록됩니다.
          </p>

          <PrimaryButton
            onClick={() => navigate("/home")}
          >
            첫 패치 시작하기
          </PrimaryButton>
        </section>
      )}
    </AppLayout>
  );
}

export default MyPatchPage;