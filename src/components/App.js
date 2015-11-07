import React, { Component } from "react";
import Radium from "radium";
import ChannelList from "./containers/ChannelList";
import Viewer from "./containers/Viewer";

@Radium
export default class App extends Component {

  render() {
    return (
      <div style={styles.base}>
        <ChannelList />
        <Viewer />
      </div>
    );
  }

}

const styles = {
  base: {
    display: "flex"
  }
}
