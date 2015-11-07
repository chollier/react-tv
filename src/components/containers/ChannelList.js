import React, { Component } from "react";
import Radium from "radium";

@Radium
class ChannelList extends Component {

  render() {
    return (
      <div style={styles.base}>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    );
  }

}

const styles = {
  base: {
    flexGrow: 1
  }
}

export default ChannelList
