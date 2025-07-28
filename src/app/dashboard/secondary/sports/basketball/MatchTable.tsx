"use client";

import { useState } from 'react';
import { Trophy, Target, Award, Zap, Check } from 'lucide-react';

const teams = ["Falcons", "Vultures", "Ravens", "Eagles"];

type Match = {
    teamA: string;
    teamB: string;
    scoreA: number | "";
    scoreB: number | "";
    isSubmitted: boolean;
};

const generateMatches = (teamList: string[]): Match[] => {
    return teamList.flatMap((teamA, i) => 
        teamList.slice(i + 1).map(teamB => ({
            teamA,
            teamB,
            scoreA: '',
            scoreB: '',
            isSubmitted: false
        }))
    );
};

export default function BasketballTable() {
    const [matches, setMatches] = useState<Match[]>(generateMatches(teams));

    const updateScore = (index: number, field: "scoreA" | "scoreB", value: number | "") => {
        const updated = [...matches];
        if (!updated[index].isSubmitted) {
            updated[index][field] = value;
            setMatches(updated);
        }
    };

    const submitScore = (index: number) => {
        const updated = [...matches];
        if (updated[index].scoreA !== "" && updated[index].scoreB !== "") {
            updated[index].isSubmitted = true;
            setMatches(updated);
        }
    };

    const completedMatches = matches.filter(m => m.isSubmitted).length;
    const totalMatches = matches.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-purple-50 p-4">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4 shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                        Basketball League
                    </h1>
                    <p className="text-gray-600 text-sm">Record your game scores</p>
                    
                    {/* Progress */}
                    <div className="mt-4 bg-white rounded-xl p-1 shadow-sm">
                        <div className="flex items-center justify-between text-xs text-gray-600 px-3 py-1">
                            <span>Games Completed</span>
                            <span className="font-medium">{completedMatches}/{totalMatches}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="mt-1 mb-2 bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${(completedMatches / totalMatches) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Matches */}
                <div className="space-y-4">
                    {matches.map((match, idx) => (
                        <div
                            key={`${match.teamA}-vs-${match.teamB}`}
                            className={`relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                                match.isSubmitted 
                                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg' 
                                    : 'bg-white border-2 border-gray-100 shadow-md hover:shadow-xl'
                            }`}
                        >
                            {/* Game Header */}
                            <div className="px-5 py-4">
                                <div className="flex items-center justify-center mb-4">
                                    <Zap className="w-4 h-4 text-orange-500 mr-2" />
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Game {idx + 1}
                                    </span>
                                    {match.isSubmitted && (
                                        <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Teams Display */}
                                <div className="text-center mb-6">
                                    <div className="flex items-center justify-center space-x-4">
                                        <div className="flex-1">
                                            <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg p-3 mb-2">
                                                <div className="text-lg font-bold text-orange-800">{match.teamA}</div>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-gray-100 rounded-full">
                                            <span className="text-sm font-bold text-gray-600">VS</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-gradient-to-r from-red-100 to-red-200 rounded-lg p-3 mb-2">
                                                <div className="text-lg font-bold text-red-800">{match.teamB}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Score Input Section */}
                                <div className="mb-5">
                                    <div className="text-center text-sm font-medium text-gray-600 mb-3">Final Score</div>
                                    <div className="flex items-center justify-center space-x-6">
                                        <div className="text-center">
                                            <div className="text-xs text-gray-500 mb-1">{match.teamA}</div>
                                            <input
                                                type="number"
                                                value={match.scoreA}
                                                disabled={match.isSubmitted}
                                                onChange={(e) =>
                                                    updateScore(idx, "scoreA", parseInt(e.target.value) || "")
                                                }
                                                className={`w-20 h-16 text-2xl font-bold text-center border-2 rounded-xl transition-all ${
                                                    match.isSubmitted 
                                                        ? 'bg-green-50 border-green-200 text-green-700' 
                                                        : 'bg-white border-orange-200 text-orange-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                                                } outline-none`}
                                                placeholder="0"
                                                min="0"
                                                max="200"
                                            />
                                        </div>
                                        
                                        <div className="text-3xl font-bold text-gray-400">-</div>
                                        
                                        <div className="text-center">
                                            <div className="text-xs text-gray-500 mb-1">{match.teamB}</div>
                                            <input
                                                type="number"
                                                value={match.scoreB}
                                                disabled={match.isSubmitted}
                                                onChange={(e) =>
                                                    updateScore(idx, "scoreB", parseInt(e.target.value) || "")
                                                }
                                                className={`w-20 h-16 text-2xl font-bold text-center border-2 rounded-xl transition-all ${
                                                    match.isSubmitted 
                                                        ? 'bg-green-50 border-green-200 text-green-700' 
                                                        : 'bg-white border-red-200 text-red-600 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                                } outline-none`}
                                                placeholder="0"
                                                min="0"
                                                max="200"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button or Status */}
                                {!match.isSubmitted ? (
                                    <button
                                        onClick={() => submitScore(idx)}
                                        disabled={match.scoreA === "" || match.scoreB === ""}
                                        className={`w-full py-3 rounded-xl font-semibold text-white transition-all transform active:scale-95 ${
                                            match.scoreA !== "" && match.scoreB !== ""
                                                ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl'
                                                : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                    >
                                        Record Final Score
                                    </button>
                                ) : (
                                    <div className="text-center py-3">
                                        <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
                                            <Check className="w-4 h-4 mr-2" />
                                            Game Complete
                                        </span>
                                        {/* Winner Display */}
                                        {match.scoreA !== "" && match.scoreB !== "" && (
                                            <div className="mt-2 text-sm">
                                                {match.scoreA > match.scoreB ? (
                                                    <span className="text-orange-600 font-semibold">🏆 {match.teamA} Wins!</span>
                                                ) : match.scoreB > match.scoreA ? (
                                                    <span className="text-red-600 font-semibold">🏆 {match.teamB} Wins!</span>
                                                ) : (
                                                    <span className="text-gray-600 font-semibold">🤝 It's a Tie!</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Completion Message */}
                {completedMatches === totalMatches && (
                    <div className="mt-8 text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-orange-200 animate-bounce">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Award className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-orange-700 mb-1">League Complete! 🏀</h3>
                        <p className="text-sm text-orange-600">All games have been recorded</p>
                    </div>
                )}
            </div>
        </div>
    );
}