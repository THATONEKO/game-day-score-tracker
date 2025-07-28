"use client";

import React, { useState } from "react";
import {
  Trophy,
  Users,
  Target,
  Medal,
  ChevronDown,
  ChevronUp,
  Ruler,
} from "lucide-react";

const teams = ["Falcons", "Vultures", "Ravens", "Eagles"];

const teamColors = {
  Falcons: "from-red-500 to-red-600",
  Vultures: "from-purple-500 to-purple-600",
  Ravens: "from-gray-700 to-gray-800",
  Eagles: "from-blue-500 to-blue-600",
};

const teamEmojis = {
  Falcons: "🦅",
  Vultures: "🦅",
  Ravens: "🐦‍⬛",
  Eagles: "🦅",
};

const genders = ["Boys", "Girls"];

export default function ShotPutTable() {
  const [selectedTeams, setSelectedTeams] = useState<{ [key: string]: string }>(
    {}
  );
  const [names, setNames] = useState<{ [key: string]: string }>({});
  const [distances, setDistances] = useState<{ [key: string]: string }>({});
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const level = "Upper School";

  const handleNameChange = (key: string, val: string) =>
    setNames((prev) => ({ ...prev, [key]: val }));

  const handleTeamChange = (key: string, val: string) =>
    setSelectedTeams((prev) => ({ ...prev, [key]: val }));

  const handleDistanceChange = (key: string, val: string) =>
    setDistances((prev) => ({ ...prev, [key]: val }));

  const toggleExpand = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const getBestDistance = (section: string) =>
    Math.max(
      ...Object.entries(distances)
        .filter(([k]) => k.startsWith(section))
        .map(([_, v]) => parseFloat(v))
        .filter((n) => !isNaN(n)),
      0
    );

  const isPB = (key: string, val: string) => {
    const section = key.substring(0, key.lastIndexOf("-"));
    const best = getBestDistance(section);
    return parseFloat(val) === best && best > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-3">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-white rounded-2xl px-4 py-3 shadow-lg mb-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="w-6 h-6 text-green-600" />
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Shot Put – Upper School
            </h1>
            <p className="text-sm text-gray-600 font-medium flex items-center justify-center gap-1">
              <Ruler className="w-4 h-4" />
              Distance Competition
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {genders.map((gender) => {
            const section = `${gender}-${level}`;
            const open = expanded[section];
            const best = getBestDistance(section);

            return (
              <div
                key={section}
                className="bg-white rounded-2xl shadow-lg border border-gray-100"
              >
                <button
                  onClick={() => toggleExpand(section)}
                  className="w-full rounded-xl bg-gradient-to-r from-green-600 to-teal-600 px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-white" />
                    <span className="text-white font-bold text-lg">
                      {gender} – {level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {best > 0 && (
                      <div className="bg-white/20 rounded-full px-2 py-1">
                        <span className="text-white text-xs font-medium">
                          Best: {best}m
                        </span>
                      </div>
                    )}
                    <div className="bg-white/20 rounded-full px-2 py-1">
                      <span className="text-white text-xs font-medium">8</span>
                    </div>
                    {open ? (
                      <ChevronUp className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white" />
                    )}
                  </div>
                </button>

                {/* Participants */}
                {open && (
                  <div className="p-4 space-y-4">
                    {[...Array(8)].map((_, i) => {
                      const key = `${section}-${i}`;
                      const team = selectedTeams[key];
                      const name = names[key] || "";
                      const distance = distances[key] || "";

                      return (
                        <div
                          key={key}
                          className={`rounded-xl p-4 space-y-3 ${
                            isPB(key, distance)
                              ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300"
                              : "bg-gray-50"
                          }`}
                        >
                          {/* Name */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-500">
                              Participant {i + 1}
                            </span>
                            {isPB(key, distance) && (
                              <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                                <Trophy className="w-3 h-3" />
                                BEST
                              </div>
                            )}
                          </div>

                          {/* Athlete Name */}
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Athlete Name
                            </label>
                            <input
                              className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none text-base"
                              placeholder="Enter name"
                              value={name}
                              onChange={(e) =>
                                handleNameChange(key, e.target.value)
                              }
                            />
                          </div>

                          {/* Team Selection */}
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Team
                            </label>
                            {team ? (
                              <div
                                className={`w-full h-12 rounded-xl bg-gradient-to-r ${teamColors[team]} flex items-center justify-center shadow-md cursor-pointer`}
                                onClick={() =>
                                  setSelectedTeams((prev) => ({
                                    ...prev,
                                    [key]: "",
                                  }))
                                }
                              >
                                <span className="text-white font-bold flex items-center gap-2">
                                  <span className="text-lg">
                                    {teamEmojis[team]}
                                  </span>
                                  {team}
                                </span>
                              </div>
                            ) : (
                              <select
                                className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-base"
                                onChange={(e) =>
                                  handleTeamChange(key, e.target.value)
                                }
                                value=""
                              >
                                <option value="" disabled>
                                  Select team
                                </option>
                                {teams.map((t) => (
                                  <option key={t} value={t}>
                                    {teamEmojis[t]} {t}
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
                                className={`w-full h-12 px-4 pr-8 border-2 rounded-xl text-center font-bold text-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none ${
                                  isPB(key, distance)
                                    ? "bg-yellow-100 border-yellow-300"
                                    : "bg-white border-gray-200"
                                }`}
                                placeholder="0.00"
                                min="0"
                                value={distance}
                                onChange={(e) =>
                                  handleDistanceChange(key, e.target.value)
                                }
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
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
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-6">
          <div className="bg-white rounded-xl px-4 py-3 shadow-md">
            <div className="flex items-center justify-center gap-2">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-gray-600 font-medium text-sm">
                Aim for your personal best!
              </span>
              <Medal className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}