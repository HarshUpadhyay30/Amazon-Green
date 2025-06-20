import { getLearningTopicById } from '@/lib/quiz-data';
import { notFound } from 'next/navigation';
import { useState } from 'react';

export default function QuizPage({ params }: { params: { id: string } }) {
  const topic = getLearningTopicById(params.id);
  if (!topic) return notFound();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers, optionIdx];
    setAnswers(newAnswers);
    if (step < topic.quiz.questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate score
      let correct = 0;
      newAnswers.forEach((ans, idx) => {
        if (ans === topic.quiz.questions[idx].answer) correct++;
      });
      setScore(correct);
    }
  };

  if (score !== null) {
    const points = Math.round((score / topic.quiz.questions.length) * topic.quiz.points);
    return (
      <div className="max-w-xl mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Quiz Complete!</h1>
        <p className="mb-2">You scored <span className="font-semibold">{score} / {topic.quiz.questions.length}</span></p>
        <p className="mb-4">You earned <span className="font-bold text-green-600">{points} Green Points</span> 🎉</p>
        <a href="/learn" className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Back to Learn</a>
      </div>
    );
  }

  const q = topic.quiz.questions[step];
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-xl font-bold mb-4">Quiz: {topic.title}</h1>
      <div className="mb-6">
        <div className="mb-2 text-gray-700">Question {step + 1} of {topic.quiz.questions.length}</div>
        <div className="text-lg font-medium mb-4">{q.question}</div>
        <div className="space-y-2">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="block w-full text-left px-4 py-2 border rounded hover:bg-green-50 focus:bg-green-100 transition"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 