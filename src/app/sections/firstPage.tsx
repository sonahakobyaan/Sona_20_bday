"use client";

import { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";

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
  const [selectedPerson, setSelectedPerson] = useState<
    (typeof people)[0] | null
  >(null);
  const [declinePos, setDeclinePos] = useState({ x: 0, y: 0 });

  const handleSelect = (person: (typeof people)[0]) => {
    if (!selectedPerson) {
      setSelectedPerson(person);
      localStorage.setItem("selectedPerson", JSON.stringify(person));
    }
  };

  const moveDecline = () => {
    const maxX = 200;
    const maxY = 100;
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    setDeclinePos({ x: newX, y: newY });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--primary-purple)]/40 via-[var(--primary-purple)]/30 to-[var(--primary-purple)]/20 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--primary-purple)] mb-4 text-center drop-shadow-lg">
        {`Sona's 20th Birthday Celebration`}
      </h1>
      <div className="mb-8 w-full flex justify-center">
        <BirthdayCountdown />
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--primary-purple)] mb-2 text-center">
        Who are you?
      </h2>
      <p className="text-base sm:text-lg text-[var(--primary-purple)] mb-8 text-center max-w-md">
        Select your name to view your personalized invitation
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl justify-items-center">
        {people.map((person, index) => (
          <CardComponent
            key={index}
            imageSrc={person.image}
            title={person.title}
            description={person.description}
            onClick={() => handleSelect(person)}
            layoutId={person.title}
            disabled={!!selectedPerson}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedPerson && (
          <div className="bg-white rounded-2xl">
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 sm:px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                layoutId={selectedPerson.title}
                className="bg-gradient-to-b from-[var(--primary-purple)]/60 to-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-6 space-y-4">
                  <p className="text-gray-700">
                    Dear {selectedPerson.title},<br />
                    <br />
                    You are invited to participate in my birthday party at the
                    place <strong>Noma Rooftop</strong> at <strong>7 PM</strong>{" "}
                    on <strong>September 22</strong>.<br />
                    <br />I will ask you to wear a <strong>
                      white outfit
                    </strong>{" "}
                    because it is my dress code. Also, please bring{" "}
                    <strong>comfortable shoes</strong> because we will dance of
                    course!
                    <br />
                    <br />
                    Please be on time.
                    <br />
                    <br />
                    Make a lot of videos and shoot everything!
                    <br />
                    <br />
                    To accept your invitation, please write your iPhone’s email.
                    I need it to create a shared album with all my friends so
                    they can share their videos.
                  </p>

                  <input
                    type="email"
                    placeholder="Your iPhone email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />

                  <div className="flex justify-between mt-4 relative">
                    <motion.button
                      className="bg-[var(--primary-purple)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-purple)]/80 transition cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Accept
                    </motion.button>
                    <motion.button
                      className="bg-[var(--primary-purple)] text-white px-4 py-2 rounded-lg transition cursor-pointer"
                      onMouseEnter={moveDecline}
                      onTouchStart={moveDecline}
                      animate={{ x: declinePos.x, y: declinePos.y }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                      }}
                    >
                      Decline
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
