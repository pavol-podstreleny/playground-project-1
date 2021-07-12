import React from "react";
import Card, { CardSize } from "../cards/card";
import "./cardDialog.css";

export interface MessageType {
  isError: boolean;
  message: string;
}

export interface CardDialogProps {
  message?: MessageType;
  title: string;
  children: React.ReactNode;
  size?: CardSize;
}

const CardDialog = React.forwardRef<HTMLDivElement, CardDialogProps>(
  ({ message, title, children, size }, ref) => {
    return (
      <div ref={ref}>
        <Card size={size}>
          <section className="card-dialog">
            <h3>{title}</h3>
            {message && (
              <p className={message.isError ? "error" : ""}>
                {message.message}
              </p>
            )}
            {children}
          </section>
        </Card>
      </div>
    );
  }
);

export default CardDialog;
