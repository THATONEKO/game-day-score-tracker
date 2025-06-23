"use client";

import React, { useState } from 'react';
import { Trophy, Users, Clock, Medal, ChevronDown, ChevronUp } from 'lucide-react'

const teams = ["Falcons", "Vultures", "Ravens", "Eagles"];
const categories = ["Boys", "Girls"];
const levels = ["Lower School", "Middle School", "Upper School"];

const teamColors = {
    "Falcons": "from-green-500 to-green-600",
    "Vultures": "from-yellow-500 to-yellow-600",
    "Ravens": "from-blue-500 to-blue-600",
    "Eagles": "from-red-500 to-red-600" 
};

const teamEmojis = {
    "Falcons": "🦅",
    "Vultures": "🦅", 
    "Ravens": "🐦‍⬛",
    "Eagles": "🦅"
};

export default function SpeedWalkTable() {
    const [selectedTeams, setSelectedTeams] = useState<{ [key: string]: string }>({});
    const [names, setNames] = useState<{ [key: string]: string }>({});
    const [positions, setPositions] = useState<{ [key: string]: string }>({});
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

    const handleTeamChange = (rowKey: string, value: string) => {
        setSelectedTeams(prev => ({
            ...prev,
            [rowKey]: value
        }));
    };

    const handleNameChange = (rowKey: string, value: string) => {
        setNames(prev => ({
            ...prev,
            [rowKey]: value
        }));
    };

    const handlePositionChange = (rowKey: string, value: string) => {
        setPositions(prev => ({
            ...prev,
            [rowKey]: value
        }));
    };

    const toggleSection = (sectionKey: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    };
    
    const getPositionColor = (position: string) => {
        const pos = parseInt(position);
        if (pos === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900";
        if (pos === 2) return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800";
        if (pos === 3) return "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3">
            <div className="max-w-md mx-auto">
                <div className="text-center md-6">
                    <div className="bg-white rounded-2xl px-4 py-3 shadow-lg mb-3">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Clock className="w-6 h-6 text-blue-600"/>
                            <Trophy className="text-yellow-500"/>
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 bg-clip-text text-transparent">
                            Speed Walk
                        </h1>
                        <p className="text-sm text-gray-gray-600 font-medium">340 Competition</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {categories.map(gender =>
                        levels.map(level => {
                            const sectionKey = `${gender}-${level}`;
                            const isExpanded = expandedSections[sectionKey];

                            return(
                                <div key={sectionKey} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                                    <button
                                        onClick={() => toggleSection(sectionKey)}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 flex items-center justify-between touch-manipulation"

                                    >
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5 text-white"/>
                                            <span className="text-white font-bold text-lg">
                                                {gender} - {level}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-white/20 rounded-full px-2 py-1">
                                                <span className="text-white text-xs font-medium">8</span>
                                            </div>
                                            {isExpanded ?
                                                <ChevronUp className="w-5 h-5 text-white"/>:
                                                <ChevronDown className="w-5 h-5 text-white"/>
                                            }
                                        </div>
                                    </button>
                                    
                                                                        {isExpanded && (
                                        <div className="p-4 space-y-4">
                                            {[...Array(8)].map((_, i) => {
                                                const rowKey = `${sectionKey}-${i}`;
                                                const selected = selectedTeams[rowKey];
                                                const name = names[rowKey] || '';
                                                const position = positions[rowKey] || '';
                                                
                                                return (
                                                    <div key={rowKey} className="bg-gray-50 rounded-xl p-4 space-y-3">
                                                        {/* Participant Number */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-semibold text-gray-500">
                                                                Participant {i + 1}
                                                            </span>
                                                            {position && parseInt(position) <= 3 && (
                                                                <Medal className={`w-5 h-5 ${
                                                                    parseInt(position) === 1 ? 'text-yellow-500' :
                                                                    parseInt(position) === 2 ? 'text-gray-400' :
                                                                    'text-amber-600'
                                                                }`} />
                                                            )}
                                                        </div>

                                                        {/* Name Input */}
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                                                            <input 
                                                                className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-base"
                                                                placeholder="Enter name"
                                                                value={name}
                                                                onChange={(e) => handleNameChange(rowKey, e.target.value)}
                                                            />
                                                        </div>

                                                        {/* Team Selection */}
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Team</label>
                                                            {selected ? (
                                                                <div 
                                                                    className={`w-full h-12 rounded-xl bg-gradient-to-r ${teamColors[selected]} flex items-center justify-center shadow-md cursor-pointer`}
                                                                    onClick={() => setSelectedTeams(prev => ({...prev, [rowKey]: ''}))}
                                                                >
                                                                    <span className="text-white font-bold flex items-center gap-2">
                                                                        <span className="text-lg">{teamEmojis[selected]}</span>
                                                                        {selected}
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <select
                                                                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none cursor-pointer text-base"
                                                                    onChange={(e) => handleTeamChange(rowKey, e.target.value)}
                                                                    value=""
                                                                >
                                                                    <option value="" disabled>Select team</option>
                                                                    {teams.map(team => (
                                                                        <option key={team} value={team}>
                                                                            {teamEmojis[team]} {team}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        </div>

                                                        {/* Position Input */}
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Final Position</label>
                                                            <input 
                                                                type="number" 
                                                                className={`w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-center font-bold text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none ${getPositionColor(position)}`}
                                                                placeholder="Position (1-8)"
                                                                min="1"
                                                                max="8"
                                                                value={position}
                                                                onChange={(e) => handlePositionChange(rowKey, e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                </div>
                            )
                        })
                    )}

                </div>
            </div>

        </div>
    )
}

