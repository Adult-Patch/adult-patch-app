import { useContext } from "react";

import { AppStateContext } from "../providers/AppStateProvider";

export function useAppState() {
  const context =
    useContext(AppStateContext);

  if (!context) {
    throw new Error(
      "useAppState는 AppStateProvider 내부에서 사용해야 합니다.",
    );
  }

  return context;
}