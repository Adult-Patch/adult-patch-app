import { httpClient } from "./httpClient";

const endpointTemplates = {
  getState:
    import.meta.env
      .VITE_APP_STATE_GET_ENDPOINT,

  onboarding:
    import.meta.env
      .VITE_APP_STATE_ONBOARDING_ENDPOINT,

  patchSelection:
    import.meta.env
      .VITE_PATCH_SELECTION_ENDPOINT,

  patchReviewSelection:
    import.meta.env
      .VITE_PATCH_REVIEW_SELECTION_ENDPOINT,

  patchProgress:
    import.meta.env
      .VITE_PATCH_PROGRESS_ENDPOINT,

  patchReviewComplete:
    import.meta.env
      .VITE_PATCH_REVIEW_COMPLETE_ENDPOINT,

  patchComplete:
    import.meta.env
      .VITE_PATCH_COMPLETE_ENDPOINT,

  resetState:
    import.meta.env
      .VITE_APP_STATE_RESET_ENDPOINT,
};

function requireEndpoint(name) {
  const endpoint =
    endpointTemplates[name];

  if (
    typeof endpoint !== "string" ||
    endpoint.trim().length === 0
  ) {
    throw new Error(
      `${name} API 주소가 설정되지 않았습니다.`,
    );
  }

  return endpoint.trim();
}

function resolvePatchEndpoint(
  name,
  patchId,
) {
  const endpoint =
    requireEndpoint(name);

  if (
    !endpoint.includes(":patchId")
  ) {
    throw new Error(
      `${name} API 주소에 :patchId가 필요합니다.`,
    );
  }

  return endpoint.replace(
    ":patchId",
    encodeURIComponent(patchId),
  );
}

function unwrapResponse(response) {
  if (
    response &&
    typeof response === "object" &&
    Object.prototype.hasOwnProperty.call(
      response,
      "data",
    )
  ) {
    return response.data;
  }

  return response;
}

export const appStateApi = {
  async getState() {
    const response =
      await httpClient.request(
        requireEndpoint("getState"),
      );

    return unwrapResponse(response);
  },

  async saveOnboarding(payload) {
    const response =
      await httpClient.request(
        requireEndpoint("onboarding"),
        {
          method: "PATCH",
          body: payload,
        },
      );

    return unwrapResponse(response);
  },

  async savePatchSelection(
    patchId,
    choiceId,
  ) {
    const response =
      await httpClient.request(
        resolvePatchEndpoint(
          "patchSelection",
          patchId,
        ),
        {
          method: "POST",
          body: {
            choiceId,
          },
        },
      );

    return unwrapResponse(response);
  },

  async savePatchReviewSelection(
    patchId,
    choiceId,
  ) {
    const response =
      await httpClient.request(
        resolvePatchEndpoint(
          "patchReviewSelection",
          patchId,
        ),
        {
          method: "POST",
          body: {
            choiceId,
          },
        },
      );

    return unwrapResponse(response);
  },

  async savePatchProgress(
    patchId,
    step,
  ) {
    const response =
      await httpClient.request(
        resolvePatchEndpoint(
          "patchProgress",
          patchId,
        ),
        {
          method: "PATCH",
          body: {
            step,
          },
        },
      );

    return unwrapResponse(response);
  },

  async completePatchReview(
    patchId,
  ) {
    const response =
      await httpClient.request(
        resolvePatchEndpoint(
          "patchReviewComplete",
          patchId,
        ),
        {
          method: "POST",
        },
      );

    return unwrapResponse(response);
  },

  async completePatch(patchId) {
    const response =
      await httpClient.request(
        resolvePatchEndpoint(
          "patchComplete",
          patchId,
        ),
        {
          method: "POST",
        },
      );

    return unwrapResponse(response);
  },

  async resetState() {
    const response =
      await httpClient.request(
        requireEndpoint("resetState"),
        {
          method: "DELETE",
        },
      );

    return unwrapResponse(response);
  },
};