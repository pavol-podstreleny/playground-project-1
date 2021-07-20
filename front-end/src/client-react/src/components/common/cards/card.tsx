import "./card.css";

export interface CardProps {
  size?: CardSize;
  relative?: boolean;
}

export enum CardSize {
  REGULAR = "regular",
  MEDIUM = "medium",
}

const Card: React.FC<CardProps> = ({ children, size, relative }) => {
  const classes = () => {
    const result = [];
    if (size) {
      result.push(`card card-${size}`);
    } else {
      result.push("card");
    }

    if (relative) {
      result.push("relative");
    }
    return result.join(" ");
  };
  return <div className={classes()}>{children}</div>;
};

export default Card;
