import React from "react";
import Card, { CardSize } from "../cards/card";
import Loader from "../loading/loader";
import "./cardDialog.css";

export interface MessageType {
  isError: boolean;
  message: string;
}

export interface CardLoaderProps {
  isLoading: boolean;
  text?: string;
}

export interface CardDialogProps {
  messages?: MessageType[];
  title: string;
  isLoading?: CardLoaderProps;
  children: React.ReactNode;
  size?: CardSize;
}

const CardDialog = React.forwardRef<HTMLDivElement, CardDialogProps>(
  ({ messages, title, children, size, isLoading }, ref) => {
    return (
      <div ref={ref}>
        <Card size={size} relative>
          {isLoading && isLoading.isLoading && (
            <div className="absolute-right-top">
              <Loader text={isLoading.text} />
            </div>
          )}
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
