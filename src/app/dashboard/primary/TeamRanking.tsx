"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, CheckCircle, Calendar, Target, Users } from "lucide-react";

type Team = {
    name: string;
    totalScore: number;
    color: string;
    bgGradient: string;
    activities: {
        [key: string]: number;
    };
};

type Activity = {
    name: string;
    status: 'upcoming' | 'live' | 'completed';
    startTime?: string;
    endTime?: string;
    icon: string;
    maxPoints: number;
};

const initialTeams: Team[] = [
    {
        name: "Falcons", 
        totalScore: 0, 
        color: "bg-emerald-500",
        bgGradient: "from-emerald-400 to-teal-600",
        activities: {
            "Basketball": 0,
            "Soccer": 0,
            "Speed Walking": 0,
            "Relay": 0,
            "Shot Put": 0,
            "Long Jump": 0
        }
    },
    {
        name: "Ravens", 
        totalScore: 0, 
        color: "bg-blue-500",
        bgGradient: "from-blue-400 to-indigo-600",
        activities: {
            "Basketball": 0,
            "Soccer": 0,
            "Speed Walking": 0,
            "Relay": 0,
            "Shot Put": 0,
            "Long Jump": 0
        }
    },
    {
        name: "Eagles", 
        totalScore: 0, 
        color: "bg-red-500",
        bgGradient: "from-red-400 to-rose-600",
        activities: {
            "Basketball": 0,
            "Soccer": 0,
            "Speed Walking": 0,
            "Relay": 0,
            "Shot Put": 0,
            "Long Jump": 0
        }
    },
    {
        name: "Vultures", 
        totalScore: 0, 
        color: "bg-amber-500",
        bgGradient: "from-amber-400 to-orange-600",
        activities: {
            "Basketball": 0,
            "Soccer": 0,
            "Speed Walking": 0,
            "Relay": 0,
            "Shot Put": 0,
            "Long Jump": 0
        }
    },
];

const activities: Activity[] = [
    { name: "Basketball", status: "completed", endTime: "14:30", icon: "🏀", maxPoints: 100 },
    { name: "Soccer", status: "live", startTime: "15:00", icon: "⚽", maxPoints: 120 },
    { name: "Speed Walking", status: "live", startTime: "15:30", icon: "🚶", maxPoints: 80 },
    { name: "Relay", status: "upcoming", startTime: "16:00", icon: "🏃", maxPoints: 90 },
    { name: "Shot Put", status: "upcoming", startTime: "16:30", icon: "🥎", maxPoints: 70 },
    { name: "Long Jump", status: "upcoming", startTime: "17:00", icon: "🤸", maxPoints: 85 }
];

