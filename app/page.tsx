import EventCard from "@/components/EventCard";
import ExploreBtn from "./components/ExploreBtn";
import { events } from "@/lib/constants";

const page = () => {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Meeting <br /> Event You Must Attend
      </h1>
      <p className="text-center mt-4">
        Hackathons, Meetups, Conferences, All events you need to attend in one
        place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
