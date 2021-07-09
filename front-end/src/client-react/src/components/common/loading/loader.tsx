import "./loader.css";
export interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className="force-center">
      <div className="loader"></div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader;
