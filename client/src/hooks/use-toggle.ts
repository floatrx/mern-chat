import { useCallback, useState } from 'react';

export const useToggle = (initialValue = false) => {
  const [isOpen, setOpen] = useState<boolean>(initialValue);
  const toggleOpen = useCallback(() => setOpen((open) => !open), []);
  const close = useCallback(() => setOpen(false), []);
  const open = useCallback(() => setOpen(true), []);
  return { isOpen, close, open, toggleOpen, setOpen };
};
