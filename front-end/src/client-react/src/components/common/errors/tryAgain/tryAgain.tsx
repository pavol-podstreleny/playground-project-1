import "./tryAgain.css";

interface TryAgainProps {
  onClick: () => void;
  heading?: string;
  text?: string;
  buttonText?: string;
}

const TryAgain: React.FC<TryAgainProps> = ({
  onClick,
  heading,
  text,
  buttonText,
}) => {
  return (
    <div className="try-again">
      <h1 className="try-again__header">
        {heading ? heading : "Something went wrong"}
      </h1>
      <p className="try-again__text">
        {text ? text : "Please check you internet connection and try again"}
      </p>
      <button className="button button--primary" onClick={onClick}>
        {buttonText ? buttonText : "Try again"}
      </button>
    </div>
  );
};

export default TryAgain;
