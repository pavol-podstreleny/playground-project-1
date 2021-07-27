import React from "react";
import { WidthContext } from "../../context/widthContext";

interface WithPixelState {
  width: number;
}

export default function withPixelWidth<P extends object>(
  Component: React.ComponentType<P>
) {
  return class WithPixelWidth extends React.Component<P, WithPixelState> {
    constructor(props: P) {
      super(props);
      this.state = {
        width: 0,
      };
    }

    handleResize = () => {
      const currentDiv = this.divRef.current;
      if (currentDiv) this.setState({ width: currentDiv.offsetWidth });
    };

    divRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
      if (this.divRef.current)
        this.setState({ width: this.divRef.current.offsetWidth });
      window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
      window.addEventListener("resize", this.handleResize);
    }

    render() {
      const { ...props } = this.props;
      return (
        <div ref={this.divRef}>
          <WidthContext.Provider value={this.state.width}>
            <Component {...(props as P)} />
          </WidthContext.Provider>
        </div>
      );
    }
  };
}
