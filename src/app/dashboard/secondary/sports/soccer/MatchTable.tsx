"use client";

import { useState } from "react";
import { Check, Trophy, Users } from "lucide-react";

const teams = ["Falcons", "Ravens", "Eagles", "Vultures"];

type Match = {
    teamA: string;
    teamB: string;
    scoreA: number | "";
    scoreB: number | "";
    isSubmitted: boolean;
};

function generateMatches(teamList: string[]): Match[] {
    const matches: Match[] = [];
    for (let i = 0; i < teamList.length; i++) {
        for (let j = i + 1; j < teamList.length; j++) {
            matches.push({
                teamA: teamList[i],
                teamB: teamList[j],
                scoreA: "",
                scoreB: "",
                isSubmitted: false,  
            })
        }
    }
    return matches
}

export default function MatchTable() {
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                        <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Soccer Matches
                    </h1>
                    <p className="text-gray-600 text-sm">Record match results</p>
                    
                    {/* Progress */}
                    <div className="mt-4 bg-white rounded-xl p-1 shadow-sm">
                        <div className="flex items-center justify-between text-xs text-gray-600 px-3 py-1">
                            <span className="">Progress</span>
                            <span className="font-medium">{completedMatches}/{totalMatches}</span>
                        </div>
                        <div className="mb-2 mt-1 w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
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
                            {/* Match Header */}
                            <div className="px-5 py-4">
                                <div className="flex items-center justify-center mb-4">
                                    <Users className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Match {idx + 1}
                                    </span>
                                    {match.isSubmitted && (
                                        <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Teams */}
                                <div className="text-center mb-6">
                                    <div className="flex items-center justify-center space-x-4">
                                        <div className="flex-1 text-right">
                                            <div className="text-lg font-bold text-gray-800">{match.teamA}</div>
                                        </div>
                                        <div className="px-3 py-1 bg-gray-100 rounded-full">
                                            <span className="text-sm font-medium text-gray-600">VS</span>
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="text-lg font-bold text-gray-800">{match.teamB}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Score Input */}
                                <div className="flex items-center justify-center space-x-3 mb-5">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={match.scoreA}
                                            disabled={match.isSubmitted}
                                            onChange={(e) =>
                                                updateScore(idx, "scoreA", parseInt(e.target.value) || "")
                                            }
                                            className={`w-16 h-16 text-2xl font-bold text-center border-2 rounded-xl transition-all ${
                                                match.isSubmitted 
                                                    ? 'bg-green-50 border-green-200 text-green-700' 
                                                    : 'bg-white border-blue-200 text-blue-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                                            } outline-none`}
                                            placeholder="0"
                                            min="0"
                                            max="99"
                                        />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-400">-</div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={match.scoreB}
                                            disabled={match.isSubmitted}
                                            onChange={(e) =>
                                                updateScore(idx, "scoreB", parseInt(e.target.value) || "")
                                            }
                                            className={`w-16 h-16 text-2xl font-bold text-center border-2 rounded-xl transition-all ${
                                                match.isSubmitted 
                                                    ? 'bg-green-50 border-green-200 text-green-700' 
                                                    : 'bg-white border-blue-200 text-blue-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                                            } outline-none`}
                                            placeholder="0"
                                            min="0"
                                            max="99"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                {!match.isSubmitted ? (
                                    <button
                                        onClick={() => submitScore(idx)}
                                        disabled={match.scoreA === "" || match.scoreB === ""}
                                        className={`w-full py-3 rounded-xl font-semibold text-white transition-all transform active:scale-95 ${
                                            match.scoreA !== "" && match.scoreB !== ""
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                                : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                    >
                                        Submit Score
                                    </button>
                                ) : (
                                    <div className="text-center py-3">
                                        <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
                                            <Check className="w-4 h-4 mr-2" />
                                            Score Recorded
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                {completedMatches === totalMatches && (
                    <div className="mt-8 text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-green-700 mb-1">All Matches Complete!</h3>
                        <p className="text-sm text-green-600">Great job recording all the results</p>
                    </div>
                )}
            </div>
        </div>
    );
}