"use client";

import { useState } from "react";

const teams = ["Faclcons", "Ravens", "Eagles", "Vultures"];

interface EventCardProps {
    ageGroup: string;
    gender: string;
    distance: string;
}

export default function EventCard({ ageGroup, gender, distance}: EventCardProps) {
    const [results, setResults] = useState(
        Array(8).fill({ team: "", runner: "", time: ""})
    );
    const [submitted, setSubmitted] = useState(false);

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

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 w-full max-w-4xl mx-auto">
            <div className="flex jusify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                    {ageGroup} -{gender} - {distance}
                </h3>
                <button
                    className={`px-3 py-1 rounded-md text-sm ${
                        submitted ? "bg-yellow-500 text-white" : "bg-green-600 text-white"
                    }`}
                    onClick={handleToggle}
                >
                    {submitted ? "Undo" : "Mark as Done"}
                </button>
            </div>

            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-left">Position</th>
                        <th className="p-2 text-left">Team</th>
                        <th className="p-2 text-left">Runner Name</th>
                        <th className="p-2 text-left">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((entry, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">
                                <select
                                    className="border rounded-md p1 w-full"
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
                            <td className="p-2">
                                    <input
                                        type="text"
                                        className="border rounded-md p-1 w-full"
                                        placeholder="Runner name"
                                        value={entry.runner}
                                        onChange={(e) => 
                                            handleChange(index, "runner", e.target.value)
                                        }
                                        disabled={submitted}
                                    />
                            </td>
                            <td className="p-2">
                                    <input
                                        type="text"
                                        className="border rounded-md p-1 w-full"
                                        placeholder="Time (e.g. 02:35)"
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

            {!submitted && (
                <button
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    onClick={handleSubmit}
                >
                    Submit Results

                </button>
            )}

        </div>
    )
}
