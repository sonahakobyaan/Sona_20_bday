"use client";

import { useEffect, useState } from "react";
import BirthdayCountdown from "../components/countdown";
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
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const allPeople = [
  { image: Mom, title: "Kristine", description: "Mother" },
  { image: Tikush, title: "Tigranuhi", description: "Aunt" },
  { image: Meri, title: "Mery", description: "Friend" },
  { image: Nune, title: "Nune", description: "Friend" },
  { image: Bella, title: "Bella", description: "Friend" },
  { image: Julia, title: "Julia", description: "Friend" },
  { image: Maria, title: "Maria", description: "Friend" },
];

const SecondPage = () => {
  const [statuses, setStatuses] = useState<
    Record<string, "COMING" | "INVITED">
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/getResponses");
        const json = await res.json();

        let respondedNames: string[] = [];
        if (json.success && Array.isArray(json.data)) {
          type SheetRow = [string, string, ...unknown[]];
          respondedNames = (json.data as SheetRow[])
            .slice(1)
            .map((row) => row[1])
            .filter(Boolean);
        }

        const newStatuses: Record<string, "COMING" | "INVITED"> = {};
        allPeople.forEach((person) => {
          newStatuses[person.title] = respondedNames.includes(person.title)
            ? "COMING"
            : "INVITED";
        });
        setStatuses(newStatuses);
      } catch (err) {
        console.error("Error fetching sheet data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[var(--primary-purple)]/40 via-[var(--primary-purple)]/30 to-[var(--primary-purple)]/20">
        <Spin
          indicator={
            <LoadingOutlined
              style={{ fontSize: 48, color: "var(--primary-purple)" }}
              spin
            />
          }
          tip={
            <span style={{ color: "var(--primary-purple)" }}>
              Loading guest list...
            </span>
          }
          size="large"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--primary-purple)]/40 via-[var(--primary-purple)]/30 to-[var(--primary-purple)]/20 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--primary-purple)] mb-4 text-center drop-shadow-lg">
        {`Sona's 20th Birthday Celebration`}
      </h1>

      <div className="mb-8 w-full flex justify-center">
        <BirthdayCountdown />
      </div>

      <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--primary-purple)] mb-6 text-center">
        Guest List
      </h2>

      <div className="flex flex-wrap gap-6 w-full max-w-6xl justify-center">
        {allPeople.map((person, index) => (
          <CardComponent
            key={index}
            imageSrc={person.image}
            title={person.title}
            description={person.description}
            status={statuses[person.title] || "INVITED"}
          />
        ))}
      </div>
    </div>
  );
};

export default SecondPage;
