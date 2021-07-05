import React, { useState, useEffect, RefObject, EventHandler } from "react";
import { useCallback } from "react";

export const useDetectOutsideClickWithCallback = (
  elementRef: RefObject<HTMLElement>,
  initialState: boolean,
  callBack: () => void
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        elementRef &&
        elementRef.current !== null &&
        !elementRef.current?.contains(e.target as Node)
      ) {
        setIsActive(!isActive);
        callBack();
      }
    };
    if (isActive) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, elementRef]);
  return [isActive, setIsActive];
};
