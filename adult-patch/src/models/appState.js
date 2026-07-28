export const MAX_PATCH_STEP = 3;

export const DEFAULT_APP_STATE = {
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

export function createDefaultAppState() {
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

export function appendUnique(items, value) {
  return [...new Set([...items, value])];
}

export function clampPatchStep(step) {
  const numericStep = Number(step);

  if (!Number.isInteger(numericStep)) {
    return 1;
  }

  return Math.min(
    Math.max(numericStep, 1),
    MAX_PATCH_STEP,
  );
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
      const validKey =
        typeof key === "string" &&
        key.trim().length > 0;

      const validValue =
        typeof recordValue === "string" &&
        recordValue.trim().length > 0;

      if (validKey && validValue) {
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
      const validPatchId =
        typeof patchId === "string" &&
        patchId.trim().length > 0;

      if (!validPatchId) {
        return record;
      }

      record[patchId] =
        clampPatchStep(step);

      return record;
    },
    {},
  );
}

export function normalizeAppState(value) {
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