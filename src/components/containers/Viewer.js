import React, { Component, PropTypes } from "react";
import { Map } from "immutable";
import Radium from "radium";
import { connect } from "react-redux";

@Radium
class Viewer extends Component {

  static propTypes = {
    ui: PropTypes.instanceOf(Map)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ui.get("selected")) {
      this.refs.player.load();
    }
  }

  render() {
    if (this.props.ui.get("selected")) {
      return (
        <div style={styles.base}>
          <video ref="player" controls autoPlay>
            <source src={this.props.ui.get("selected").get("uri")} />
          </video>
        </div>
      );

    } else {
      return <div style={styles.base}>Hello, this is your new TV</div>;
    }
  }

}

const styles = {
  base: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}

export default connect((s) => s)(Viewer)
