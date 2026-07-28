import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router";

import AppLayout from "../../components/layout/AppLayout";
import PatchListCard from "../../components/patch/PatchListCard";
import { PATCH_CATEGORIES } from "../../data/categories";
import { patches } from "../../data/patches";
import { getAppState } from "../../utils/appStorage";

function normalizeSearchText(value) {
  return value
    .trim()
    .toLocaleLowerCase("ko-KR")
    .replace(/\s+/g, "");
}

function CategoryArrowIcon({ direction }) {
  const path =
    direction === "left"
      ? "m14.5 6-6 6 6 6"
      : "m9.5 6 6 6-6 6";

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5"
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExplorePage() {
  const navigate = useNavigate();
  const categorySliderRef = useRef(null);

  const [appState] = useState(() =>
    getAppState(),
  );

  const [searchQuery, setSearchQuery] =
    useState("");

  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState("all");

  const [
    canScrollCategoryLeft,
    setCanScrollCategoryLeft,
  ] = useState(false);

  const [
    canScrollCategoryRight,
    setCanScrollCategoryRight,
  ] = useState(false);

  const updateCategoryScrollState =
    useCallback(() => {
      const slider =
        categorySliderRef.current;

      if (!slider) {
        return;
      }

      const maximumScrollLeft =
        slider.scrollWidth -
        slider.clientWidth;

      setCanScrollCategoryLeft(
        slider.scrollLeft > 2,
      );

      setCanScrollCategoryRight(
        slider.scrollLeft <
          maximumScrollLeft - 2,
      );
    }, []);

  useEffect(() => {
    const slider =
      categorySliderRef.current;

    if (!slider) {
      return undefined;
    }

    const animationFrameId =
      window.requestAnimationFrame(
        updateCategoryScrollState,
      );

    window.addEventListener(
      "resize",
      updateCategoryScrollState,
    );

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(
            updateCategoryScrollState,
          )
        : null;

    resizeObserver?.observe(slider);

    return () => {
      window.cancelAnimationFrame(
        animationFrameId,
      );

      window.removeEventListener(
        "resize",
        updateCategoryScrollState,
      );

      resizeObserver?.disconnect();
    };
  }, [updateCategoryScrollState]);

  const filteredPatches = useMemo(() => {
    const normalizedQuery =
      normalizeSearchText(searchQuery);

    return patches.filter((patch) => {
      const matchesCategory =
        selectedCategoryId === "all" ||
        patch.categoryId ===
          selectedCategoryId;

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

  const selectedCategory =
    PATCH_CATEGORIES.find(
      (category) =>
        category.id === selectedCategoryId,
    );

  const scrollCategories = (direction) => {
    const slider =
      categorySliderRef.current;

    if (!slider) {
      return;
    }

    slider.scrollBy({
      left:
        direction === "left"
          ? -slider.clientWidth * 0.72
          : slider.clientWidth * 0.72,
      behavior: "smooth",
    });
  };

  const handleCategorySelect = (
    categoryId,
    categoryButton,
  ) => {
    setSelectedCategoryId(categoryId);

    categoryButton.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategoryId("all");

    categorySliderRef.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <AppLayout
      showBottomNavigation
      className="px-[22px] pt-[calc(24px+env(safe-area-inset-top))] pb-9"
    >
      <header>
        <p className="mb-2 text-[13px] font-bold text-brand-600">
          생활 능력 찾아보기
        </p>

        <h1 className="text-[29px] leading-[1.28] font-extrabold tracking-[-0.05em] text-content">
          어떤 어른 능력이
          <br />
          필요하신가요?
        </h1>

        <p className="mt-[13px] text-sm leading-[1.6] tracking-[-0.025em] text-content-secondary">
          지금 궁금하거나 미리 연습하고 싶은
          생활 상황을 찾아보세요.
        </p>
      </header>

      <section
        className="mt-[27px] flex min-h-[54px] w-full items-center rounded-[17px] border-[1.5px] border-transparent bg-surface px-[15px] transition focus-within:border-brand-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgb(70_121_239/10%)]"
        aria-label="패치 검색"
      >
        <span
          className="mr-[10px] flex size-[22px] flex-none items-center justify-center text-content-tertiary"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-full"
          >
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
          className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm font-medium tracking-[-0.025em] text-content outline-none placeholder:text-content-tertiary"
          onChange={(event) =>
            setSearchQuery(event.target.value)
          }
        />

        {searchQuery && (
          <button
            type="button"
            className="ml-2 flex size-[27px] flex-none items-center justify-center rounded-full bg-surface-strong text-lg text-content-secondary"
            aria-label="검색어 지우기"
            onClick={() => setSearchQuery("")}
          >
            ×
          </button>
        )}
      </section>

      <section
        className="mt-[18px] grid w-full grid-cols-[36px_minmax(0,1fr)_36px] items-center gap-2 max-[359px]:grid-cols-[32px_minmax(0,1fr)_32px] max-[359px]:gap-[6px]"
        aria-label="생활 분야 선택"
      >
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-brand-700 shadow-card transition enabled:active:scale-95 disabled:border-transparent disabled:bg-surface disabled:text-content-tertiary disabled:opacity-35 disabled:shadow-none max-[359px]:size-8"
          aria-label="이전 생활 분야"
          disabled={!canScrollCategoryLeft}
          onClick={() =>
            scrollCategories("left")
          }
        >
          <CategoryArrowIcon direction="left" />
        </button>

        <div
          ref={categorySliderRef}
          className="hide-scrollbar flex min-w-0 gap-2 overflow-x-auto overflow-y-hidden px-0.5 py-2 scroll-smooth snap-x snap-proximity overscroll-x-contain touch-pan-x"
          onScroll={updateCategoryScrollState}
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
                    "min-h-[38px] flex-none snap-center rounded-full border px-[15px] py-[9px]",
                    "text-[13px] leading-[1.3] font-bold tracking-[-0.025em]",
                    "transition active:scale-[0.97]",
                    isSelected
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-line bg-white text-content-secondary",
                  ].join(" ")}
                  aria-pressed={isSelected}
                  onClick={(event) =>
                    handleCategorySelect(
                      category.id,
                      event.currentTarget,
                    )
                  }
                >
                  {category.label}
                </button>
              );
            },
          )}
        </div>

        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-brand-700 shadow-card transition enabled:active:scale-95 disabled:border-transparent disabled:bg-surface disabled:text-content-tertiary disabled:opacity-35 disabled:shadow-none max-[359px]:size-8"
          aria-label="다음 생활 분야"
          disabled={!canScrollCategoryRight}
          onClick={() =>
            scrollCategories("right")
          }
        >
          <CategoryArrowIcon direction="right" />
        </button>
      </section>

      <section className="mt-7 shrink-0">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-2 text-[13px] font-bold text-brand-600">
              패치 목록
            </p>

            <h2 className="text-[22px] font-extrabold tracking-[-0.04em] text-content">
              {selectedCategoryId === "all"
                ? "전체 패치"
                : selectedCategory?.label}
            </h2>
          </div>

          <span className="inline-flex min-h-[30px] min-w-[41px] items-center justify-center rounded-full bg-brand-50 px-[10px] py-[6px] text-xs font-bold text-brand-700">
            {filteredPatches.length}개
          </span>
        </div>

        {filteredPatches.length > 0 ? (
          <div className="mt-[17px] grid gap-[14px] pb-3">
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
          <div className="mt-[17px] mb-3 flex shrink-0 flex-col items-center rounded-3xl bg-surface px-5 py-[46px] text-center">
            <div
              className="flex size-[65px] rotate-[-5deg] items-center justify-center rounded-3xl bg-brand-100 text-[26px] font-extrabold text-brand-600"
              aria-hidden="true"
            >
              ?
            </div>

            <h2 className="mt-5 text-lg font-extrabold tracking-[-0.035em] text-content">
              조건에 맞는 패치가 없어요.
            </h2>

            <p className="mt-2 text-[13px] leading-[1.55] text-content-secondary">
              다른 검색어나 생활 분야를
              선택해보세요.
            </p>

            <button
              type="button"
              className="mt-[19px] min-h-[41px] rounded-[13px] bg-brand-600 px-4 py-[10px] text-[13px] font-bold text-white"
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