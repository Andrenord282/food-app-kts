import { useState, useEffect, useRef } from 'react';

const useDebounce = (value: string, delay = 400) => {
  const [debouncedValue, setDebounceValue] = useState(value);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
