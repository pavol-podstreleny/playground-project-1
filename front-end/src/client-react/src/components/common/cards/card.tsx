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
  const getClasses = (): string => {
    const classes = [];
    classes.push(size ? `card card--${size}` : "card");
    if (relative) {
      classes.push("card--relative");
    }
    return classes.join(" ");
  };
  return <div className={getClasses()}>{children}</div>;
};

export default Card;
