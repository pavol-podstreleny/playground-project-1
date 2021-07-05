import "./overlay.css";

export interface OverlayProps {}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return <section id="overlay">{children}</section>;
};

export default Overlay;
