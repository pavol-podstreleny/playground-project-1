import "./notFound.css";
export interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <div className="not-foud">
      <h1 className="not-found__heading">404 Page not found</h1>
    </div>
  );
};

export default NotFound;
