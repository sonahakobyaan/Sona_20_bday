"use client";

import { useEffect, useState } from "react";

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      let birthday = new Date(now.getFullYear(), 8, 22); // Sept 22

      if (now > birthday) {
        birthday = new Date(now.getFullYear() + 1, 8, 22);
      }

      const diff = birthday.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg p-6 bg-gradient-to-b from-white-200 via-purple-300 to-[var(--primary-purple)] rounded-2xl shadow-lg text-white text-center">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 drop-shadow-lg">
        🎂 Countdown to the Party 🎉
      </h2>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center bg-white/20 rounded-xl p-3 shadow-md">
          <span className="text-3xl sm:text-4xl font-extrabold">
            {timeLeft.days}
          </span>
          <span className="text-sm sm:text-base">Days</span>
        </div>
        <div className="flex flex-col items-center bg-white/20 rounded-xl p-3 shadow-md">
          <span className="text-3xl sm:text-4xl font-extrabold">
            {timeLeft.hours}
          </span>
          <span className="text-sm sm:text-base">Hours</span>
        </div>
        <div className="flex flex-col items-center bg-white/20 rounded-xl p-3 shadow-md">
          <span className="text-3xl sm:text-4xl font-extrabold">
            {timeLeft.minutes}
          </span>
          <span className="text-sm sm:text-base">Minutes</span>
        </div>
        <div className="flex flex-col items-center bg-white/20 rounded-xl p-3 shadow-md">
          <span className="text-3xl sm:text-4xl font-extrabold">
            {timeLeft.seconds}
          </span>
          <span className="text-sm sm:text-base">Seconds</span>
        </div>
      </div>
    </div>
  );
}
