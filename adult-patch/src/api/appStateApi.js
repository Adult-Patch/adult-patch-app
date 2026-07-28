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

  if (!endpoint) {
    throw new Error(
      `${name} 서버 API 주소가 설정되지 않았습니다.`,
    );
  }

  return endpoint;
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
    return endpoint;
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
    "data" in response
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
    return httpClient.request(
      requireEndpoint("onboarding"),
      {
        method: "PATCH",
        body: payload,
      },
    );
  },

  async savePatchSelection(
    patchId,
    choiceId,
  ) {
    return httpClient.request(
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
  },

  async savePatchReviewSelection(
    patchId,
    choiceId,
  ) {
    return httpClient.request(
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
  },

  async savePatchProgress(
    patchId,
    step,
  ) {
    return httpClient.request(
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
  },

  async completePatchReview(
    patchId,
  ) {
    return httpClient.request(
      resolvePatchEndpoint(
        "patchReviewComplete",
        patchId,
      ),
      {
        method: "POST",
      },
    );
  },

  async completePatch(patchId) {
    return httpClient.request(
      resolvePatchEndpoint(
        "patchComplete",
        patchId,
      ),
      {
        method: "POST",
      },
    );
  },

  async resetState() {
    return httpClient.request(
      requireEndpoint("resetState"),
      {
        method: "DELETE",
      },
    );
  },
};