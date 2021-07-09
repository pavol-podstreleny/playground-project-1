export interface TryAgainProps {
  onClick: () => void;
}

const TryAgain: React.FC<TryAgainProps> = ({ onClick }) => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>Please check you internet connection and try again</p>
      <button className="button button-primary" onClick={onClick}>
        Try again
      </button>
    </div>
  );
};

export default TryAgain;
