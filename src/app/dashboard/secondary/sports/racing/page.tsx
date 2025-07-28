import EventCard from "@/app/components/EventCard";

const ageGroups = ["Lower School", "Middle School", "Upper School"];
const genders = ["Boys", "Girls"];
const distances = ["100m", "200m", "400m", "800m"];

export default function RacingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-6">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        🏃‍♂️ Racing Events Tracker
                    </h1>
                    <p className="text-gray-600">Record and manage race results across all categories</p>
                </div>
                
                <div className="space-y-6">
                    {ageGroups.map((group) =>
                        genders.map((gender) =>
                            distances.map((dist) => (
                                <EventCard
                                    key={`${group}-${gender}-${dist}`}
                                    ageGroup={group}
                                    gender={gender}
                                    distance={dist}
                                />
                            ))
                        )
                    )}
                </div>
            </div>
        </div>
    );
}