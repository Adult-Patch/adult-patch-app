import { useNavigate } from "react-router";

import PrimaryButton from "../../components/common/PrimaryButton";
import AppLayout from "../../components/layout/AppLayout";
import { patches } from "../../data/patches";

function HomePage() {
  const navigate = useNavigate();

  const recommendedPatch = patches[0];

  return (
    <AppLayout
      showBottomNavigation
      className="page home-page"
    >
      <header className="home-header">
        <div>
          <p className="eyebrow">
            오늘의 어른패치
          </p>

          <h1>
            오늘은 어떤 능력을
            <br />
            업데이트할까요?
          </h1>
        </div>

        <div
          className="home-header__profile"
          aria-label="프로필"
        >
          어
        </div>
      </header>

      <section className="home-status">
        <div>
          <span>이번 주 업데이트</span>
          <strong>0개</strong>
        </div>

        <div>
          <span>완료한 미션</span>
          <strong>0개</strong>
        </div>
      </section>

      <section className="recommended-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">추천 패치</p>
            <h2>첫 자취 기본편</h2>
          </div>

          <span className="category-badge">
            {recommendedPatch.category}
          </span>
        </div>

        <article className="patch-card">
          <div className="patch-card__visual">
            <span className="patch-card__visual-circle" />

            <span className="patch-card__visual-shirt">
              <span className="patch-card__visual-tie" />
            </span>
          </div>

          <div className="patch-card__content">
            <span className="patch-card__meta">
              약 {recommendedPatch.estimatedMinutes}분
            </span>

            <h3>{recommendedPatch.title}</h3>

            <p>{recommendedPatch.description}</p>

            <PrimaryButton
              onClick={() =>
                navigate(
                  `/patch/${recommendedPatch.id}`,
                )
              }
            >
              패치 시작하기
            </PrimaryButton>
          </div>
        </article>
      </section>
    </AppLayout>
  );
}

export default HomePage;