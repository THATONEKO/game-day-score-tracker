import EventCard from "@/app/components/EventCard";

const ageGroups = ["Lower School", "Middle School", "Upper School"];
const genders = ["Boys", "Girls"];
const distances = ["100m", "200m", "400m", "800m"]

export default function RacingPage() {
    return(
        <div className="p-6">
            <h1 className="text-2xl font-bond mb-6">Racing Events</h1>
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
    )
}