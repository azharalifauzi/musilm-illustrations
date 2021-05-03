import { useEffect, useRef, useState } from 'react';

const sumTime = (currentIdx: number, numbers: number[]) => {
  let total = 0;

  for (let i = 0; i <= currentIdx; i++) {
    total += numbers[i];
  }

  return total;
};

export const useDelay = (timeDelays: number[]) => {
  const [delays, setDelays] = useState<Record<string, boolean>>(() => {
    const initialValue: Record<string, boolean> = {};
    timeDelays.forEach((_, i) => {
      initialValue[i] = false;
    });
    return initialValue;
  });

  const timeRefs = useRef([]);

  timeRefs.current = timeDelays;

  useEffect(() => {
    for (let i = 0; i < timeRefs.current.length; i++) {
      setTimeout(() => {
        setDelays((prevState) => ({
          ...prevState,
          [i]: true,
        }));
      }, sumTime(i, timeRefs.current));
    }
  }, []);

  return { delays };
};
