import "./loader.css";
export interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div>
      <div className="loader"></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;
