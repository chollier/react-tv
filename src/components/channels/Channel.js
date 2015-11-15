import React, { Component, PropTypes } from "react";
import { Map } from "immutable";

export default class Channel extends Component {

  static propTypes = {
    channel: PropTypes.instanceOf(Map).isRequired,
    selectChannel: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.props.selectChannel(this.props.channel);
  }

  render() {
    const { channel } = this.props;
    return <li onClick={this.onClick}>{channel.get("title")}</li>;
  }

}

