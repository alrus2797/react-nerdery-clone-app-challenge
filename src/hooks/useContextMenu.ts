import { useEffect, useState, MouseEvent } from 'react';

interface ContextState<T> {
  isToggled: boolean;
  x: number;
  y: number;
  extraData?: T;
}

const defaultContextState = {
  isToggled: false,
  x: 0,
  y: 0,
};

export const useContextMenu = <T>(persistExtraData = false) => {
  const [context, setContext] = useState<ContextState<T>>(defaultContextState);

  const resetContextMenu = () => {
    if (persistExtraData === true) {
      setContext({ ...defaultContextState, extraData: context.extraData });
    } else {
      setContext(defaultContextState);
    }
  };

  const toggle = () => {
    setContext({ ...context, isToggled: !context.isToggled });
  };

  const onContextMenu = (e: MouseEvent<Element>, extraData?: T) => {
    e.preventDefault();
    setContext({
      isToggled: true,
      x: e.pageX + 2,
      y: e.pageY + 2,
      extraData,
    });
  };

  useEffect(() => {
    function handler() {
      resetContextMenu();
    }

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  });

  return { context, setContext, resetContextMenu, toggle, onContextMenu };
};
