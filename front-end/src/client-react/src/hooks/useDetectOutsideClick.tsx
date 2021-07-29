import React, { useState, useEffect, RefObject } from "react";

export const useDetectOutsideClick = (
  elementRef: RefObject<HTMLElement>,
  initialState: boolean
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
