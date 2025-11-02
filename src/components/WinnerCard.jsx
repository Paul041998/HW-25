import React, { Component } from "react";

export default class WinnerCard extends Component {
  render() {
    const { winner } = this.props;

    return (
      <div className="winner">
        <h2> Winner</h2>
        <p className="winner-emoji">{winner.emoji}</p>
        <p>Votes: {winner.votes}</p>
      </div>
    );
  }
}
