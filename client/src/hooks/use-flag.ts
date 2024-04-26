import { useCallback, useState } from 'react';

type UseFlagFn = (initialValue: boolean) => [boolean, () => void, (value: boolean) => void];

export const useFlag: UseFlagFn = (initialValue) => {
  const [flag, setFlag] = useState<boolean>(initialValue);
  const toggleFlag = useCallback(() => setFlag((open) => !open), []);
  return [flag, toggleFlag, setFlag];
};
