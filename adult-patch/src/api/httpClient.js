const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? "";

const API_BASE_URL =
  rawBaseUrl.replace(/\/+$/, "");

const configuredTimeout = Number(
  import.meta.env
    .VITE_API_TIMEOUT_MS ?? 10000,
);

const REQUEST_TIMEOUT_MS =
  Number.isFinite(configuredTimeout) &&
  configuredTimeout > 0
    ? configuredTimeout
    : 10000;

let accessTokenProvider = () => null;

export class HttpError extends Error {
  constructor({
    message,
    status,
    data,
  }) {
    super(message);

    this.name = "HttpError";
    this.status = status;
    this.data = data;
  }
}

export function setAccessTokenProvider(
  provider,
) {
  if (typeof provider !== "function") {
    throw new TypeError(
      "토큰 제공 함수가 필요합니다.",
    );
  }

  accessTokenProvider = provider;
}

function createRequestUrl(path) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath =
    path.startsWith("/")
      ? path
      : `/${path}`;

  return `${API_BASE_URL}${normalizedPath}`;
}

async function parseResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const responseText =
    await response.text();

  if (!responseText) {
    return null;
  }

  const contentType =
    response.headers.get(
      "content-type",
    ) ?? "";

  if (
    contentType.includes(
      "application/json",
    )
  ) {
    try {
      return JSON.parse(responseText);
    } catch {
      throw new Error(
        "서버 응답을 해석하지 못했습니다.",
      );
    }
  }

  return responseText;
}

export async function request(
  path,
  {
    method = "GET",
    body,
    headers = {},
    credentials = "include",
    signal,
  } = {},
) {
  const requestUrl =
    createRequestUrl(path);

  const accessToken =
    accessTokenProvider();

  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  let requestBody;

  if (
    body !== undefined &&
    body !== null
  ) {
    requestHeaders["Content-Type"] =
      "application/json";

    requestBody = JSON.stringify(body);
  }

  if (accessToken) {
    requestHeaders.Authorization =
      `Bearer ${accessToken}`;
  }

  const controller =
    new AbortController();

  const handleExternalAbort = () => {
    controller.abort();
  };

  if (signal) {
    if (signal.aborted) {
      controller.abort();
    } else {
      signal.addEventListener(
        "abort",
        handleExternalAbort,
        {
          once: true,
        },
      );
    }
  }

  const timeoutId = window.setTimeout(
    () => {
      controller.abort();
    },
    REQUEST_TIMEOUT_MS,
  );

  try {
    const response = await fetch(
      requestUrl,
      {
        method,
        headers: requestHeaders,
        body: requestBody,
        credentials,
        signal: controller.signal,
      },
    );

    const responseData =
      await parseResponse(response);

    if (!response.ok) {
      const errorMessage =
        responseData?.message ??
        responseData?.error ??
        `요청 처리에 실패했습니다. (${response.status})`;

      throw new HttpError({
        message: errorMessage,
        status: response.status,
        data: responseData,
      });
    }

    return responseData;
  } catch (requestError) {
    if (
      requestError instanceof HttpError
    ) {
      throw requestError;
    }

    if (
      requestError?.name ===
      "AbortError"
    ) {
      throw new Error(
        "서버 응답 시간이 초과되었습니다.",
      );
    }

    if (
      requestError instanceof TypeError
    ) {
      throw new Error(
        `서버에 연결할 수 없습니다. 서버 주소를 확인해주세요: ${API_BASE_URL}`,
      );
    }

    throw requestError;
  } finally {
    window.clearTimeout(timeoutId);

    signal?.removeEventListener(
      "abort",
      handleExternalAbort,
    );
  }
}

export const httpClient = {
  request,
  setAccessTokenProvider,
};