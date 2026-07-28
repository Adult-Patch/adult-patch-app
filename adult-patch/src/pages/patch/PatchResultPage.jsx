import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";

import PrimaryButton from "../../components/common/PrimaryButton";
import AppLayout from "../../components/layout/AppLayout";
import { getPatchById } from "../../data/patches";
import { getAppState } from "../../utils/appStorage";

function PatchResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { patchId } = useParams();

  const patch = getPatchById(patchId);

  const savedChoiceId = patchId
    ? getAppState().patchSelections[patchId]
    : "";

  const selectedChoiceId =
    location.state?.selectedChoiceId ??
    savedChoiceId;

  if (!patch) {
    return <Navigate to="/home" replace />;
  }

  if (!selectedChoiceId) {
    return (
      <Navigate
        to={`/patch/${patch.id}`}
        replace
      />
    );
  }

  const selectedChoice = patch.choices.find(
    (choice) =>
      choice.id === selectedChoiceId,
  );

  if (!selectedChoice) {
    return (
      <Navigate
        to={`/patch/${patch.id}`}
        replace
      />
    );
  }

  return (
    <AppLayout className="px-[22px] pt-[calc(62px+env(safe-area-inset-top))] pb-7">
      <div
        className={[
          "mx-auto flex size-[74px] items-center justify-center rounded-full",
          "text-[31px] font-extrabold",
          selectedChoice.recommended
            ? "bg-positive-light text-positive"
            : "bg-caution-light text-caution",
        ].join(" ")}
        aria-hidden="true"
      >
        {selectedChoice.recommended
          ? "✓"
          : "!"}
      </div>

      <header className="mt-[26px] text-center">
        <p className="mb-2 text-[13px] font-bold text-brand-600">
          {selectedChoice.recommended
            ? "안전한 선택"
            : "확인이 필요한 선택"}
        </p>

        <h1 className="text-[27px] leading-[1.35] font-extrabold tracking-[-0.045em] text-content">
          {selectedChoice.resultTitle}
        </h1>

        <p className="mt-[15px] text-[15px] leading-[1.65] tracking-[-0.025em] text-content-secondary">
          {selectedChoice.feedback}
        </p>
      </header>

      <section className="mt-[30px] rounded-3xl bg-surface p-[22px]">
        <h2 className="text-[17px] font-extrabold tracking-[-0.03em] text-content">
          지금은 이것만 기억하세요
        </h2>

        <ul className="mt-[18px] grid gap-[14px]">
          {patch.checklist.map((item) => (
            <li
              key={item}
              className="flex items-start gap-[10px]"
            >
              <span
                className="flex size-5 flex-none items-center justify-center rounded-full bg-brand-500 text-[11px] font-extrabold text-white"
                aria-hidden="true"
              >
                ✓
              </span>

              <p className="text-sm leading-[1.5] text-content">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-auto pt-8">
        <PrimaryButton
          onClick={() =>
            navigate(
              `/patch/${patch.id}/mission`,
            )
          }
        >
          오늘의 미션 확인하기
        </PrimaryButton>
      </div>
    </AppLayout>
  );
}

export default PatchResultPage;