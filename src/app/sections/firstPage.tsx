"use client";

import CardComponent from "../components/card";
import {
  Bella,
  Julia,
  Maria,
  Nune,
  Tikush,
  Mom,
  Meri,
} from "@/app/assets/people";
import BirthdayCountdown from "../components/countdown";

const people = [
  { image: Mom, title: "Kristine", description: "Mother" },
  { image: Tikush, title: "Tigranuhi", description: "Aunt" },
  { image: Meri, title: "Mery", description: "Friend" },
  { image: Nune, title: "Nune", description: "Friend" },
  { image: Bella, title: "Bella", description: "Friend" },
  { image: Julia, title: "Julia", description: "Friend" },
  { image: Maria, title: "Maria", description: "Friend" },
];

export default function FirstPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 via-purple-100 to-white flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--primary-purple)] mb-4 text-center drop-shadow-lg">
        {`Sona's 20th Birthday Celebration`}
      </h1>

      {/* Countdown */}
      <div className="mb-8 w-full flex justify-center">
        <BirthdayCountdown />
      </div>

      {/* Subtitle */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--primary-purple)] mb-2 text-center">
        Who are you?
      </h2>
      <p className="text-base sm:text-lg text-[var(--primary-purple)] mb-8 text-center max-w-md">
        Select your name to view your personalized invitation
      </p>

      {/* People Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {people.map((person, index) => (
          <CardComponent
            key={index}
            imageSrc={person.image}
            title={person.title}
            description={person.description}
          />
        ))}
      </div>
    </div>
  );
}
