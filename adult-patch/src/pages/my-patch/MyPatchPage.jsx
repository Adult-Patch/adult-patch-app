import { useLocation, useNavigate } from "react-router";

import PrimaryButton from "../../components/common/PrimaryButton";
import AppLayout from "../../components/layout/AppLayout";
import { getPatchById } from "../../data/patches";

function MyPatchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const completedPatchId =
    location.state?.completedPatchId;

  const completedPatch = completedPatchId
    ? getPatchById(completedPatchId)
    : null;

  return (
    <AppLayout
      showBottomNavigation
      className="page my-patch-page"
    >
      <header className="page-header">
        <p className="eyebrow">나의 어른 능력</p>

        <h1>나의 패치</h1>

        <p>
          지금까지 배우고 실천한 생활 능력을
          확인할 수 있어요.
        </p>
      </header>

      {completedPatch ? (
        <section className="completed-patch-card">
          <div className="completed-patch-card__symbol">
            ✓
          </div>

          <div>
            <span>
              {completedPatch.category}
            </span>

            <h2>{completedPatch.title}</h2>

            <p>
              새로운 어른 능력이 업데이트됐어요.
            </p>
          </div>
        </section>
      ) : (
        <section className="empty-state">
          <div className="empty-state__symbol">
            <span />
          </div>

          <h2>아직 완료한 패치가 없어요.</h2>

          <p>
            오늘의 패치를 완료하면 여기에 새로운
            생활 능력이 기록됩니다.
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