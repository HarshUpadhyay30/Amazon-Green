"use client";
import { useEffect, useState } from "react";
import { getAllLearningTopics } from "@/lib/quiz-data";
import Link from "next/link";

export default function LearnPage() {
  const topics = getAllLearningTopics();
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Learn & Earn</h1>
      <p className="mb-8 text-gray-700">
        Explore sustainability topics, learn with quick content, and earn green points by taking quizzes!
      </p>
      <ul className="space-y-6">
        {topics.map((topic) => {
          const available = today && new Date(topic.availableDate) <= today;
          return (
            <li
              key={topic.id}
              className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img src={topic.image} alt={topic.title} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h2 className="text-xl font-semibold">{topic.title}</h2>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                {today === null ? (
                  <span className="text-gray-400">Loading...</span>
                ) : available ? (
                  <Link
                    href={`/learn/${topic.id}`}
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Start Learning
                  </Link>
                ) : (
                  <span className="text-gray-400">
                    Available on {new Date(topic.availableDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
} 