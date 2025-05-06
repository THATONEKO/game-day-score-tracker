"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Team = {
    name: string;
    score: number;
    color: string;
};

const initialTeams: Team[] = [
    {name: "Falcons", score: 0, color: "bg-green-500" },
    {name: "Ravens", score: 0, color: "bg-blue-500" },
    {name: "Eagles", score: 0, color: "bg-red-500" },
    {name: "Vultures", score: 0, color: "bg-yellow-500" },

];

export default function TeamRanking(){
    const [teams, setTeams] = useState<Team[]>(initialTeams);

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTeams = [...teams];
            const randomIndex = Math.floor(Math.random() * teams.length);
            updatedTeams[randomIndex].score += Math.floor(Math.random() * 10);
            setTeams([...updatedTeams]);
        }, 2000);

        return () => clearInterval(interval);
    }, [teams]);

    const sortedTeams = [...teams].sort((a,b) => b.score - a.score);

    return(
        <div className="max-w-md mx-auto mt-10 space-y-4">
            <h2 className="text-2xl font-bold text-center">Live Ranking</h2>
            <AnimatePresence>
                {sortedTeams.map((team, index) => (
                    <motion.div
                        key={team.name}
                        layout
                        initial={{ opacity: 0, y: -10}}
                        animate={{ opacity: 1, y:0}}
                        exit={{ opacity: 0}}
                        transition={{duration: 0.4}}
                        className={`flex justiyf-between items-center px-4 py-2 rounded-md shadow ${team.color} text-white`}
                    >
                        <span className="font-semibold">{index + 1}. {team.name}</span>
                        <span>{team.score} pts</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}