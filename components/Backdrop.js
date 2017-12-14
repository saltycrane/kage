/* @flow */
import * as React from "react";

type Props = {|
  onClick?: Function,
  show: boolean,
  style?: Object,
|};

type State = {|
  mounted: boolean,
  opacity: number,
|};

export default class Backdrop extends React.Component<Props, State> {
  state = { mounted: false, opacity: 0 };
  DURATION = 300;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.show !== this.props.show) {
      if (nextProps.show) {
        this.setState({ mounted: true, opacity: 0 });
        window.setTimeout(() => {
          this.setState({ opacity: 0.4 });
        }, 0);
      } else {
        this.setState({ opacity: 0 });
        window.setTimeout(() => {
          this.setState({ mounted: false });
        }, this.DURATION);
      }
    }
  }

  render() {
    const { onClick, style = {} } = this.props;
    const { mounted, opacity } = this.state;

    if (!mounted) {
      return null;
    }

    return (
      <div
        onClick={onClick}
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#000",
          opacity,
          transition: `opacity ${this.DURATION}ms`,
          zIndex: 1,
          ...style,
        }}
      />
    );
  }
}
