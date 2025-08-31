"use client";

import CardComponent from "../components/card";
import {
  Bella,
  Julia,
  Maria,
  Nune,
  Tikush,
  Avo,
  Mom,
  Meri
} from "@/app/assets/people";
import BirthdayCountdown from "../components/countdown";

const people = [
  { image: Mom, title: "Kristine", description: "Mother" },
  { image: Tikush, title: "Tigranuhi", description: "Aunt" },
  { image: Avo, title: "Avetik", description: "Boyfriend" },
  { image: Meri, title: "Mery", description: "Friend" },
  { image: Nune, title: "Nune", description: "Friend" },
  { image: Bella, title: "Bella", description: "Friend" },
  { image: Julia, title: "Julia", description: "Friend" },
  { image: Maria, title: "Maria", description: "Friend" },
];

export default function FirstPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 via-purple-100 to-white flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--primary-purple)] mb-4 text-center drop-shadow-lg">
        {`Sona's 20th Birthday Celebration`}
      </h1>

      {/* Countdown */}
      <div className="mb-8">
        <BirthdayCountdown />
      </div>

      {/* Subtitle */}
      <h2 className="text-3xl font-semibold text-[var(--primary-purple)] mb-2">Who are you?</h2>
      <p className="text-lg text-[var(--primary-purple)] mb-8 text-center max-w-md">
        Select your name to view your personalized invitation
      </p>

      {/* People Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
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
