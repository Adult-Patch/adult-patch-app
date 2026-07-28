import {
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router";

import PatchListCard from "../../components/patch/PatchListCard";
import AppLayout from "../../components/layout/AppLayout";

import {
  PATCH_CATEGORIES,
} from "../../data/categories";

import { patches } from "../../data/patches";
import { getAppState } from "../../utils/appStorage";

function normalizeSearchText(value) {
  return value
    .trim()
    .toLocaleLowerCase("ko-KR")
    .replace(/\s+/g, "");
}

function ExplorePage() {
  const navigate = useNavigate();

  const [appState] = useState(() =>
    getAppState(),
  );

  const [searchQuery, setSearchQuery] =
    useState("");

  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState("all");

  const filteredPatches = useMemo(() => {
    const normalizedQuery =
      normalizeSearchText(searchQuery);

    return patches.filter((patch) => {
      const matchesCategory =
        selectedCategoryId === "all" ||
        patch.categoryId === selectedCategoryId;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText =
        normalizeSearchText(
          [
            patch.title,
            patch.description,
            patch.category,
            patch.level,
          ].join(" "),
        );

      return searchableText.includes(
        normalizedQuery,
      );
    });
  }, [
    searchQuery,
    selectedCategoryId,
  ]);

  const completedPatchIdSet = useMemo(
    () =>
      new Set(appState.completedPatchIds),
    [appState.completedPatchIds],
  );

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategoryId("all");
  };

  return (
    <AppLayout
      showBottomNavigation
      className="page explore-page"
    >
      <header className="explore-header">
        <p className="eyebrow">
          생활 능력 찾아보기
        </p>

        <h1>
          어떤 어른 능력이
          <br />
          필요하신가요?
        </h1>

        <p>
          지금 궁금하거나 미리 연습하고 싶은
          생활 상황을 찾아보세요.
        </p>
      </header>

      <section
        className="explore-search"
        aria-label="패치 검색"
      >
        <span
          className="explore-search__icon"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24">
            <circle
              cx="10.8"
              cy="10.8"
              r="6.3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="m15.5 15.5 4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <input
          type="search"
          value={searchQuery}
          placeholder="세탁, 계약, 월급처럼 검색해보세요."
          aria-label="패치 검색어"
          onChange={(event) =>
            setSearchQuery(event.target.value)
          }
        />

        {searchQuery && (
          <button
            type="button"
            className="explore-search__clear"
            aria-label="검색어 지우기"
            onClick={() => setSearchQuery("")}
          >
            ×
          </button>
        )}
      </section>

      <section
        className="category-filter"
        aria-label="생활 분야 선택"
      >
        {PATCH_CATEGORIES.map(
          (category) => {
            const isSelected =
              selectedCategoryId ===
              category.id;

            return (
              <button
                key={category.id}
                type="button"
                className={[
                  "category-filter__button",
                  isSelected
                    ? "category-filter__button--selected"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={isSelected}
                onClick={() =>
                  setSelectedCategoryId(
                    category.id,
                  )
                }
              >
                {category.label}
              </button>
            );
          },
        )}
      </section>

      <section className="explore-result">
        <div className="explore-result__heading">
          <div>
            <p className="eyebrow">
              패치 목록
            </p>

            <h2>
              {selectedCategoryId === "all"
                ? "전체 패치"
                : PATCH_CATEGORIES.find(
                    (category) =>
                      category.id ===
                      selectedCategoryId,
                  )?.label}
            </h2>
          </div>

          <span>
            {filteredPatches.length}개
          </span>
        </div>

        {filteredPatches.length > 0 ? (
          <div className="patch-list">
            {filteredPatches.map((patch) => (
              <PatchListCard
                key={patch.id}
                patch={patch}
                completed={completedPatchIdSet.has(
                  patch.id,
                )}
                onClick={() =>
                  navigate(
                    `/patch/${patch.id}`,
                  )
                }
              />
            ))}
          </div>
        ) : (
          <div className="explore-empty">
            <div
              className="explore-empty__symbol"
              aria-hidden="true"
            >
              ?
            </div>

            <h2>
              조건에 맞는 패치가 없어요.
            </h2>

            <p>
              다른 검색어나 생활 분야를
              선택해보세요.
            </p>

            <button
              type="button"
              onClick={handleResetFilters}
            >
              전체 패치 보기
            </button>
          </div>
        )}
      </section>
    </AppLayout>
  );
}

export default ExplorePage;