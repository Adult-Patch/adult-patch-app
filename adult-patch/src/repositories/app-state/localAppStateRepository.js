import {
  appendUnique,
  clampPatchStep,
  createDefaultAppState,
  normalizeAppState,
} from "../../models/appState";

import {
  readAppStateFromStorage,
  removeAppStateFromStorage,
  writeAppStateToStorage,
} from "../../utils/appStorage";

async function getState() {
  const storedState =
    readAppStateFromStorage();

  const normalizedState =
    storedState
      ? normalizeAppState(storedState)
      : createDefaultAppState();

  writeAppStateToStorage(normalizedState);

  return normalizedState;
}

async function updateState(updater) {
  const currentState = await getState();

  const nextState = normalizeAppState(
    updater(currentState),
  );

  writeAppStateToStorage(nextState);

  return nextState;
}

export const localAppStateRepository = {
  getState,

  async saveOnboarding({
    selectedSituation,
    selectedInterests,
    experienceLevel,
  }) {
    return updateState(
      (currentState) => ({
        ...currentState,
        onboardingCompleted: true,
        selectedSituation,
        selectedInterests,
        experienceLevel,
      }),
    );
  },

  async savePatchSelection(
    patchId,
    choiceId,
  ) {
    return updateState(
      (currentState) => ({
        ...currentState,

        patchSelections: {
          ...currentState.patchSelections,
          [patchId]: choiceId,
        },
      }),
    );
  },

  async savePatchReviewSelection(
    patchId,
    choiceId,
  ) {
    return updateState(
      (currentState) => ({
        ...currentState,

        patchReviewSelections: {
          ...currentState.patchReviewSelections,
          [patchId]: choiceId,
        },
      }),
    );
  },

  async savePatchProgress(
    patchId,
    step,
  ) {
    return updateState(
      (currentState) => ({
        ...currentState,

        patchProgress: {
          ...currentState.patchProgress,
          [patchId]:
            clampPatchStep(step),
        },
      }),
    );
  },

  async completePatchReview(patchId) {
    return updateState(
      (currentState) => ({
        ...currentState,

        reviewCompletedPatchIds:
          appendUnique(
            currentState.reviewCompletedPatchIds,
            patchId,
          ),

        patchProgress: {
          ...currentState.patchProgress,
          [patchId]: 3,
        },
      }),
    );
  },

  async completePatch(patchId) {
    return updateState(
      (currentState) => {
        const completedAt =
          currentState.patchCompletedAt[
            patchId
          ] ?? new Date().toISOString();

        return {
          ...currentState,

          completedPatchIds:
            appendUnique(
              currentState.completedPatchIds,
              patchId,
            ),

          completedMissionIds:
            appendUnique(
              currentState.completedMissionIds,
              patchId,
            ),

          reviewCompletedPatchIds:
            appendUnique(
              currentState.reviewCompletedPatchIds,
              patchId,
            ),

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
  },

  async resetState() {
    removeAppStateFromStorage();

    const defaultState =
      createDefaultAppState();

    writeAppStateToStorage(defaultState);

    return defaultState;
  },
};