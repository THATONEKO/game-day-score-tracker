"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle, Clock, Settings, Trophy, Users } from "lucide-react";

type SportStatus = {
  name: string;
  path: string;
  icon: string;
  backgroundImage: string;
  activated: boolean;
  completed: boolean;
  isRecording: boolean;
  startTime?: string;
  endTime?: string;
  participants: number;
  maxPoints: number;
};

const initialSports: SportStatus[] = [
  { 
    name: "Basketball", 
    path: "basketball", 
    icon: "🏀",
    backgroundImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    activated: true, 
    completed: true, 
    isRecording: false,
    endTime: "14:30",
    participants: 32,
    maxPoints: 100
  },
  { 
    name: "Soccer", 
    path: "soccer", 
    icon: "⚽",
    backgroundImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    activated: true, 
    completed: false, 
    isRecording: true,
    startTime: "15:00",
    participants: 44,
    maxPoints: 120
  },
  { 
    name: "Racing", 
    path: "racing", 
    icon: "🏃",
    backgroundImage: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    activated: true, 
    completed: false, 
    isRecording: false,
    startTime: "15:45",
    participants: 28,
    maxPoints: 90
  },
  { 
    name: "Speed Walk", 
    path: "speedwalk", 
    icon: "🚶",
    backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    activated: false, 
    completed: false, 
    isRecording: false,
    startTime: "16:15",
    participants: 24,
    maxPoints: 80
  },
  { 
    name: "Shot Put", 
    path: "shotput", 
    icon: "🥎",
    backgroundImage: "https://images.unsplash.com/photo-1594736797933-d0c6b5e5a361?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    activated: false, 
    completed: false, 
    isRecording: false,
    startTime: "16:45",
    participants: 16,
    maxPoints: 70
  },
  { 
    name: "Long Jump", 
    path: "longjump", 
    icon: "🤸",
    backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    activated: false, 
    completed: false, 
    isRecording: false,
    startTime: "17:15",
    participants: 20,
    maxPoints: 85
  },
];

export default function SportsCompetitionDashboard() {
    const [sports, setSports] = useState<SportStatus[]>(initialSports);

    const handleNavigate = (path: string) => {
        // Simulate navigation
        console.log(`Navigating to: /dashboard/secondary/sports/${path}`);
    };

    const handleStartRecording = (sportName: string) => {
        setSports(prevSports =>
            prevSports.map(sport =>
                sport.name === sportName && sport.activated && !sport.completed
                    ? { ...sport, isRecording: !sport.isRecording }
                    : sport
            )
        );
    };

    const handleToggleActivation = (sportName: string) => {
        setSports(prevSports =>
            prevSports.map(sport =>
                sport.name === sportName
                    ? { ...sport, activated: !sport.activated }
                    : sport
            )
        );
    };

    const getStatusBadge = (sport: SportStatus) => {
        if (sport.completed) {
            return (
                <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">Completed</span>
                </div>
            );
        }
        
        if (sport.isRecording) {
            return (
                <div className="flex items-center gap-1 px-3 py-1 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-400/30">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-red-400 text-sm font-medium">Recording</span>
                </div>
            );
        }
        
        if (sport.activated) {
            return (
                <div className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm font-medium">Ready</span>
                </div>
            );
        }
        
        return (
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-500/20 backdrop-blur-sm rounded-full border border-gray-400/30">
                <Settings className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm font-medium">Inactive</span>
            </div>
        );
    };

    const completedCount = sports.filter(s => s.completed).length;
    const activeCount = sports.filter(s => s.isRecording).length;
    const readyCount = sports.filter(s => s.activated && !s.completed && !s.isRecording).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6 sm:mb-8"
            >
                <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Sports Competition Control Center
                </h1>
                <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6">
                Manage and monitor all sporting activities
                </p>

                {/* Stats Overview */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/20 w-full sm:w-auto">
                    <div className="flex items-center gap-2 justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium text-sm sm:text-base">
                        {completedCount} Completed
                    </span>
                    </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/20 w-full sm:w-auto">
                    <div className="flex items-center gap-2 justify-center">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium text-sm sm:text-base">
                        {activeCount} Recording
                    </span>
                    </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/20 w-full sm:w-auto">
                    <div className="flex items-center gap-2 justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium text-sm sm:text-base">
                        {readyCount} Ready
                    </span>
                    </div>
                </div>
                </div>
            </motion.div>
            
            {/* Sports Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {sports.map((sport, index) => (
                <motion.div
  key={sport.name}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
  className="group relative rounded-2xl overflow-hidden cursor-pointer min-h-[320px] sm:aspect-[4/3]"
  onClick={() => handleNavigate(sport.path)}
>
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
    style={{ backgroundImage: `url(${sport.backgroundImage})` }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

  {/* Content */}
  <div className="absolute inset-0 px-3 pt-4 pb-5 sm:p-6 flex flex-col justify-between">
    {/* Status & Settings */}
    <div className="flex items-start justify-between">
      {getStatusBadge(sport)}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleToggleActivation(sport.name);
        }}
        className={`p-2 rounded-full backdrop-blur-sm border transition-all ${
          sport.activated
            ? "bg-green-500/20 border-green-400/30 text-green-400"
            : "bg-gray-500/20 border-gray-400/30 text-gray-400"
        }`}
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>

    {/* Sport Info */}
    <div className="text-center">
      <div className="text-5xl sm:text-6xl mb-2 sm:mb-3 drop-shadow-lg">{sport.icon}</div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">
        {sport.name}
      </h3>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{sport.participants} participants</span>
        </div>
        <div className="flex items-center gap-1">
          <Trophy className="w-4 h-4" />
          <span>{sport.maxPoints} pts max</span>
        </div>
      </div>
    </div>

    {/* Button Section */}
    <div className="flex flex-col gap-2 sm:gap-3">
      {sport.startTime && !sport.completed && (
        <div className="text-center text-white/80 text-xs sm:text-sm">
          {sport.isRecording ? "Started" : "Starts"} at {sport.startTime}
        </div>
      )}

      {sport.endTime && sport.completed && (
        <div className="text-center text-green-400 text-xs sm:text-sm">
          Completed at {sport.endTime}
        </div>
      )}

      <AnimatePresence>
        {sport.activated && !sport.completed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              handleStartRecording(sport.name);
            }}
            className={`w-full py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold backdrop-blur-sm border transition-all text-xs sm:text-sm ${
              sport.isRecording
                ? "bg-red-500/20 border-red-400/30 text-red-400 hover:bg-red-500/30"
                : "bg-green-500/20 border-green-400/30 text-green-400 hover:bg-green-500/30"
            }`}
          >
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              {sport.isRecording ? (
                <>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-sm" />
                  <span className="tracking-tight">Stop Recording</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="tracking-tight">Start Recording</span>
                </>
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {sport.completed && (
        <div className="w-full py-2 sm:py-3 rounded-xl font-semibold backdrop-blur-sm border bg-green-500/20 border-green-400/30 text-green-400 text-center text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            View Results
          </div>
        </div>
      )}
    </div>
  </div>
</motion.div>
                ))}
            </div>
            </div>

        </div>
    );
}