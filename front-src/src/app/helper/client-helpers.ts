import { useCallback } from "react";

export const useDebouncedCallback = (callback: () => void, time: number) => {
  let timer: NodeJS.Timeout | undefined;

  return useCallback(() => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(callback, time);
  }, []);
};
