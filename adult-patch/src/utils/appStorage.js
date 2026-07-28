const STORAGE_KEY = "adult-patch:app-state";

const DEFAULT_APP_STATE = {
  onboardingCompleted: false,
  selectedSituation: "",
  selectedInterests: [],
  experienceLevel: "",
  completedPatchIds: [],
  completedMissionIds: [],
  reviewCompletedPatchIds: [],
  patchSelections: {},
  patchReviewSelections: {},
  patchProgress: {},
  patchCompletedAt: {},
};

function createDefaultAppState() {
  return {
    ...DEFAULT_APP_STATE,
    selectedInterests: [],
    completedPatchIds: [],
    completedMissionIds: [],
    reviewCompletedPatchIds: [],
    patchSelections: {},
    patchReviewSelections: {},
    patchProgress: {},
    patchCompletedAt: {},
  };
}

function isBrowserEnvironment() {
  return typeof window !== "undefined";
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [
    ...new Set(
      value.filter(
        (item) =>
          typeof item === "string" &&
          item.trim().length > 0,
      ),
    ),
  ];
}

function normalizeStringRecord(value) {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return {};
  }

  return Object.entries(value).reduce(
    (record, [key, recordValue]) => {
      const isValidKey =
        typeof key === "string" &&
        key.trim().length > 0;

      const isValidValue =
        typeof recordValue === "string" &&
        recordValue.trim().length > 0;

      if (isValidKey && isValidValue) {
        record[key] = recordValue;
      }

      return record;
    },
    {},
  );
}

function normalizeProgressRecord(value) {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return {};
  }

  return Object.entries(value).reduce(
    (record, [patchId, step]) => {
      const numericStep = Number(step);

      const isValidPatchId =
        typeof patchId === "string" &&
        patchId.trim().length > 0;

      const isValidStep =
        Number.isInteger(numericStep) &&
        numericStep >= 1 &&
        numericStep <= 3;

      if (isValidPatchId && isValidStep) {
        record[patchId] = numericStep;
      }

      return record;
    },
    {},
  );
}

function normalizeAppState(value) {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return createDefaultAppState();
  }

  const completedPatchIds =
    normalizeStringArray(
      value.completedPatchIds,
    );

  const reviewCompletedPatchIds =
    Array.isArray(
      value.reviewCompletedPatchIds,
    )
      ? normalizeStringArray(
          value.reviewCompletedPatchIds,
        )
      : [...completedPatchIds];

  return {
    onboardingCompleted:
      value.onboardingCompleted === true,

    selectedSituation:
      typeof value.selectedSituation ===
      "string"
        ? value.selectedSituation
        : "",

    selectedInterests: normalizeStringArray(
      value.selectedInterests,
    ),

    experienceLevel:
      typeof value.experienceLevel ===
      "string"
        ? value.experienceLevel
        : "",

    completedPatchIds,

    completedMissionIds:
      normalizeStringArray(
        value.completedMissionIds,
      ),

    reviewCompletedPatchIds,

    patchSelections: normalizeStringRecord(
      value.patchSelections,
    ),

    patchReviewSelections:
      normalizeStringRecord(
        value.patchReviewSelections,
      ),

    patchProgress: normalizeProgressRecord(
      value.patchProgress,
    ),

    patchCompletedAt: normalizeStringRecord(
      value.patchCompletedAt,
    ),
  };
}

export function getAppState() {
  if (!isBrowserEnvironment()) {
    return createDefaultAppState();
  }

  try {
    const storedState =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    if (!storedState) {
      return createDefaultAppState();
    }

    return normalizeAppState(
      JSON.parse(storedState),
    );
  } catch (error) {
    console.error(
      "어른패치 저장 정보를 불러오지 못했습니다.",
      error,
    );

    return createDefaultAppState();
  }
}

export function setAppState(nextState) {
  const normalizedState =
    normalizeAppState(nextState);

  if (!isBrowserEnvironment()) {
    return normalizedState;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(normalizedState),
    );
  } catch (error) {
    console.error(
      "어른패치 정보를 저장하지 못했습니다.",
      error,
    );
  }

  return normalizedState;
}

export function updateAppState(updater) {
  if (typeof updater !== "function") {
    throw new TypeError(
      "상태 변경 함수가 필요합니다.",
    );
  }

  const currentState = getAppState();
  const nextState = updater(currentState);

  return setAppState(nextState);
}

export function saveOnboarding({
  selectedSituation,
  selectedInterests,
  experienceLevel,
}) {
  return updateAppState(
    (currentState) => ({
      ...currentState,
      onboardingCompleted: true,
      selectedSituation,
      selectedInterests,
      experienceLevel,
    }),
  );
}

export function savePatchSelection(
  patchId,
  choiceId,
) {
  return updateAppState(
    (currentState) => ({
      ...currentState,
      patchSelections: {
        ...currentState.patchSelections,
        [patchId]: choiceId,
      },
    }),
  );
}

export function savePatchReviewSelection(
  patchId,
  choiceId,
) {
  return updateAppState(
    (currentState) => ({
      ...currentState,
      patchReviewSelections: {
        ...currentState.patchReviewSelections,
        [patchId]: choiceId,
      },
    }),
  );
}

export function savePatchProgress(
  patchId,
  step,
) {
  const safeStep = Math.min(
    Math.max(Number(step), 1),
    3,
  );

  return updateAppState(
    (currentState) => ({
      ...currentState,
      patchProgress: {
        ...currentState.patchProgress,
        [patchId]: safeStep,
      },
    }),
  );
}

export function completePatchReview(
  patchId,
) {
  return updateAppState(
    (currentState) => ({
      ...currentState,

      reviewCompletedPatchIds: [
        ...new Set([
          ...currentState.reviewCompletedPatchIds,
          patchId,
        ]),
      ],

      patchProgress: {
        ...currentState.patchProgress,
        [patchId]: 3,
      },
    }),
  );
}

export function completePatch(patchId) {
  return updateAppState(
    (currentState) => {
      const completedAt =
        currentState.patchCompletedAt[
          patchId
        ] ?? new Date().toISOString();

      return {
        ...currentState,

        completedPatchIds: [
          ...new Set([
            ...currentState.completedPatchIds,
            patchId,
          ]),
        ],

        completedMissionIds: [
          ...new Set([
            ...currentState.completedMissionIds,
            patchId,
          ]),
        ],

        reviewCompletedPatchIds: [
          ...new Set([
            ...currentState.reviewCompletedPatchIds,
            patchId,
          ]),
        ],

        patchProgress: {
          ...currentState.patchProgress,
          [patchId]: 3,
        },

        patchCompletedAt: {
          ...currentState.patchCompletedAt,
          [patchId]: completedAt,
        },
      };
    },
  );
}

export function resetAppState() {
  const defaultState =
    createDefaultAppState();

  if (!isBrowserEnvironment()) {
    return defaultState;
  }

  try {
    window.localStorage.removeItem(
      STORAGE_KEY,
    );
  } catch (error) {
    console.error(
      "어른패치 저장 정보를 초기화하지 못했습니다.",
      error,
    );
  }

  return defaultState;
}