import React, { Component } from "react";
import SmileCard from "./components/SmileCard";
import WinnerCard from "./components/WinnerCard";
import "./App.css";

export default class SmileVoteApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smiles: [
        { id: 1, emoji: "😀", votes: 0 },
        { id: 2, emoji: "😂", votes: 0 },
        { id: 3, emoji: "😍", votes: 0 },
        { id: 4, emoji: "🤩", votes: 0 },
      ],
      winner: null,
    };
  }

  componentDidMount() {
    const savedSmiles = localStorage.getItem("smileVotes");
    if (savedSmiles) {
      this.setState({ smiles: JSON.parse(savedSmiles) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.smiles !== this.state.smiles) {
      localStorage.setItem("smileVotes", JSON.stringify(this.state.smiles));
    }
  }

  handleVote = (id) => {
    this.setState((prevState) => ({
      smiles: prevState.smiles.map((s) =>
        s.id === id ? { ...s, votes: s.votes + 1 } : s
      ),
    }));
  };

  showResults = () => {
    const { smiles } = this.state;
    const max = Math.max(...smiles.map((s) => s.votes));
    const topSmile = smiles.find((s) => s.votes === max);
    this.setState({ winner: topSmile });
  };

  clearResults = () => {
    const resetSmiles = this.state.smiles.map((s) => ({
      ...s,
      votes: 0,
    }));

    this.setState({ smiles: resetSmiles, winner: null });

    localStorage.removeItem("smileVotes");
  };

  render() {
    const { smiles, winner } = this.state;

    return (
      <div className="app">
        <h1>😄 Голосуй за кращий смайл</h1>

        <div className="smile-list">
          {smiles.map((smile) => (
            <SmileCard
              key={smile.id}
              emoji={smile.emoji}
              votes={smile.votes}
              onVote={() => this.handleVote(smile.id)}
            />
          ))}
        </div>

        <div className="buttons">
          <button className="show-btn" onClick={this.showResults}>
            Показати результати
          </button>
          <button className="clear-btn" onClick={this.clearResults}>
            Очистити результати
          </button>
        </div>

        {winner && <WinnerCard winner={winner} />}
      </div>
    );
  }
}
