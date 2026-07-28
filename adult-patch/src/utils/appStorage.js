const STORAGE_KEY = "adult-patch:app-state";

function isBrowserEnvironment() {
  return typeof window !== "undefined";
}

export function readAppStateFromStorage() {
  if (!isBrowserEnvironment()) {
    return null;
  }

  try {
    const storedValue =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    if (!storedValue) {
      return null;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.error(
      "로컬 사용자 상태를 읽지 못했습니다.",
      error,
    );

    return null;
  }
}

export function writeAppStateToStorage(
  appState,
) {
  if (!isBrowserEnvironment()) {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(appState),
    );
  } catch (error) {
    console.error(
      "로컬 사용자 상태를 저장하지 못했습니다.",
      error,
    );

    throw error;
  }
}

export function removeAppStateFromStorage() {
  if (!isBrowserEnvironment()) {
    return;
  }

  try {
    window.localStorage.removeItem(
      STORAGE_KEY,
    );
  } catch (error) {
    console.error(
      "로컬 사용자 상태를 초기화하지 못했습니다.",
      error,
    );

    throw error;
  }
}