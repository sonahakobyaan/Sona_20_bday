"use client";

import { useState, useEffect } from "react";
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
import Noma from "@/app/assets/noma.jpeg";
import BirthdayCountdown from "../components/countdown";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Form, Input, Button } from "antd";

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
  const [clickedMap, setClickedMap] = useState(false);
  const [addedToCalendar, setAddedToCalendar] = useState(false);

  const handleSelect = (person: (typeof people)[0]) => {
    if (!selectedPerson) {
      setSelectedPerson(person);
      localStorage.setItem("selectedPerson", JSON.stringify(person));
    }
  };
  useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch('/api/getResponses');
      const json = await res.json();
      console.log('Sheet data:', json);
    } catch (err) {
      console.error('Error fetching sheet data:', err);
    }
  }
  fetchData();
}, []);

  const moveDecline = () => {
    const maxX = 200;
    const maxY = 100;
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    setDeclinePos({ x: newX, y: newY });
  };

  const handleMapClick = () => setClickedMap(true);
  const handleCalendarClick = () => setAddedToCalendar(true);

  const handleAccept = async () => {
    const emailInput = (
      document.querySelector('input[type="email"]') as HTMLInputElement
    )?.value;

    if (!emailInput) {
      alert("Please enter your iPhone email before accepting.");
      return;
    }

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbw56qMr0sCOVlYyl8UYoKaNnqQ3PBrZuBgaNpc0RF4BnlKwAW8yZqoKQhjy1a058e8-3w/exec",
        {
          method: "POST",
          body: JSON.stringify({
            name: selectedPerson?.title,
            email: emailInput,
            addedToCalendar,
            clickedMap,
            accepted: true,
          }),
        }
      );
      alert("Your response has been saved! 🎉");
    } catch (error) {
      console.error(error);
      alert("Something went wrong, please try again.");
    }
  };

  const [form] = Form.useForm();
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Valid email:", values.email);
      alert("Valid email submitted: " + values.email);
    } catch (error) {
      console.log("Validation failed:", error);
    }
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
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={selectedPerson.title}
              className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md max-h-[90vh] flex flex-col"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="bg-gradient-to-b from-[var(--primary-purple)]/60 to-white rounded-2xl w-full h-full overflow-y-auto no-scrollbar">
                <div className="p-6 space-y-4">
                  <p className="text-md sm:text-md md:text-xl font-extrabold text-[var(--primary-purple)] text-start drop-shadow-lg">
                    Dear {selectedPerson.title} jan,
                  </p>

                  <p className="text-md sm:text-md md:text-xl font-extrabold text-[var(--primary-purple)]">
                    You’re invited to my birthday party at Noma!
                  </p>

                  <Image src={Noma} alt="Noma" className="rounded-lg" />

                  <div className="flex space-x-2">
                    <motion.a
                      href="https://yandex.com/maps/-/CLEWAGj7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[var(--primary-purple)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-purple)]/80 transition cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleMapClick}
                    >
                      Map
                    </motion.a>

                    <motion.a
                      href={`https://www.google.com/calendar/render?action=TEMPLATE&text=Sona's%2020th%20Birthday%20Party
                      )}&dates=20250922T150000Z/20250922T190000Z&details=Join%20me%20for%20my%2020th%20birthday%20celebration!&location=Noma`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[var(--primary-purple)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-purple)]/80 transition cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCalendarClick}
                    >
                      Add to Calendar
                    </motion.a>
                  </div>

                  <p className="text-md sm:text-md md:text-xl font-extrabold text-[var(--primary-purple)]">
                    Time: 7 PM
                  </p>

                  <img
                    src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnA3aGwwYm8zdG5taDE3YzM3MXd3cDU5dmtpYWl0emY3dzlwbGl3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SAnRhjE8NvDy0VDGpR/giphy.gif"
                    alt="Funny gif"
                  />

                  <p className="text-md sm:text-md md:text-xl font-extrabold text-[var(--primary-purple)]">
                    Dress code:{" "}
                    <span className="underline font-bold">all white</span> with
                    a touch of purple. Bring comfy shoes — we’ll dance all
                    night!
                  </p>

                  <img
                    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHd6YTJrNmRhN3h4aTczd3V1ajU4bWRvcnN3Zmt2cGozZnpsZmxxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r3OnH3h0A3pxFiQUOI/giphy.gif"
                    alt="Funny gif"
                  />

                  <p className="text-md sm:text-md md:text-xl font-extrabold text-[var(--primary-purple)]">
                    Don’t forget to capture every moment — make lots of videos
                    and photos!
                  </p>

                  <img
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjMyb3A1ZmJrN3IzbGI0NnRqbjRha3Jkb2RlendyaXg5MjU0ZnU4bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3mZp1EDTPwLgsXyo/giphy.gif"
                    alt="Funny gif"
                  />

                  <p className="text-md sm:text-md md:text-xl font-extrabold text-[var(--primary-purple)]">
                    To accept, please enter your iPhone email below.
                  </p>

                  <input
                    type="email"
                    placeholder="Your iPhone email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary-purple)]"
                  />

                  <p className="text-md sm:text-md md:text-xl font-extrabold text-[var(--primary-purple)]">
                    I’ll create a shared album so everyone can share their
                    videos.
                  </p>
                  <div className="flex justify-between mt-4 relative">
                    <motion.button
                      className="bg-[var(--primary-purple)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-purple)]/80 transition cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAccept}
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
                        stiffness: 1000000000000000,
                        damping: 20000,
                      }}
                    >
                      Decline
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
