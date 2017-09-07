import React from 'react';
import { Board } from './board';

export class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xPlay: true,
            step: 0
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.step + 1);
        const current = history[history.length - 1];

        let squares = current.squares.slice(0);

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xPlay ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares
            }]),
            xPlay: !this.state.xPlay,
            step: history.length
        });
    }

    jumpTo(i) {
        this.setState({
            step: i,
            xPlay: (i % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.step];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xPlay ? 'X' : 'O'}`;
        }

        const moves = history.map((step, i) => {
            const desc = i === 0 ? 'Game start' : `Move #${i}`;
            return (
                <li key={i}>
                    <a href="#" className={i === this.state.step ? 'current-step' : ''} onClick={() => this.jumpTo(i)}>{desc}</a>
                </li>
            );
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}