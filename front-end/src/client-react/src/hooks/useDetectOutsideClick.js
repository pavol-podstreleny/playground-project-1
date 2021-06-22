import React, { useState, useEffect } from "react";

export const useDetectOutsideClick = (elementRef, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      if (
        elementRef.current !== null &&
        !elementRef.current.contains(e.target)
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
