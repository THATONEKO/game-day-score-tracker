"use client";

import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown, Trash, CheckCircle, RotateCcw, X } from "lucide-react";

const sportsOptions = ["Football", "Basketball", "Athletics", "Tennis"];
const gradeLevels = ["IB1", "IB2"];

interface User {
  name: string;
  surname: string;
  email: string;
  grade: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: "",
    surname: "",
    email: "",
    grade: "IB1",
  });

  const [selectedSport, setSelectedSport] = useState("");
  const [activeSports, setActiveSports] = useState<{ name: string; done: boolean }[]>([]);

 const handleAddUser = async () => {
  if (!formData.email || !formData.name || !formData.surname) return;
  const adminId = localStorage.getItem("adminId") as string;
  const admin = Number(adminId)

  const completeForm = {
    ...formData,
    adminId: admin// ✅ Replace with a real admin ID from your DB
  };

  try {
    const response = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completeForm),
    });

    if (!response.ok) {
      const err = await response.json();
      alert(err.error || "Error creating user");
      return;
    }

    const newUser = await response.json();
    setUsers([...users, newUser]);
    setFormData({ name: "", surname: "", email: "", grade: "IB1"});
    setModalOpen(false);
  } catch (err) {
    alert("Network error");
    console.error(err);
  }
};

  

  const handleRemoveUser = (emailToRemove: string) => {
    setUsers(users.filter((u) => u.email !== emailToRemove));
  };

  const handleActivateSport = () => {
    if (!selectedSport) return;
    setActiveSports((prev) => [...prev, { name: selectedSport, done: false }]);
    setSelectedSport("");
  };

  const handleRemoveSport = (sportToRemove: string) => {
    setActiveSports(activeSports.filter((sport) => sport.name !== sportToRemove));
  };

  const handleToggleSportStatus = (sportName: string) => {
    setActiveSports(
      activeSports.map((sport) =>
        sport.name === sportName ? { ...sport, done: !sport.done } : sport
      )
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-gray-700 text-2xl font-bold">Admin Dashboard</h1>

      {/* Manage Secondary Users */}
      <div className="bg-white p-6 rounded-xl shadow-lg mt-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Manage Secondary Users
        </h2>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 w-full"
        >
          Add New User
        </button>

        <div className="mt-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="p-3 bg-gray-200 rounded-lg flex justify-between items-center text-gray-800 text-sm mb-2"
            >
              <div>
                <strong>{user.name} {user.surname}</strong><br />
                {user.email} | Grade: {user.grade}
              </div>
              <button
                onClick={() => handleRemoveUser(user.email)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Active Sports Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mt-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Active Sport
        </h2>

        <div className="relative">
          <Listbox value={selectedSport} onChange={setSelectedSport}>
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="w-full flex justify-between items-center px-4 py-3 border rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-green-500">
                  {selectedSport || "Select a sport"}
                  <ChevronDown className={`w-5 h-5 ${open ? "rotate-180" : ""}`} />
                </Listbox.Button>
                <Listbox.Options className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
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
                          {selected && <Check className="w-4 h-4 text-green-600 mr-2" />}
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
          onClick={handleActivateSport}
          className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 w-full mt-3"
        >
          Activate
        </button>

        <div className="mt-4">
          {activeSports.map((sport, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg flex justify-between items-center mb-2 ${
                sport.done ? "bg-green-300 text-green-900" : "bg-yellow-300 text-yellow-900"
              }`}
            >
              <span>{sport.name}</span>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => handleToggleSportStatus(sport.name)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {sport.done ? (
                    <RotateCcw className="w-5 h-5" title="Mark as Undone" />
                  ) : (
                    <CheckCircle className="w-5 h-5" title="Mark as Done" />
                  )}
                </button>
                <button
                  onClick={() => handleRemoveSport(sport.name)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash className="w-5 h-5" title="Remove" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New User</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full border p-3 rounded-lg"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border p-3 rounded-lg"
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-3 rounded-lg"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <select
                className="w-full border p-3 rounded-lg"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              >
                {gradeLevels.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddUser}
                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 w-full"
              >
                Save User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
