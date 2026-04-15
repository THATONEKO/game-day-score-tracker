"use client";

import React, { useState } from 'react';
import { Trophy, Users, Target, Medal, ChevronDown, ChevronUp, Ruler } from 'lucide-react';

const teams = ["Falcons", "Vultures", "Ravens", "Eagles"];
const categories = ["Boys", "Girls"];
const levels = ["Lower School", "Middle School", "Upper School"];

const teamColors = {
    "Falcons": "from-red-500 to-red-600",
    "Vultures": "from-purple-500 to-purple-600", 
    "Ravens": "from-gray-700 to-gray-800",
    "Eagles": "from-blue-500 to-blue-600"
};

const teamEmojis = {
    "Falcons": "🦅",
    "Vultures": "🦅", 
    "Ravens": "🐦‍⬛",
    "Eagles": "🦅"
};

export default function FieldEventTable({ title = "Field Event" }: { title?: string }) {
    const [selectedTeams, setSelectedTeams] = useState<{ [key: string]: string }>({});
    const [names, setNames] = useState<{ [key: string]: string }>({});
    const [distances, setDistances] = useState<{ [key: string]: string }>({});
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

    const handleDistanceChange = (rowKey: string, value: string) => {
        setDistances(prev => ({
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

    const getBestDistance = (sectionKey: string) => {
        const sectionDistances = Object.entries(distances)
            .filter(([key]) => key.startsWith(sectionKey))
            .map(([_, value]) => parseFloat(value))
            .filter(val => !isNaN(val));
        
        return sectionDistances.length > 0 ? Math.max(...sectionDistances) : 0;
    };

    const isPersonalBest = (rowKey: string, distance: string) => {
        const sectionKey = rowKey.substring(0, rowKey.lastIndexOf('-'));
        const bestDistance = getBestDistance(sectionKey);
        const currentDistance = parseFloat(distance);
        return !isNaN(currentDistance) && currentDistance === bestDistance && bestDistance > 0;
    };
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const entries = Object.keys(selectedTeams).map((key) => ({
            team: selectedTeams[key],
            name: names[key] || "",
            distance: distances[key] || "",
        }));

        const response = await fetch("/api/results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                eventType: "field",
                title,
                entries,
            }),
         });

        } catch (error) {
            console.error("Failed to submit field event:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-3">
            <div className="max-w-md mx-auto">
                {/* Compact Header */}
                <div className="text-center mb-6">
                    <div className="bg-white rounded-2xl px-4 py-3 shadow-lg mb-3">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Target className="w-6 h-6 text-green-600" />
                            <Trophy className="w-6 h-6 text-yellow-500" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                            {title}
                        </h1>
                        <p className="text-sm text-gray-600 font-medium flex items-center justify-center gap-1">
                            <Ruler className="w-4 h-4" />
                            Distance Competition
                        </p>
                    </div>
                </div>

                {/* Collapsible Sections */}
                <div className="space-y-4">
                    {categories.map(gender => 
                        levels.map(level => {
                            const sectionKey = `${gender}-${level}`;
                            const isExpanded = expandedSections[sectionKey];
                            const bestDistance = getBestDistance(sectionKey);
                            
                            return (
                                <div key={sectionKey} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                                    {/* Collapsible Header */}
                                    <button
                                        onClick={() => toggleSection(sectionKey)}
                                        className="w-full bg-gradient-to-r from-green-600 to-teal-600 px-4 py-3 flex items-center justify-between touch-manipulation"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5 text-white" />
                                            <span className="text-white font-bold text-lg">
                                                {gender} - {level}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {bestDistance > 0 && (
                                                <div className="bg-white/20 rounded-full px-2 py-1">
                                                    <span className="text-white text-xs font-medium">
                                                        Best: {bestDistance}m
                                                    </span>
                                                </div>
                                            )}
                                            <div className="bg-white/20 rounded-full px-2 py-1">
                                                <span className="text-white text-xs font-medium">8</span>
                                            </div>
                                            {isExpanded ? 
                                                <ChevronUp className="w-5 h-5 text-white" /> : 
                                                <ChevronDown className="w-5 h-5 text-white" />
                                            }
                                        </div>
                                    </button>

                                    {/* Expandable Content */}
                                    {isExpanded && (
                                        <div className="p-4 space-y-4">
                                            {[...Array(8)].map((_, i) => {
                                                const rowKey = `${sectionKey}-${i}`;
                                                const selected = selectedTeams[rowKey];
                                                const name = names[rowKey] || '';
                                                const distance = distances[rowKey] || '';
                                                const isPB = isPersonalBest(rowKey, distance);
                                                
                                                return (
                                                    <div key={rowKey} className={`rounded-xl p-4 space-y-3 ${isPB ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300' : 'bg-gray-50'}`}>
                                                        {/* Participant Number */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-semibold text-gray-500">
                                                                Participant {i + 1}
                                                            </span>
                                                            {isPB && (
                                                                <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                                                                    <Trophy className="w-3 h-3" />
                                                                    BEST
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Name Input */}
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Athlete Name</label>
                                                            <input 
                                                                className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-base"
                                                                placeholder="Enter athlete name"
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
                                                                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none cursor-pointer text-base"
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

                                                        {/* Distance Input */}
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                                Distance (meters)
                                                            </label>
                                                            <div className="relative">
                                                                <input 
                                                                    type="number" 
                                                                    step="0.01"
                                                                    className={`w-full h-12 px-4 pr-8 border-2 border-gray-200 rounded-xl text-center font-bold text-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none ${isPB ? 'bg-yellow-100 border-yellow-300' : 'bg-white'}`}
                                                                    placeholder="0.00"
                                                                    min="0"
                                                                    value={distance}
                                                                    onChange={(e) => handleDistanceChange(rowKey, e.target.value)}
                                                                />
                                                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
                                                                    m
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold text-lg shadow-lg"
                >
                    {isSubmitting ? "Submitting..." : "🏁 Submit Field Results"}
                </button>

                {/* Footer */}
                <div className="text-center mt-8 pb-6">
                    <div className="bg-white rounded-xl px-4 py-3 shadow-md">
                        <div className="flex items-center justify-center gap-2">
                            <Target className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600 font-medium text-sm">Aim for your personal best!</span>
                            <Medal className="w-4 h-4 text-yellow-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}