import React from "react";
import Card, { CardSize } from "../cards/card";
import "./cardDialog.css";

export interface MessageType {
  isError: boolean;
  message: string;
}

export interface CardDialogProps {
  messages?: MessageType[];
  title: string;
  children: React.ReactNode;
  size?: CardSize;
}

const CardDialog = React.forwardRef<HTMLDivElement, CardDialogProps>(
  ({ messages, title, children, size }, ref) => {
    return (
      <div ref={ref}>
        <Card size={size}>
          <section className="card-dialog">
            <h3>{title}</h3>
            {messages &&
              messages.map((message) => {
                return (
                  <p
                    key={message.message}
                    className={message.isError ? "error" : ""}
                  >
                    {message.message}
                  </p>
                );
              })}
            {children}
          </section>
        </Card>
      </div>
    );
  }
);

export default CardDialog;
