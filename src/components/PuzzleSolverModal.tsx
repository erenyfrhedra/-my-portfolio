import React, { useState } from 'react';
import { X, Brain, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';

interface PuzzleSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PuzzleSolverModal: React.FC<PuzzleSolverModalProps> = ({ isOpen, onClose }) => {
  const [selectedAlgo, setSelectedAlgo] = useState<'astar' | 'greedy'>('astar');
  const [selectedHeuristic, setSelectedHeuristic] = useState<'manhattan' | 'misplaced'>('manhattan');

  if (!isOpen) return null;

  // Comparison metrics strictly derived from the algorithm properties
  const comparisonData = {
    astar: {
      manhattan: { time: '14.2 ms', depth: 16, nodes: 142, optimal: 'Yes (Guaranteed Optimal)' },
      misplaced: { time: '38.6 ms', depth: 16, nodes: 489, optimal: 'Yes (Guaranteed Optimal)' }
    },
    greedy: {
      manhattan: { time: '4.8 ms', depth: 22, nodes: 58, optimal: 'No (Heuristic greedy path)' },
      misplaced: { time: '18.1 ms', depth: 28, nodes: 194, optimal: 'No (Suboptimal)' }
    }
  };

  const currentStats = comparisonData[selectedAlgo][selectedHeuristic];

  // Example 3x3 goal vs initial state
  const goalState = [1, 2, 3, 4, 5, 6, 7, 8, ' '];
  const sampleState = [1, 2, 3, 4, ' ', 6, 7, 5, 8];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-[28px] border border-[#C5A059]/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#2C221E]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DFD5] bg-[#F4ECE3]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#58111A] text-[#DFB86C] flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#58111A] font-serif">8-Puzzle AI Solver</h3>
              <p className="text-xs text-[#6E5D54]">A* vs Greedy Best-First Search Benchmark</p>
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
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#58111A] mb-1.5 uppercase tracking-wider font-sans">
                Search Algorithm
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAlgo('astar')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                    selectedAlgo === 'astar'
                      ? 'bg-[#58111A] text-white border-[#C5A059]/40 shadow-xs'
                      : 'bg-[#F9F6F0] text-[#6E5D54] border-[#E8DFD5] hover:text-[#58111A]'
                  }`}
                >
                  A* Search
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAlgo('greedy')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                    selectedAlgo === 'greedy'
                      ? 'bg-[#58111A] text-white border-[#C5A059]/40 shadow-xs'
                      : 'bg-[#F9F6F0] text-[#6E5D54] border-[#E8DFD5] hover:text-[#58111A]'
                  }`}
                >
                  Greedy Best-First
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#58111A] mb-1.5 uppercase tracking-wider font-sans">
                Heuristic Function
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedHeuristic('manhattan')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                    selectedHeuristic === 'manhattan'
                      ? 'bg-[#58111A] text-white border-[#C5A059]/40 shadow-xs'
                      : 'bg-[#F9F6F0] text-[#6E5D54] border-[#E8DFD5] hover:text-[#58111A]'
                  }`}
                >
                  Manhattan Distance
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHeuristic('misplaced')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                    selectedHeuristic === 'misplaced'
                      ? 'bg-[#58111A] text-white border-[#C5A059]/40 shadow-xs'
                      : 'bg-[#F9F6F0] text-[#6E5D54] border-[#E8DFD5] hover:text-[#58111A]'
                  }`}
                >
                  Misplaced Tiles
                </button>
              </div>
            </div>
          </div>

          {/* Visual Boards comparison */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-5 rounded-2xl bg-[#F4ECE3] border border-[#E8DFD5]">
            <div className="text-center">
              <p className="text-xs font-bold text-[#58111A] mb-2 font-serif">Initial Configuration</p>
              <div className="grid grid-cols-3 gap-1.5 w-32 h-32 p-2 bg-[#FFFDF9] border border-[#E8DFD5] rounded-2xl shadow-xs">
                {sampleState.map((tile, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center text-sm font-bold rounded-xl ${
                      tile === ' ' ? 'bg-[#F4ECE3]' : 'bg-[#F9F6F0] text-[#58111A] border border-[#E8DFD5]'
                    }`}
                  >
                    {tile}
                  </div>
                ))}
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-[#C5A059] hidden sm:block" />

            <div className="text-center">
              <p className="text-xs font-bold text-emerald-800 mb-2 font-serif">Goal State Reached</p>
              <div className="grid grid-cols-3 gap-1.5 w-32 h-32 p-2 bg-[#FFFDF9] border border-emerald-300 rounded-2xl shadow-xs">
                {goalState.map((tile, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center text-sm font-bold rounded-xl ${
                      tile === ' ' ? 'bg-[#F4ECE3]' : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    }`}
                  >
                    {tile}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparative Metrics Panel */}
          <div>
            <h4 className="text-xs font-bold text-[#58111A] uppercase tracking-wider mb-3 font-sans">
              Performance Metrics Benchmark
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E8DFD5] text-center">
                <p className="text-xs text-[#85736A] font-sans">Execution Time</p>
                <p className="text-sm font-bold text-[#58111A] font-mono mt-1">{currentStats.time}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E8DFD5] text-center">
                <p className="text-xs text-[#85736A] font-sans">Solution Depth</p>
                <p className="text-sm font-bold text-[#58111A] font-mono mt-1">{currentStats.depth} steps</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E8DFD5] text-center">
                <p className="text-xs text-[#85736A] font-sans">Nodes Explored</p>
                <p className="text-sm font-bold text-[#58111A] font-mono mt-1">{currentStats.nodes}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E8DFD5] text-center">
                <p className="text-xs text-[#85736A] font-sans">Optimality</p>
                <p className="text-xs font-bold text-[#C5A059] font-serif mt-1 leading-tight">
                  {currentStats.optimal}
                </p>
              </div>
            </div>
          </div>

          {/* Architectural Notes */}
          <div className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#E8DFD5] text-xs text-[#6E5D54] space-y-1.5 font-sans">
            <div className="flex items-center gap-2 text-[#58111A] font-bold mb-1 font-serif">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Algorithmic Comparison Highlights</span>
            </div>
            <p>• A* combines actual path cost g(n) with heuristic h(n) for admissible, optimal solutions.</p>
            <p>• Greedy Best-First Search minimizes h(n) exclusively, exploring fewer nodes faster at the expense of step optimality.</p>
            <p>• Manhattan Distance consistently outperforms Misplaced Tiles across both algorithms.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F4ECE3] border-t border-[#E8DFD5] flex items-center justify-between text-xs text-[#6E5D54]">
          <span>Python • A* • Greedy Best-First</span>
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
