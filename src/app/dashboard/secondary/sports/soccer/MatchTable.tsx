"use client";

import { useState } from "react";

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

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Soccer Match Recordings</h2>
            <div className="space-y-4">
                {matches.map((match, idx) => (
                    <div
                        key={`${match.teamA}-vs-${match.teamB}`}
                        className="flex item-center justify-between bg-white shadow px-4 py-3 rounded-md"
                    >
                        <div className="font-medium text-grey-700">
                            {match.teamA} vs {match.teamB}
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={match.scoreA}
                                disabled={match.isSubmitted}
                                onChange={(e) =>
                                    updateScore(idx, "scoreA", parseInt(e.target.value) || "")
                                }
                                className="w-12 text-center border rounded-md px-1 py-1"
                            />
                            <span className="text-grey-500">-</span>
                            <input
                                type="number"
                                value={match.scoreB}
                                disabled={match.isSubmitted}
                                onChange={(e) =>
                                    updateScore(idx, "scoreB", parseInt(e.target.value) || "")
                                }
                                className="w-12 text-center border rounded-md px-1 py-1"
                            />
                            {!match.isSubmitted ? (
                                <button
                                    onClick={() => submitScore(idx)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                                >
                                    submit

                                </button>
                            ) : ( 
                              <span className="text-green-600 font-medium ml-2">Done</span>     
                            )}

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}