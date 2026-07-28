const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? "";

const API_BASE_URL =
  rawBaseUrl.replace(/\/+$/, "");

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
  if (
    /^https?:\/\//i.test(path)
  ) {
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

  const contentType =
    response.headers.get(
      "content-type",
    ) ?? "";

  if (
    contentType.includes(
      "application/json",
    )
  ) {
    return response.json();
  }

  return response.text();
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

  const response = await fetch(
    createRequestUrl(path),
    {
      method,
      headers: requestHeaders,
      body: requestBody,
      credentials,
      signal,
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
}

export const httpClient = {
  request,
  setAccessTokenProvider,
};