import React, { Component } from "react";
import Radium from "radium";

@Radium
class Viewer extends Component {

  render() {
    return <div style={styles.base}>Hello, this is your new TV</div>;
  }

}

const styles = {
  base: {
    flexGrow: 2
  }
}

export default Viewer
