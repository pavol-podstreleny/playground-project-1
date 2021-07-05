import React from "react";
import "./dotsButton.css";

export interface DostButtonProps {
  onDotsButtonClick: () => void;
}

const DostButton: React.FC<DostButtonProps> = ({ onDotsButtonClick }) => {
  return (
    <button className="button button-dots" onClick={() => onDotsButtonClick()}>
      &#8942;
    </button>
  );
};

export default DostButton;
