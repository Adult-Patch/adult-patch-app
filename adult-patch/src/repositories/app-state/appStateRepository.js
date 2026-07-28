import { localAppStateRepository } from "./localAppStateRepository";
import { remoteAppStateRepository } from "./remoteAppStateRepository";

const configuredSource = (
  import.meta.env
    .VITE_APP_STATE_SOURCE ?? "local"
)
  .trim()
  .toLowerCase();

function resolveRepository() {
  if (configuredSource === "local") {
    return localAppStateRepository;
  }

  if (configuredSource === "remote") {
    return remoteAppStateRepository;
  }

  throw new Error(
    `지원하지 않는 사용자 상태 저장 방식입니다: ${configuredSource}`,
  );
}

export const appStateRepository =
  resolveRepository();

export function getAppStateSource() {
  return configuredSource;
}