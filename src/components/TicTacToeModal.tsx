import React, { useState } from 'react';
import { X, RefreshCw, Cpu, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface TicTacToeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Player = 'X' | 'O' | null;

export const TicTacToeModal: React.FC<TicTacToeModalProps> = ({ isOpen, onClose }) => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [status, setStatus] = useState<string>('Your turn (Player X)');
  const [gameOver, setGameOver] = useState<boolean>(false);

  if (!isOpen) return null;

  const checkWinner = (squares: Player[]): Player | 'Draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every((sq) => sq !== null)) {
      return 'Draw';
    }
    return null;
  };

  // Minimax algorithm implementation for AI (Player O)
  const minimax = (squares: Player[], depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(squares);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (winner === 'Draw') return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'O';
          const evalVal = minimax(squares, depth + 1, false);
          squares[i] = null;
          maxEval = Math.max(maxEval, evalVal);
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'X';
          const evalVal = minimax(squares, depth + 1, true);
          squares[i] = null;
          minEval = Math.min(minEval, evalVal);
        }
      }
      return minEval;
    }
  };

  const findBestMove = (squares: Player[]): number => {
    let bestVal = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        squares[i] = 'O';
        const moveVal = minimax(squares, 0, false);
        squares[i] = null;
        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }
    return bestMove;
  };

  const handleSquareClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner === 'X') {
      setStatus('Congratulations! Player X Won!');
      setGameOver(true);
      return;
    } else if (winner === 'Draw') {
      setStatus('Game ended in a Draw!');
      setGameOver(true);
      return;
    }

    // AI move via Minimax
    setStatus('Minimax AI calculating move...');
    setTimeout(() => {
      const aiMove = findBestMove(newBoard);
      if (aiMove !== -1) {
        newBoard[aiMove] = 'O';
        setBoard(newBoard);
        const winnerAfterAI = checkWinner(newBoard);
        if (winnerAfterAI === 'O') {
          setStatus('Minimax AI (O) Won! Optimal decision path.');
          setGameOver(true);
        } else if (winnerAfterAI === 'Draw') {
          setStatus('Game ended in a Draw!');
          setGameOver(true);
        } else {
          setStatus('Your turn (Player X)');
        }
      }
    }, 250);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setStatus('Your turn (Player X)');
    setGameOver(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-[28px] border border-[#C5A059]/40 shadow-2xl overflow-hidden flex flex-col text-[#2C221E]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DFD5] bg-[#F4ECE3]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#58111A] text-[#DFB86C] flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#58111A] font-serif">Tic-Tac-Toe Game</h3>
              <p className="text-xs text-[#6E5D54]">Minimax Algorithm • Optimal AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6E5D54] hover:text-[#58111A] hover:bg-[#E8DFD5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center space-y-5">
          {/* Status badge */}
          <div className="px-4 py-2 rounded-xl bg-[#F9F6F0] border border-[#E8DFD5] text-xs font-medium text-[#58111A] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>{status}</span>
          </div>

          {/* 3x3 Board */}
          <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-[#F4ECE3] border border-[#E8DFD5] w-64 h-64">
            {board.map((val, idx) => (
              <button
                key={idx}
                onClick={() => handleSquareClick(idx)}
                className={`w-full h-full rounded-xl text-2xl font-bold font-serif transition-all flex items-center justify-center cursor-pointer ${
                  val === 'X'
                    ? 'text-[#58111A] bg-[#FFFDF9] border-2 border-[#58111A] shadow-xs'
                    : val === 'O'
                    ? 'text-[#C5A059] bg-[#FFFDF9] border-2 border-[#C5A059] shadow-xs'
                    : 'bg-[#FFFDF9]/60 hover:bg-[#FFFDF9] text-transparent border border-[#E8DFD5]'
                }`}
              >
                {val || '-'}
              </button>
            ))}
          </div>

          {/* Restart control */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleRestart}
              className="px-4 py-2 rounded-xl bg-[#58111A] hover:bg-[#7A1828] text-xs font-semibold text-white flex items-center gap-2 transition-colors cursor-pointer border border-[#C5A059]/40"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#DFB86C]" />
              <span>Restart Game</span>
            </button>
          </div>

          {/* Architecture notes strictly from prompt */}
          <div className="w-full p-4 rounded-xl bg-[#F9F6F0] border border-[#E8DFD5] text-xs text-[#6E5D54] space-y-1.5 font-sans">
            <div className="flex items-center gap-2 text-[#58111A] font-bold mb-1 font-serif">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Algorithm Specs</span>
            </div>
            <p>• Minimax decision engine explores complete game tree</p>
            <p>• Automatic AI response evaluates all 8 winning combinations</p>
            <p>• Built in Python with Tkinter GUI & optimal strategy</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F4ECE3] border-t border-[#E8DFD5] flex items-center justify-between text-xs text-[#6E5D54]">
          <span>Python • Minimax • Tkinter</span>
          <a
            href="https://github.com/erenyfrhedra"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#58111A] font-semibold hover:underline"
          >
            <span>View on GitHub</span>
            <ExternalLink className="w-3 h-3 text-[#C5A059]" />
          </a>
        </div>
      </div>
    </div>
  );
};
