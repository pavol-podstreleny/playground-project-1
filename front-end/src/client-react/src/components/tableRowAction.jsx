import React, { useEffect, useRef, useState } from "react";
import { TableRow } from "./tableRow";
import { ActionList } from "./actionList";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
import "../css/components/tableRowAction.css";

export const TableRowAction = ({
  data,
  columns,
  actionItems,
  actionHandlers,
}) => {
  const actionMenuRef = useRef(null);
  const [isVisible, setVisibility] = useDetectOutsideClick(actionMenuRef);

  return (
    <TableRow data={data} columns={columns}>
      <td className="table-action-column">
        <div
          className="table-action-dots"
          onClick={() => setVisibility(!isVisible)}
        >
          &#8942;
        </div>
        <nav ref={actionMenuRef}>
          <ActionList
            items={actionItems}
            handlers={actionHandlers}
            isVisible={isVisible}
          />
        </nav>
      </td>
    </TableRow>
  );
};
