"use client";
import { useState, useEffect } from "react";
import { getQuizById } from '@/lib/quiz-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const SECONDS_PER_SLIDE = 15; // Estimated reading time per slide

export default function QuizLearnPage({ params }: { params: { id: string } }) {
  const quiz = getQuizById(params.id);
  if (!quiz || !quiz.pointsToRead) return notFound();
  const [slide, setSlide] = useState(0);
  const [timer, setTimer] = useState(SECONDS_PER_SLIDE);
  const [canProceed, setCanProceed] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setTimer(SECONDS_PER_SLIDE);
    setCanProceed(false);
    if (slide === quiz.pointsToRead.length - 1) setCompleted(true);
    else setCompleted(false);
  }, [slide, quiz]);

  useEffect(() => {
    if (canProceed) return;
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanProceed(true);
    }
  }, [timer, canProceed]);

  const totalSlides = quiz.pointsToRead.length;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <p className="mb-4 text-gray-700">{quiz.description}</p>
      <img src={quiz.image} alt={quiz.title} className="rounded-lg w-full max-w-md mx-auto mb-4" />
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">Slide {slide + 1} of {totalSlides}</span>
        <span className="text-sm text-gray-500">Estimated time: {SECONDS_PER_SLIDE} sec</span>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-4 min-h-[100px] flex items-center justify-center text-lg font-medium text-gray-800">
        {quiz.pointsToRead[slide]}
      </div>
      <div className="flex items-center justify-between mb-6">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          onClick={() => setSlide((s) => Math.max(0, s - 1))}
          disabled={slide === 0}
        >
          Previous
        </button>
        <div className="text-sm text-gray-500">
          {canProceed ? "You can continue" : `Please read... (${timer}s)`}
        </div>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
          onClick={() => setSlide((s) => Math.min(totalSlides - 1, s + 1))}
          disabled={!canProceed || slide === totalSlides - 1}
        >
          Next
        </button>
      </div>
      {slide === totalSlides - 1 && canProceed && (
        <Link href={`/quiz/${quiz.id}`} className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mt-4">
          Start Quiz
        </Link>
      )}
    </div>
  );
} 