"use client";

import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown, Trash, CheckCircle, RotateCcw } from "lucide-react";

const sportsOptions = ["Football", "Basketball", "Athletics", "Tennis"];

export default function AdminDashboard(){
    
    const [email, setEmail] = useState("");
    const [emailList, setEmailList] = useState<string[]>([]);
    const [selectedSport, setSelectedSport] = useState<string | null>(null);
    const [activeSports, setActiveSports] = useState<{ name: string; done: boolean }[]>([]);
    
    const handleAddEmail = () => {
        if (email && !emailList.includes(email)) {
            setEmailList([...emailList, email]);
            setEmail("");
        }
    };
    
    const handleRemoveEmail = (emailToRemove: string) => {
        setEmailList(emailList.filter((email) => email!== emailToRemove));
    }

    const handleActiveSport = () => {
        if (selectedSport && !activeSports.some((sport) => sport.name !== selectedSport)) {
            setActiveSports([...activeSports, { name: selectedSport, done: false}]);
            setSelectedSport(null);
        }
    };

    const handleRemoveSport = (sportToRemove: string) => {
        setActiveSports(activeSports.filter((sport) => sport.name!== sportToRemove));
    }
    
    const handleToggleSportStatus  = (sportName: string) => {
        setActiveSports(
            activeSports.map((sport) => 
                sport.name === sportName ? { ...sport, done: !sport.done } : sport
            )    
        );
    };
    return(
        <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
            <h1 className="text-gray-700 text-2xl font-bold">Admin Dashboard</h1>

            <div className="bg-white p-6 rounded-xl shadow-lg mt-6 w-full max-w-xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Manage Secondary Users
                </h2>
                <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter user email"
                      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      onClick={handleAddEmail}
                      className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Add
                    </button>
                </div>

                <div className="mt-4">
                    {emailList.map((userEmail, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-200 rounded-lg flex justify-between items-center text-gray-800 text-sm mb-2"
                        >
                          {userEmail}
                          <button
                            onClick={() => handleRemoveEmail(userEmail)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash className="w-5 h-5"/>
                          </button>
                        </div>
                    ))}

                </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg mt-6 w-full max-w-xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Active Sport
                </h2>

                <div className="relative">
                    <Listbox value={selectedSport} onChange={setSelectedSport}>
                        {({ open }) => (
                            <div className="relative">
                                <Listbox.Button className="w-full flex justify-between items-center px-4 py-3 border rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-green-500">
                                    {selectedSport || "Selected a sport"}
                                    <ChevronDown className={`w-5 h-5 ${open ? "rotate-180":""}`} />
                                </Listbox.Button>

                                <Listbox.Options className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                                    {sportsOptions.map((sport, index) => (
                                        <Listbox.Option
                                          key={index}
                                          value={sport}
                                          className={({ active }) => 
                                             `p-3 cursor-pointer ${
                                                active ? "bg-green-100 text-green-800" : "text-gray-700"
                                             } flex items-center`
                                          } 
                                        >
                                          {({ selected }) => (
                                            <>
                                              {selected && <Check className="w-4 h-4 text-green-600 mr-2"/>}
                                              {sport}
                                            </>
                                          )}

                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        )}

                    </Listbox> 
                </div>
                
                <button
                  onClick={handleActiveSport}
                  className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 w-full mt-3"
                >
                    Activate
                </button>

                <div className="mt-4">
                    {activeSports.map((sport, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg flex Justify-between items-center mb-2 ${
                            sport.done ? "bg-green-300 rounded-lg text-green-900": "bg-yellow-300 text-yellow-900"
                          }`}
                        >
                         <span>{sport.name}</span>
                         <div className="flex items-center gap-2 ml-auto">
                            <button 
                              onClick={() => handleToggleSportStatus(sport.name)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {sport.done ? (
                                <RotateCcw className="w-5 h-5" title="Mark as Undone"/>
                              ) :(
                                <CheckCircle className="w-5 h-5" title="Mark as Done"/>
                              )}

                            </button>
                            <button 
                              onClick={() => handleRemoveSport(sport.name)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash className="w-5 h-5" title="Remove"/>

                            </button>
                         </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}