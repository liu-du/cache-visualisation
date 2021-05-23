import React from "react";
import PropTypes from "prop-types";

import * as vega from "vega";
import vegaEmbed from "vega-embed";

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  enableHover: PropTypes.bool,
  height: PropTypes.number,
  padding: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
  }),
  renderer: PropTypes.oneOf(["svg", "canvas"]),
  spec: PropTypes.object.isRequired,
  width: PropTypes.string,
};

const defaultProps = {
  className: "",
  data: [],
  enableHover: true,
  height: undefined,
  padding: undefined,
  renderer: "svg",
  width: undefined,
  view: null
};

class Renderer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.rendererRef = React.createRef();
  }

  render() {
    return (
      <div className="App" style={{width: this.props.width, float: this.props.position}}>
        <div ref={this.rendererRef} className={this.props.className} />
      </div>
    );
  }

  modifyData(tuple, field, value) {
    this.view
      .change("table", 
        vega
          .changeset()
          .modify(tuple, field, value)
      )
      .run();
  }

  componentDidMount() {
    vegaEmbed(this.rendererRef.current, this.props.spec, {
      hover: this.props.enableHover,
      renderer: this.props.renderer,
    })
      .then((result) => {
        this.view = result.view;
        console.log(this.view);
        this.view.run();
      });
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate!!!");
  }

  componentWillUnmount() {
    if (this.view) {
      this.view.finalize();
    }
  }
}

Renderer.propTypes = propTypes;
Renderer.defaultProps = defaultProps;

export default Renderer;
