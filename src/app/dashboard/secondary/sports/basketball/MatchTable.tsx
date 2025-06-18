"use client"
import React from 'react';

const teams = ["Falcons", "Vultures", "Ravens", "Eagles"];
const matches = teams.flatMap((teamA, i) => 
    teams.slice(i + 1).map(teamB => ({
        teamA,
        teamB,
        scoreA: '',
        scoreB: ''
    }))
);

export default function BasketballTable() {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Basketball League</h2>
            <table className="min-w-full table-auto border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Team A</th>
                        <th className="p-2">score</th>
                        <th className="p-2">Team B</th>
                        <th className="p-2">score</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match, idx) => (
                        <tr key={idx} className="text-center">
                            <td className="p-2">{match.teamA}</td>
                            <td><input type='number' className='border px-2 py-1 w-16'/></td>
                            <td className="p-2">{match.teamB}</td>
                            <td><input type='number' className='border px-2 py-1 w-16'/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}  