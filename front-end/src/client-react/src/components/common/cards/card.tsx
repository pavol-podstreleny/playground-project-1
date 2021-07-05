import "./card.css";

export interface CardProps {
  size?: CardSize;
}

export enum CardSize {
  REGULAR = "regular",
  MEDIUM = "medium",
}

const Card: React.FC<CardProps> = ({ children, size }) => {
  return <div className={size ? `card card-${size}` : "card"}>{children}</div>;
};

export default Card;
