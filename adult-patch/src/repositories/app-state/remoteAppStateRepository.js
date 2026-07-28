import { appStateApi } from "../../api/appStateApi";

import {
  normalizeAppState,
} from "../../models/appState";

async function getState() {
  const state =
    await appStateApi.getState();

  return normalizeAppState(state);
}

async function normalizeMutation(
  mutation,
) {
  const state = await mutation();

  return normalizeAppState(state);
}

export const remoteAppStateRepository = {
  getState,

  async saveOnboarding(payload) {
    return normalizeMutation(() =>
      appStateApi.saveOnboarding(
        payload,
      ),
    );
  },

  async savePatchSelection(
    patchId,
    choiceId,
  ) {
    return normalizeMutation(() =>
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
    return normalizeMutation(() =>
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
    return normalizeMutation(() =>
      appStateApi.savePatchProgress(
        patchId,
        step,
      ),
    );
  },

  async completePatchReview(
    patchId,
  ) {
    return normalizeMutation(() =>
      appStateApi.completePatchReview(
        patchId,
      ),
    );
  },

  async completePatch(patchId) {
    return normalizeMutation(() =>
      appStateApi.completePatch(
        patchId,
      ),
    );
  },

  async resetState() {
    return normalizeMutation(() =>
      appStateApi.resetState(),
    );
  },
};