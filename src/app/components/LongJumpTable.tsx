"use client"
import React from 'react';

const categories = ["Boys", "Girls"];
const levels = ["Lower School", "Middle School", "Upper School"];

export default function FieldEventTable({ title }: { title: string }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {categories.map(gender => (
                levels.map(level => (
                    <div key={`${gender}-${level}`} className="mb-6">
                        <h3 className="text-md font-semibold">{gender} - {level}</h3>
                        <table className="w-full table-auto border border-gray-300 mt-2">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Team</th>
                                    <th className="p-2">Distance (m)</th>
                                </tr>

                            </thead>
                            <tbody>
                                {[...Array(2)].map((_, i) =>
                                    <tr key={i}>
                                        <td><input className="border w-full p-1"/></td>
                                        <td>
                                            <select className="border w-full p-1">
                                                <option value="">Select team</option>
                                                <option>Falcons</option>
                                                <option>Ravens</option>
                                                <option>Vultures</option>
                                                <option>Eagles</option>
                                            </select>
                                        </td>
                                        <td><input type="number" className="border w-full p-1"/></td>
                                    </tr>
                                )}
                            </tbody>

                        </table>

                    </div>
                ))
            ))}
        </div>
    )
} 