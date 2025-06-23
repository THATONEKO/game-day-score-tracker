"use client";

import React, { useState } from 'react';
import { Trophy, Users, Target, Medal, ChevronDown, ChevronUp, Zap, Flame, Award } from 'lucide-react';

const teams = ["Falcons", "Vultures", "Ravens", "Eagles"];
const categories = ["Boys", "Girls"];
const levels = ["Middle School", "Upper School"];

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

export default function ShotPutTable({ title = "Shot Put" }: { title?: string }) {
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

    const getSectionStats = (sectionKey: string) => {
        const sectionDistances = Object.entries(distances)
            .filter(([key]) => key.startsWith(sectionKey))
            .map(([_, value]) => parseFloat(value))
            .filter(val => !isNaN(val));
        
        if (sectionDistances.length === 0) return { best: 0, average: 0 };
        
        const best = Math.max(...sectionDistances);
        const average = sectionDistances.reduce((a, b) => a + b, 0) / sectionDistances.length;
        
        return { best, average };
    };

    const getDistanceCategory = (distance: string) => {
        const dist = parseFloat(distance);
        if (isNaN(dist)) return null;
        
        if (dist >= 15) return { label: "AMAZING", color: "from-purple-500 to-pink-500", icon: Flame };
        if (dist >= 12) return { label: "EXCELLENT", color: "from-orange-500 to-red-500", icon: Zap };
        if (dist >= 10) return { label: "GREAT", color: "from-yellow-500 to-orange-500", icon: Award };
        if (dist >= 8) return { label: "GOOD", color: "from-green-500 to-emerald-500", icon: Trophy };
        return { label: "SOLID", color: "from-blue-500 to-cyan-500", icon: Target };
    };

    const isTopThrow = (rowKey: string, distance: string) => {
        const sectionKey = rowKey.substring(0, rowKey.lastIndexOf('-'));
        const { best } = getSectionStats(sectionKey);
        const currentDistance = parseFloat(distance);
        return !isNaN(currentDistance) && currentDistance === best && best > 0;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-3">
            <div className="max-w-md mx-auto">
                {/* Shot Put Header */}
                <div className="text-center mb-6">
                    <div className="bg-white rounded-2xl px-4 py-3 shadow-xl mb-3 border-2 border-orange-200">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🏀</span>
                            </div>
                            <Flame className="w-6 h-6 text-red-500" />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {title}
                        </h1>
                        <p className="text-sm text-gray-600 font-medium flex items-center justify-center gap-1">
                            <Zap className="w-4 h-4" />
                            Power & Precision
                        </p>
                    </div>
                </div>

                {/* Collapsible Sections */}
                <div className="space-y-4">
                    {categories.map(gender => 
                        levels.map(level => {
                            const sectionKey = `${gender}-${level}`;
                            const isExpanded = expandedSections[sectionKey];
                            const { best, average } = getSectionStats(sectionKey);
                            
                            return (
                                <div key={sectionKey} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-orange-100">
                                    {/* Collapsible Header */}
                                    <button
                                        onClick={() => toggleSection(sectionKey)}
                                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 px-4 py-3 flex items-center justify-between touch-manipulation"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5 text-white" />
                                            <span className="text-white font-bold text-lg">
                                                {gender} - {level}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {best > 0 && (
                                                <div className="bg-white/20 rounded-full px-2 py-1">
                                                    <span className="text-white text-xs font-bold">
                                                        🔥 {best.toFixed(2)}m
                                                    </span>
                                                </div>
                                            )}
                                            {average > 0 && (
                                                <div className="bg-white/20 rounded-full px-2 py-1">
                                                    <span className="text-white text-xs font-medium">
                                                        Avg: {average.toFixed(1)}m
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
                                                const isRecord = isTopThrow(rowKey, distance);
                                                const category = getDistanceCategory(distance);
                                                
                                                return (
                                                    <div key={rowKey} className={`rounded-xl p-4 space-y-3 border-2 transition-all duration-300 ${
                                                        isRecord 
                                                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400 shadow-lg' 
                                                            : category 
                                                                ? 'bg-gradient-to-r from-gray-50 to-white border-gray-200' 
                                                                : 'bg-gray-50 border-gray-200'
                                                    }`}>
                                                        {/* Participant Header */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-semibold text-gray-500">
                                                                Thrower {i + 1}
                                                            </span>
                                                            <div className="flex items-center gap-2">
                                                                {category && (
                                                                    <div className={`flex items-center gap-1 bg-gradient-to-r ${category.color} text-white px-2 py-1 rounded-full text-xs font-bold shadow-md`}>
                                                                        <category.icon className="w-3 h-3" />
                                                                        {category.label}
                                                                    </div>
                                                                )}
                                                                {isRecord && (
                                                                    <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-orange-900 px-2 py-1 rounded-full text-xs font-bold shadow-md">
                                                                        <Trophy className="w-3 h-3" />
                                                                        BEST THROW
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Name Input */}
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Athlete Name</label>
                                                            <input 
                                                                className={`w-full h-12 px-4 border-2 rounded-xl text-gray-700 font-medium focus:ring-2 transition-all duration-200 outline-none text-base ${
                                                                    isRecord 
                                                                        ? 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-200 bg-yellow-50' 
                                                                        : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200 bg-white'
                                                                }`}
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
                                                                    className={`w-full h-12 rounded-xl bg-gradient-to-r ${teamColors[selected]} flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-shadow`}
                                                                    onClick={() => setSelectedTeams(prev => ({...prev, [rowKey]: ''}))}
                                                                >
                                                                    <span className="text-white font-bold flex items-center gap-2">
                                                                        <span className="text-lg">{teamEmojis[selected]}</span>
                                                                        {selected}
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <select
                                                                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 outline-none cursor-pointer text-base"
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
                                                                Throw Distance (meters)
                                                            </label>
                                                            <div className="relative">
                                                                <input 
                                                                    type="number" 
                                                                    step="0.01"
                                                                    className={`w-full h-14 px-4 pr-12 border-2 rounded-xl text-center font-bold text-xl focus:ring-2 transition-all duration-200 outline-none ${
                                                                        isRecord 
                                                                            ? 'border-yellow-400 focus:border-yellow-500 focus:ring-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50' 
                                                                            : category 
                                                                                ? `border-gray-300 focus:border-orange-500 focus:ring-orange-200 bg-gradient-to-r ${category.color.replace('500', '50').replace('600', '100')}` 
                                                                                : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200 bg-white'
                                                                    }`}
                                                                    placeholder="0.00"
                                                                    min="0"
                                                                    max="30"
                                                                    value={distance}
                                                                    onChange={(e) => handleDistanceChange(rowKey, e.target.value)}
                                                                />
                                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                                    <span className="text-gray-500 text-sm font-bold">meters</span>
                                                                </div>
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

                {/* Footer */}
                <div className="text-center mt-8 pb-6">
                    <div className="bg-white rounded-xl px-4 py-3 shadow-lg border border-orange-200">
                        <div className="flex items-center justify-center gap-2">
                            <Flame className="w-4 h-4 text-red-500" />
                            <span className="text-gray-600 font-medium text-sm">Power through every throw! 💪</span>
                            <Medal className="w-4 h-4 text-yellow-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
