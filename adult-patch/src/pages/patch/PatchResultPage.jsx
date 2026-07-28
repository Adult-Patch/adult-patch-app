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
    <AppLayout className="page result-page">
      <div
        className={[
          "result-symbol",
          selectedChoice.recommended
            ? "result-symbol--recommended"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      >
        {selectedChoice.recommended
          ? "✓"
          : "!"}
      </div>

      <header className="result-header">
        <p className="eyebrow">
          {selectedChoice.recommended
            ? "안전한 선택"
            : "확인이 필요한 선택"}
        </p>

        <h1>{selectedChoice.resultTitle}</h1>

        <p>{selectedChoice.feedback}</p>
      </header>

      <section className="learning-card">
        <h2>지금은 이것만 기억하세요</h2>

        <ul>
          {patch.checklist.map((item) => (
            <li key={item}>
              <span aria-hidden="true">
                ✓
              </span>

              <p>{item}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="page-bottom-action">
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