import React, { Component, PropTypes } from "react";
import { List } from "immutable";
import { connect } from "react-redux";
import * as channelActions from "../../actions/channelActions";
import Radium from "radium";
import Channel from "../channels/Channel";
import Dropzone from "react-dropzone";
import m3u8 from "m3u8";
import fileReaderStream from "filereader-stream";

@Radium
class ChannelList extends Component {

  static propTypes = {
    channels: PropTypes.instanceOf(List).isRequired,
    loadPlaylist: PropTypes.func.isRequired,
    selectChannel: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.renderChannels = this.renderChannels.bind(this);
  }

  onDrop(files) {
    const parser = m3u8.createStream();
    fileReaderStream(files[0]).pipe(parser);
    parser.on("m3u", (m3u) => this.props.loadPlaylist(m3u));
  }

  renderDropzone() {
    return (
      <Dropzone onDrop={this.onDrop} multiple={false}>
        <div>Drop a playlist here</div>
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
  },
  list: {
    // display: "flex"
  }
}

export default connect((e) => e, channelActions)(ChannelList);
