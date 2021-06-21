import React from "react";
import { Card } from "./card";
import "../css/components/actionList.css";

export const ActionList = ({ items, handlers, isVisible }) => {
  let classNames = "action-list";
  if (isVisible) {
    classNames += " visible";
  }
  return (
    <div className={classNames}>
      <Card>
        <ul className="ul-general">
          {items.map((actionName, idx) => {
            return <li key={idx}>{actionName}</li>;
          })}
        </ul>
      </Card>
    </div>
  );
};
