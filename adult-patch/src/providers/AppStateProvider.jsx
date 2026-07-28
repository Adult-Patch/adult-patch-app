import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { getAppStateSource } from "../repositories/app-state/appStateRepository";
import { appStateService } from "../services/appStateService";

export const AppStateContext =
  createContext(null);

function AppStateLoadingScreen() {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-app-background px-6">
      <div className="text-center">
        <div className="mx-auto size-9 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />

        <p className="mt-4 text-sm font-semibold text-content-secondary">
          어른패치를 준비하고 있어요.
        </p>
      </div>
    </div>
  );
}

function AppStateErrorScreen({
  error,
  onRetry,
}) {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-app-background px-6">
      <div className="w-full max-w-[360px] rounded-3xl border border-line bg-white p-6 text-center shadow-card">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-caution-light text-xl font-extrabold text-caution">
          !
        </div>

        <h1 className="mt-5 text-xl font-extrabold text-content">
          사용자 정보를 불러오지 못했어요.
        </h1>

        <p className="mt-3 text-sm leading-[1.6] text-content-secondary">
          {error?.message ??
            "잠시 후 다시 시도해주세요."}
        </p>

        <button
          type="button"
          className="mt-6 min-h-12 w-full rounded-2xl bg-brand-600 px-5 font-bold text-white"
          onClick={onRetry}
        >
          다시 불러오기
        </button>
      </div>
    </div>
  );
}

export function AppStateProvider({
  children,
}) {
  const mountedRef = useRef(true);

  const [appState, setAppState] =
    useState(null);

  const [initializing, setInitializing] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const refresh = useCallback(
    async () => {
      setInitializing(true);
      setError(null);

      try {
        const nextState =
          await appStateService.getState();

        if (mountedRef.current) {
          setAppState(nextState);
        }

        return nextState;
      } catch (refreshError) {
        if (mountedRef.current) {
          setError(refreshError);
        }

        throw refreshError;
      } finally {
        if (mountedRef.current) {
          setInitializing(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    refresh().catch(() => {
      // 오류 화면에서 재시도를 제공합니다.
    });
  }, [refresh]);

  const runMutation = useCallback(
    async (mutation) => {
      setSaving(true);
      setError(null);

      try {
        const nextState =
          await mutation();

        if (mountedRef.current) {
          setAppState(nextState);
        }

        return nextState;
      } catch (mutationError) {
        if (mountedRef.current) {
          setError(mutationError);
        }

        throw mutationError;
      } finally {
        if (mountedRef.current) {
          setSaving(false);
        }
      }
    },
    [],
  );

  const saveOnboarding = useCallback(
    (payload) =>
      runMutation(() =>
        appStateService.saveOnboarding(
          payload,
        ),
      ),
    [runMutation],
  );

  const savePatchSelection =
    useCallback(
      (patchId, choiceId) =>
        runMutation(() =>
          appStateService.savePatchSelection(
            patchId,
            choiceId,
          ),
        ),
      [runMutation],
    );

  const savePatchReviewSelection =
    useCallback(
      (patchId, choiceId) =>
        runMutation(() =>
          appStateService.savePatchReviewSelection(
            patchId,
            choiceId,
          ),
        ),
      [runMutation],
    );

  const savePatchProgress =
    useCallback(
      (patchId, step) =>
        runMutation(() =>
          appStateService.savePatchProgress(
            patchId,
            step,
          ),
        ),
      [runMutation],
    );

  const completePatchReview =
    useCallback(
      (patchId) =>
        runMutation(() =>
          appStateService.completePatchReview(
            patchId,
          ),
        ),
      [runMutation],
    );

  const completePatch = useCallback(
    (patchId) =>
      runMutation(() =>
        appStateService.completePatch(
          patchId,
        ),
      ),
    [runMutation],
  );

  const resetState = useCallback(
    () =>
      runMutation(() =>
        appStateService.resetState(),
      ),
    [runMutation],
  );

  const contextValue = useMemo(
    () => ({
      appState,
      initializing,
      saving,
      error,
      source: getAppStateSource(),
      refresh,
      saveOnboarding,
      savePatchSelection,
      savePatchReviewSelection,
      savePatchProgress,
      completePatchReview,
      completePatch,
      resetState,
    }),
    [
      appState,
      initializing,
      saving,
      error,
      refresh,
      saveOnboarding,
      savePatchSelection,
      savePatchReviewSelection,
      savePatchProgress,
      completePatchReview,
      completePatch,
      resetState,
    ],
  );

  if (initializing && !appState) {
    return <AppStateLoadingScreen />;
  }

  if (error && !appState) {
    return (
      <AppStateErrorScreen
        error={error}
        onRetry={() => {
          refresh().catch(() => {
            // 재시도 실패 시 오류 화면을 유지합니다.
          });
        }}
      />
    );
  }

  return (
    <AppStateContext.Provider
      value={contextValue}
    >
      {children}
    </AppStateContext.Provider>
  );
}