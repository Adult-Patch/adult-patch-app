import { appStateApi } from "../../api/appStateApi";
import { normalizeAppState } from "../../models/appState";

async function getState() {
  const state =
    await appStateApi.getState();

  return normalizeAppState(state);
}

async function mutateAndRefresh(
  mutation,
) {
  await mutation();

  return getState();
}

export const remoteAppStateRepository = {
  getState,

  async saveOnboarding(payload) {
    return mutateAndRefresh(() =>
      appStateApi.saveOnboarding(
        payload,
      ),
    );
  },

  async savePatchSelection(
    patchId,
    choiceId,
  ) {
    return mutateAndRefresh(() =>
      appStateApi.savePatchSelection(
        patchId,
        choiceId,
      ),
    );
  },

  async savePatchReviewSelection(
    patchId,
    choiceId,
  ) {
    return mutateAndRefresh(() =>
      appStateApi.savePatchReviewSelection(
        patchId,
        choiceId,
      ),
    );
  },

  async savePatchProgress(
    patchId,
    step,
  ) {
    return mutateAndRefresh(() =>
      appStateApi.savePatchProgress(
        patchId,
        step,
      ),
    );
  },

  async completePatchReview(
    patchId,
  ) {
    return mutateAndRefresh(() =>
      appStateApi.completePatchReview(
        patchId,
      ),
    );
  },

  async completePatch(patchId) {
    return mutateAndRefresh(() =>
      appStateApi.completePatch(
        patchId,
      ),
    );
  },

  async resetState() {
    return mutateAndRefresh(() =>
      appStateApi.resetState(),
    );
  },
};