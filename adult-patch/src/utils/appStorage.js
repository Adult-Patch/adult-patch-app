const STORAGE_KEY = "adult-patch:app-state";

const DEFAULT_APP_STATE = {
  onboardingCompleted: false,
  selectedSituation: "",
  completedPatchIds: [],
  completedMissionIds: [],
  patchSelections: {},
};

function createDefaultAppState() {
  return {
    ...DEFAULT_APP_STATE,
    completedPatchIds: [],
    completedMissionIds: [],
    patchSelections: {},
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

function normalizePatchSelections(value) {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return {};
  }

  return Object.entries(value).reduce(
    (selections, [patchId, choiceId]) => {
      if (
        typeof patchId === "string" &&
        patchId.trim().length > 0 &&
        typeof choiceId === "string" &&
        choiceId.trim().length > 0
      ) {
        selections[patchId] = choiceId;
      }

      return selections;
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

  return {
    onboardingCompleted:
      value.onboardingCompleted === true,

    selectedSituation:
      typeof value.selectedSituation === "string"
        ? value.selectedSituation
        : "",

    completedPatchIds: normalizeStringArray(
      value.completedPatchIds,
    ),

    completedMissionIds: normalizeStringArray(
      value.completedMissionIds,
    ),

    patchSelections: normalizePatchSelections(
      value.patchSelections,
    ),
  };
}

export function getAppState() {
  if (!isBrowserEnvironment()) {
    return createDefaultAppState();
  }

  try {
    const storedState =
      window.localStorage.getItem(STORAGE_KEY);

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

export function saveOnboarding(
  selectedSituation,
) {
  return updateAppState((currentState) => ({
    ...currentState,
    onboardingCompleted: true,
    selectedSituation,
  }));
}

export function savePatchSelection(
  patchId,
  choiceId,
) {
  return updateAppState((currentState) => ({
    ...currentState,
    patchSelections: {
      ...currentState.patchSelections,
      [patchId]: choiceId,
    },
  }));
}

export function completePatch(patchId) {
  return updateAppState((currentState) => ({
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
  }));
}

export function resetAppState() {
  const defaultState = createDefaultAppState();

  if (!isBrowserEnvironment()) {
    return defaultState;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error(
      "어른패치 저장 정보를 초기화하지 못했습니다.",
      error,
    );
  }

  return defaultState;
}