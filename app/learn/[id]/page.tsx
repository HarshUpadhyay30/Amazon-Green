"use client";
import { useEffect, useState } from "react";
import { getLearningTopicById } from '@/lib/quiz-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function LearningTopicPage({ params }: { params: { id: string } }) {
  const topic = getLearningTopicById(params.id);
  if (!topic) return notFound();

  const [today, setToday] = useState<Date | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  useEffect(() => {
    setToday(new Date());
  }, []);
  const available = today && new Date(topic.availableDate) <= today;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
      <p className="mb-4 text-gray-700">{topic.description}</p>
      <div className="mb-6">
        <img src={topic.image} alt={topic.title} className="rounded-lg w-full max-w-md mx-auto mb-4" />
        {!showQuiz ? (
          <>
            <h2 className="text-lg font-semibold mb-2">Key Points</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              {topic.pointsToRead.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            {today === null ? (
              <span className="text-gray-400">Loading...</span>
            ) : available ? (
              <button onClick={() => setShowQuiz(true)} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                Start Quiz
              </button>
            ) : (
              <span className="text-gray-400">Quiz available on {new Date(topic.availableDate).toLocaleDateString()}</span>
            )}
          </>
        ) : (
          <Link href={`/learn/${topic.id}/quiz`} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Go to Quiz
          </Link>
        )}
      </div>
    </div>
  );
} 