"use client";

import { Statistic } from "antd";
import { useEffect, useState } from "react";

const { Timer } = Statistic;

export default function BirthdayCountdown() {
  const [target, setTarget] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    let birthday = new Date(now.getFullYear(), 8, 22);

    if (now > birthday) {
      birthday = new Date(now.getFullYear() + 1, 8, 22);
    }

    setTarget(birthday.getTime());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {target > 0 && (
        <Timer
          type="countdown"
          value={target}
          format="D [days] HH:mm:ss"
          className="text-2xl"
        />
      )}
    </div>
  );
}
