import React, { Component, PropTypes } from "react";
import Radium from "radium";
import ChannelList from "./containers/ChannelList";
import Viewer from "./containers/Viewer";
import { connect } from "react-redux";
import { downloadPlaylist } from "../actions/channelActions";

@Radium
class App extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (this.props.location.query.playlist) {
      this.props.dispatch(downloadPlaylist(this.props.location.query.playlist));
    }
  }

  render() {
    return (
      <div style={styles.base}>
        <ChannelList />
        <Viewer />
      </div>
    );
  }

}

export default connect()(App);

const styles = {
  base: {
    display: "flex",
    height: "100%"
  }
}
