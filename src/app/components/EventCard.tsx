"use client";

import { useState } from "react";

const teams = ["Falcons", "Ravens", "Eagles", "Vultures"];

interface EventCardProps {
    ageGroup: string;
    gender: string;
    distance: string;
}

export default function EventCard({ ageGroup, gender, distance }: EventCardProps) {
    const [results, setResults] = useState(
        Array(8).fill({ team: "", runner: "", time: "" })
    );
    const [submitted, setSubmitted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleChange = (index: number, field: string, value: string) => {
        const newResults = [...results];
        newResults[index] = {
            ...newResults[index],
            [field]: value,
        };
        setResults(newResults);
    };

    const handleSubmit = () => {
        console.log(`Submitting for ${ageGroup} - ${distance}:`, results);
        setSubmitted(true);
    };

    const handleToggle = () => {
        setSubmitted(!submitted);
    };

    const hasData = results.some(entry => entry.team || entry.runner || entry.time);

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 mx-4 max-w-4xl lg:mx-auto border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">
                            {ageGroup} - {gender}
                        </h3>
                        <p className="text-blue-100 text-sm">{distance} Race</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="sm:hidden bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-all"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? "Collapse" : "Expand"}
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                submitted 
                                    ? "bg-amber-500 hover:bg-amber-600 text-white" 
                                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                            }`}
                            onClick={handleToggle}
                        >
                            {submitted ? "📝 Edit" : "✅ Done"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className={`${!isExpanded ? 'hidden sm:block' : 'block'}`}>
                {/* Desktop Table View */}
                <div className="hidden md:block p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b-2 border-gray-200">
                                    <th className="p-3 text-left font-semibold text-gray-700">Pos</th>
                                    <th className="p-3 text-left font-semibold text-gray-700">Team</th>
                                    <th className="p-3 text-left font-semibold text-gray-700">Runner</th>
                                    <th className="p-3 text-left font-semibold text-gray-700">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((entry, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="p-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">
                                                {index + 1}
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <select
                                                className="border-2 border-gray-200 rounded-lg p-2 w-full focus:border-blue-500 focus:outline-none transition-colors"
                                                value={entry.team}
                                                onChange={(e) =>
                                                    handleChange(index, "team", e.target.value)
                                                }
                                                disabled={submitted}
                                            >
                                                <option value="">Select team</option>
                                                {teams.map((team) => (
                                                    <option key={team} value={team}>
                                                        {team}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                className="border-2 border-gray-200 rounded-lg p-2 w-full focus:border-blue-500 focus:outline-none transition-colors"
                                                placeholder="Runner name"
                                                value={entry.runner}
                                                onChange={(e) => 
                                                    handleChange(index, "runner", e.target.value)
                                                }
                                                disabled={submitted}
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                className="border-2 border-gray-200 rounded-lg p-2 w-full focus:border-blue-500 focus:outline-none transition-colors"
                                                placeholder="mm:ss"
                                                value={entry.time}
                                                onChange={(e) => 
                                                    handleChange(index, "time", e.target.value)
                                                }
                                                disabled={submitted}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden p-4 space-y-4">
                    {results.map((entry, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-lg">
                                    {index + 1}
                                </div>
                                <h4 className="font-semibold text-gray-700">Position {index + 1}</h4>
                            </div>
                            
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Team</label>
                                    <select
                                        className="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none transition-colors"
                                        value={entry.team}
                                        onChange={(e) =>
                                            handleChange(index, "team", e.target.value)
                                        }
                                        disabled={submitted}
                                    >
                                        <option value="">Select team</option>
                                        {teams.map((team) => (
                                            <option key={team} value={team}>
                                                {team}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Runner Name</label>
                                    <input
                                        type="text"
                                        className="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="Enter runner name"
                                        value={entry.runner}
                                        onChange={(e) => 
                                            handleChange(index, "runner", e.target.value)
                                        }
                                        disabled={submitted}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Time</label>
                                    <input
                                        type="text"
                                        className="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-blue-500 focus:outline-none transition-colors"
                                        placeholder="mm:ss (e.g. 02:35)"
                                        value={entry.time}
                                        onChange={(e) => 
                                            handleChange(index, "time", e.target.value)
                                        }
                                        disabled={submitted}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                {!submitted && (
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                        <button
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                            onClick={handleSubmit}
                        >
                            🏁 Submit Results
                        </button>
                    </div>
                )}

                {/* Status indicator */}
                {submitted && (
                    <div className="p-4 bg-green-50 border-t border-green-200">
                        <div className="flex items-center justify-center gap-2 text-green-700">
                            <span className="text-lg">✅</span>
                            <span className="font-medium">Results submitted successfully!</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

