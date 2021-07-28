import "./loader.css";

interface LoaderProps {
  text?: string;
  size?: LoaderSize;
}

enum LoaderSize {
  SMALL = "small",
  MEDIUM = "medium",
}

const Loader: React.FC<LoaderProps> = ({ text, size }) => {
  return (
    <div>
      <div className={size ? `loader loader--${size}` : "loader"}></div>
      {text && <p className="loader__text">{text}</p>}
    </div>
  );
};

export default Loader;
