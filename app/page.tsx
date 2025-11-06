import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function Page() {
  'use cache';
  cacheLife('hours'); // Cache selama 1 jam

  // Fetch event list dari API (server-side)
  const response = await fetch(`${BASE_URL}/api/events`, {
    cache: "force-cache", // gunakan cache server-side
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const events = await response.json();

  return (
    <main>
      <section>
        <h1 className="text-center">
          The Hub for Every Dev <br /> Event You Cannot Miss
        </h1>
        <p className="text-center mt-5">
          Hackathons, Meetups, and Conferences, All in One Place
        </p>

        <ExploreBtn />

        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>

          <ul className="events">
            {events && events.length > 0 ? (
              events.map((event: any) => (
                <li key={event.id} className="list-none">
                  <EventCard {...event} />
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No events found.</p>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