export default function SportsCompetitionDashboard() {
    const [teams, setTeams] = useState<Team[]>(initialTeams);
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTeams(prevTeams => {
                const updatedTeams = prevTeams.map(team => {
                    const newTeam = { ...team, activities: { ...team.activities } };
                    
                    // Update scores for live activities
                    const liveActivities = activities.filter(a => a.status === 'live');
                    liveActivities.forEach(activity => {
                        if (Math.random() > 0.7) {
                            const scoreIncrease = Math.floor(Math.random() * 15) + 1;
                            newTeam.activities[activity.name] = Math.min(
                                newTeam.activities[activity.name] + scoreIncrease,
                                activity.maxPoints
                            );
                        }
                    });
                    
                    // Calculate total score
                    newTeam.totalScore = Object.values(newTeam.activities).reduce((sum, score) => sum + score, 0);
                    
                    return newTeam;
                });
                
                return updatedTeams;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Initialize some completed activity scores
    useEffect(() => {
        setTeams(prevTeams => {
            const updatedTeams = prevTeams.map(team => {
                const newTeam = { ...team, activities: { ...team.activities } };
                newTeam.activities["Basketball"] = Math.floor(Math.random() * 80) + 20;
                newTeam.totalScore = Object.values(newTeam.activities).reduce((sum, score) => sum + score, 0);
                return newTeam;
            });
            return updatedTeams;
        });
    }, []);

    const sortedTeams = [...teams].sort((a, b) => b.totalScore - a.totalScore);

    const getActivityStatusIcon = (status: string) => {
        switch(status) {
            case 'live': return <Clock className="w-4 h-4 text-green-400 animate-pulse" />;
            case 'completed': return <CheckCircle className="w-4 h-4 text-blue-400" />;
            case 'upcoming': return <Calendar className="w-4 h-4 text-gray-400" />;
            default: return null;
        }
    };

    const getActivityRanking = (activityName: string) => {
        return [...teams]
            .sort((a, b) => b.activities[activityName] - a.activities[activityName])
            .map((team, index) => ({ ...team, rank: index + 1 }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <div className="w-full">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        Inter-House Sports Championship
                    </h1>
                    <p className="text-gray-300 text-lg">Live Competition Dashboard</p>
                    <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">
                        <Users className="w-5 h-5" />
                        <span>4 Teams • 6 Sports • Real-time Updates</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                    {/* Main Leaderboard */}
                    <div className="lg:col-span-1">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                        />
                            <div className="flex items-center gap-3 mb-6">
                                <Trophy className="w-6 h-6 text-yellow-400" />
                                <h2 className="text-2xl font-bold text-white">Overall Rankings</h2>
                            </div>
                            
                            <div className="space-y-4 w-full">
                                <AnimatePresence>
                                    {sortedTeams.map((team, index) => (
                                        <motion.div
                                            key={team.name}
                                            layout
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="relative overflow-hidden rounded-xl w-full"
                                        >
                                            <div className={`bg-gradient-to-r ${team.bgGradient} p-4 text-white relative`}>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                                                            {index + 1}
                                                        </div>
                                                        <span className="font-bold text-lg">{team.name}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold">{team.totalScore}</div>
                                                        <div className="text-sm opacity-80">points</div>
                                                    </div>
                                                </div>
                                                
                                                {/* Progress bar */}
                                                <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        className="h-full bg-white/40"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(team.totalScore / Math.max(...teams.map(t => t.totalScore))) * 100}%` }}
                                                        transition={{ duration: 1 }}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>        
                    
                        {/* Individual Performance Analytics */}
                        <motion.div 
                        initial = {{ opacity: 0, y: 20 }}
                        animate = {{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6"
                        >
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="w-6 h-6 text-purple-400" />
                            <h2 className="text-2xl font-bold text-white">Individual Performance Matrix</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-white">
                            <thead>
                                <tr className="border-b border-white/20">
                                <th className="text-left py-3 px-4 font-semibold">Team</th>
                                {activities.map(activity => (
                                    <th key={activity.name} className="text-center py-3 px-2 font-semibold min-w-24">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-xl">{activity.icon}</span>
                                        <span className="text-xs">{activity.name}</span>
                                    </div>
                                    </th>
                                ))}
                                <th className="text-center py-3 px-4 font-semibold">Average</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map((team, teamIndex) => {
                                const teamAverage = Object.values(team.activities).reduce((sum, score) => sum + score, 0) / activities.length;
                                return (
                                    <motion.tr 
                                    key={team.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: teamIndex * 0.1 }}
                                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                                    >
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${team.bgGradient}`}></div>
                                        <span className="font-semibold">{team.name}</span>
                                        </div>
                                    </td>
                                    {activities.map(activity => {
                                        const score = team.activities[activity.name];
                                        const percentage = (score / activity.maxPoints) * 100;
                                        const isTopPerformer = teams.every(t => t.activities[activity.name] <= score);

                                        return (
                                        <td key={activity.name} className="py-3 px-2 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                            <div className={`text-sm font-bold ${isTopPerformer && score > 0 ? 'text-yellow-400' : 'text-white'}`}>
                                                {score}
                                                {isTopPerformer && score > 0 && <span className="ml-1">👑</span>}
                                            </div>
                                            <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                                                <div 
                                                className={`h-full bg-gradient-to-r ${team.bgGradient} transition-all duration-1000`}
                                                style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-xs text-gray-400">{percentage.toFixed(0)}%</div>
                                            </div>
                                        </td>
                                        );
                                    })}
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                        <div className="text-sm font-bold text-white">
                                            {teamAverage.toFixed(1)}
                                        </div>
                                        <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                                            <div 
                                            className={`h-full bg-gradient-to-r ${team.bgGradient} transition-all duration-1000`}
                                            style={{
                                                width: `${(teamAverage / Math.max(...activities.map(a => a.maxPoints))) * 100}%`
                                            }}
                                            ></div>
                                        </div>
                                        </div>
                                    </td>
                                    </motion.tr>
                                );
                                })}
                            </tbody>
                            </table>
                        </div>

                        {/* Performance Insights */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-yellow-400" />
                                Best Performer
                            </h4>
                            {activities.map(activity => {
                                const topTeam = teams.reduce((best, team) => 
                                team.activities[activity.name] > best.activities[activity.name] ? team : best
                                );
                                return topTeam.activities[activity.name] > 0 ? (
                                <div key={activity.name} className="text-sm text-gray-300 mb-1">
                                    {activity.icon} <span className="text-white font-medium">{topTeam.name}</span> - {topTeam.activities[activity.name]}pts
                                </div>
                                ) : null;
                            })}
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4 text-green-400" />
                                Completion Rate
                            </h4>
                            {teams.map(team => {
                                const completedActivities = Object.values(team.activities).filter(score => score > 0).length;
                                const completionRate = (completedActivities / activities.length) * 100;
                                return (
                                <div key={team.name} className="text-sm text-gray-300 mb-1">
                                    <span className="text-white font-medium">{team.name}</span> - {completionRate.toFixed(0)}%
                                </div>
                                );
                            })}
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-blue-400" />
                                Activity Progress
                            </h4>
                            {activities.map(activity => {
                                const totalParticipants = teams.filter(team => team.activities[activity.name] > 0).length;
                                return (
                                <div key={activity.name} className="text-sm text-gray-300 mb-1">
                                    {activity.icon} <span className="text-white font-medium">{activity.name}</span> - {totalParticipants}/4 teams
                                </div>
                                );
                            })}
                            </div>
                        </div>
                        </motion.div>
                        {/* Live Activities Status */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                        >
                            <h2 className="text-xl font-bold text-white mb-4">Activity Status</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Live Activities */}
                                <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                                    <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                                        <Clock className="w-4 h-4 animate-pulse" />
                                        Live Now
                                    </h3>
                                    {activities.filter(a => a.status === 'live').map(activity => (
                                        <div key={activity.name} className="text-white text-sm py-1">
                                            {activity.icon} {activity.name}
                                        </div>
                                    ))}
                                </div>

                                {/* Completed Activities */}
                                <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
                                    <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Completed
                                    </h3>
                                    {activities.filter(a => a.status === 'completed').map(activity => (
                                        <div key={activity.name} className="text-white text-sm py-1">
                                            {activity.icon} {activity.name}
                                        </div>
                                    ))}
                                </div>

                                {/* Upcoming Activities */}
                                <div className="bg-gray-500/20 rounded-xl p-4 border border-gray-500/30">
                                    <h3 className="text-gray-400 font-semibold mb-2 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Upcoming
                                    </h3>
                                    {activities.filter(a => a.status === 'upcoming').map(activity => (
                                        <div key={activity.name} className="text-white text-sm py-1 flex justify-between">
                                            <span>{activity.icon} {activity.name}</span>
                                            <span className="text-gray-400">{activity.startTime}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}