import { clampPatchStep } from "../models/appState";
import { appStateRepository } from "../repositories/app-state/appStateRepository";

function assertNonEmptyString(
  value,
  fieldName,
) {
  if (
    typeof value !== "string" ||
    value.trim().length === 0
  ) {
    throw new TypeError(
      `${fieldName} 값이 필요합니다.`,
    );
  }
}

function assertStringArray(
  value,
  fieldName,
) {
  if (
    !Array.isArray(value) ||
    value.some(
      (item) =>
        typeof item !== "string" ||
        item.trim().length === 0,
    )
  ) {
    throw new TypeError(
      `${fieldName} 값은 문자열 배열이어야 합니다.`,
    );
  }
}

export const appStateService = {
  async getState() {
    return appStateRepository.getState();
  },

  async saveOnboarding({
    selectedSituation,
    selectedInterests,
    experienceLevel,
  }) {
    assertNonEmptyString(
      selectedSituation,
      "현재 생활 상황",
    );

    assertStringArray(
      selectedInterests,
      "관심 분야",
    );

    if (selectedInterests.length === 0) {
      throw new Error(
        "관심 분야를 한 개 이상 선택해야 합니다.",
      );
    }

    assertNonEmptyString(
      experienceLevel,
      "경험 수준",
    );

    return appStateRepository.saveOnboarding(
      {
        selectedSituation,
        selectedInterests,
        experienceLevel,
      },
    );
  },

  async savePatchSelection(
    patchId,
    choiceId,
  ) {
    assertNonEmptyString(
      patchId,
      "패치 ID",
    );

    assertNonEmptyString(
      choiceId,
      "선택지 ID",
    );

    return appStateRepository.savePatchSelection(
      patchId,
      choiceId,
    );
  },

  async savePatchReviewSelection(
    patchId,
    choiceId,
  ) {
    assertNonEmptyString(
      patchId,
      "패치 ID",
    );

    assertNonEmptyString(
      choiceId,
      "최종 선택지 ID",
    );

    return appStateRepository.savePatchReviewSelection(
      patchId,
      choiceId,
    );
  },

  async savePatchProgress(
    patchId,
    step,
  ) {
    assertNonEmptyString(
      patchId,
      "패치 ID",
    );

    return appStateRepository.savePatchProgress(
      patchId,
      clampPatchStep(step),
    );
  },

  async completePatchReview(
    patchId,
  ) {
    assertNonEmptyString(
      patchId,
      "패치 ID",
    );

    return appStateRepository.completePatchReview(
      patchId,
    );
  },

  async completePatch(patchId) {
    assertNonEmptyString(
      patchId,
      "패치 ID",
    );

    return appStateRepository.completePatch(
      patchId,
    );
  },

  async resetState() {
    return appStateRepository.resetState();
  },
};