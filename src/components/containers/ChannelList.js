import React, { Component, PropTypes } from "react";
import { List } from "immutable";
import { connect } from "react-redux";
import * as channelActions from "../../actions/channelActions";
import Radium from "radium";
import Channel from "../channels/Channel";
import Dropzone from "react-dropzone";

@Radium
class ChannelList extends Component {

  static propTypes = {
    channels: PropTypes.instanceOf(List).isRequired,
    loadPlaylistFromFile: PropTypes.func.isRequired,
    selectChannel: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.renderChannels = this.renderChannels.bind(this);
  }

  onDrop(files) {
    this.props.loadPlaylistFromFile(files[0]);
  }

  renderDropzone() {
    return (
      <Dropzone
        multiple={false}
        onDrop={this.onDrop}
        style={styles.dropzone}
      >
      <p style={styles.text}>Drop a playlist or click here<br />to load channels.</p>
      </Dropzone>
    );
  }

  renderChannels() {
    return (
      <ul style={styles.list}>{
        this.props.channels.map(
        (channel, i) => <Channel
          channel={channel}
          key={i}
          selectChannel={this.props.selectChannel}
        />
        )
      }</ul>
    );
  }

  render() {
    return (
      <div style={styles.base}>
        {this.props.channels.size > 0 ? this.renderChannels() : this.renderDropzone()}
      </div>
    );
  }

}

const styles = {
  base: {
    // flexGrow: 1
    display: "flex"
  },
  list: {
    // display: "flex"
  },
  dropzone: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#666",
    borderStyle: "dashed",
    borderRadius: 5,
  },
  text: {
    textAlign: "center"
  }
}

export default connect((e) => e, channelActions)(ChannelList);
