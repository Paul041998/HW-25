import React, { Component } from "react";
export default class SmileCard extends Component {
  render() {
    const { emoji, votes, onVote } = this.props;

    return (
      <div className="smile-card">
        <span className="emoji">{emoji}</span>
        <div className="vote-section">
          <div className="votes">{votes}</div>
          <button onClick={onVote} className="vote-btn">
            👍
          </button>
        </div>
      </div>
    );
  }
}
