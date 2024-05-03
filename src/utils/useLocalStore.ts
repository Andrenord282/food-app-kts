import { useRef, useEffect } from 'react';

export type TLocalStore = {
  destroy(): void;
};

export const useLocalStore = <T extends TLocalStore>(creator: () => T): T => {
  const container = useRef<T | null>(null);

  if (container.current === null) {
    container.current = creator();
  }

  useEffect(() => {

    return container.current?.destroy();
  }, []);

  return container.current;
};
