"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain, 
  Leaf, 
  Award, 
  Clock, 
  Users, 
  TrendingUp, 
  BookOpen, 
  CheckCircle,
  Play,
  Star,
  Target,
  Zap
} from "lucide-react"
import { getAllQuizzes, getQuizzesByCategory, Quiz } from "@/lib/quiz-data"
import { useQuiz } from "@/components/quiz-provider"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

const categoryIcons = {
  'sustainability': Leaf,
  'eco-products': Award,
  'climate-change': TrendingUp,
  'recycling': BookOpen,
  'energy': Zap
}

const categoryColors = {
  'sustainability': 'bg-green-100 text-green-800 border-green-200',
  'eco-products': 'bg-blue-100 text-blue-800 border-blue-200',
  'climate-change': 'bg-orange-100 text-orange-800 border-orange-200',
  'recycling': 'bg-purple-100 text-purple-800 border-purple-200',
  'energy': 'bg-yellow-100 text-yellow-800 border-yellow-200'
}

const SECONDS_PER_SLIDE = 15;

export default function QuizPage() {
  const { user } = useAuth()
  const { 
    completedQuizzes, 
    hasCompletedQuiz,
    getQuizProgress 
  } = useQuiz()
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const allQuizzes = getAllQuizzes()
  
  const filteredQuizzes = selectedCategory === 'all' 
    ? allQuizzes 
    : getQuizzesByCategory(selectedCategory)

  // Override quiz stats to match dashboard
  const totalGreenPointsEarned = 675
  const completedCount = 37
  const quizStreak = 11
  const totalQuizzes = allQuizzes.length
  const completionRate = totalQuizzes > 0 ? (completedCount / totalQuizzes) * 100 : 0

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAverageScore = (quizId: string) => {
    const progress = getQuizProgress(quizId)
    if (!progress) return null
    return Math.round((progress.score / progress.totalPoints) * 100)
  }

  const [learnQuiz, setLearnQuiz] = useState<Quiz | null>(null);
  const [slide, setSlide] = useState(0);
  const [timer, setTimer] = useState(SECONDS_PER_SLIDE);
  const [canProceed, setCanProceed] = useState(false);

  // Reset modal state when opening a new quiz
  function openLearnModal(quiz: Quiz) {
    setLearnQuiz(quiz);
    setSlide(0);
    setTimer(SECONDS_PER_SLIDE);
    setCanProceed(false);
  }

  // Timer effect for slides
  useEffect(() => {
    if (!learnQuiz) return;
    setTimer(SECONDS_PER_SLIDE);
    setCanProceed(false);
  }, [slide, learnQuiz]);

  useEffect(() => {
    if (!learnQuiz) return;
    if (canProceed) return;
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanProceed(true);
    }
  }, [timer, canProceed, learnQuiz]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">Sustainability Quiz Center</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test your knowledge about sustainability, eco-friendly products, and environmental impact. 
            Earn Green Points while learning how to make better choices for our planet.
          </p>
        </div>

        {/* Stats Overview */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">Green Points Earned</p>
                    <p className="text-2xl font-bold text-green-800">{totalGreenPointsEarned.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Quizzes Completed</p>
                    <p className="text-2xl font-bold text-blue-800">{completedCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-orange-600 font-medium">Current Streak</p>
                    <p className="text-2xl font-bold text-orange-800">{quizStreak} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All Quizzes</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="eco-products">Eco Products</TabsTrigger>
            <TabsTrigger value="climate-change">Climate</TabsTrigger>
            <TabsTrigger value="recycling">Recycling</TabsTrigger>
            <TabsTrigger value="energy">Energy</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => {
            const isCompleted = hasCompletedQuiz(quiz.id)
            const progress = getQuizProgress(quiz.id)
            const averageScore = getAverageScore(quiz.id)
            const IconComponent = categoryIcons[quiz.category as keyof typeof categoryIcons] || Leaf
            
            return (
              <Card key={quiz.id} className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                isCompleted ? 'ring-2 ring-green-200' : ''
              }`}>
                {isCompleted && (
                  <div className="absolute top-4 right-4 z-10">
                    <CheckCircle className="w-6 h-6 text-green-600 bg-white rounded-full" />
                  </div>
                )}
                
                {quiz.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={quiz.image}
                      alt={quiz.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className={categoryColors[quiz.category as keyof typeof categoryColors]}>
                        {quiz.category.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">{quiz.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{quiz.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        onClick={() => openLearnModal(quiz)}
                      >
                        Learn
                      </button>
                    </DialogTrigger>
                    {learnQuiz && learnQuiz.id === quiz.id && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{learnQuiz.title}</DialogTitle>
                        </DialogHeader>
                        <p className="mb-2 text-gray-700">{learnQuiz.description}</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500">Slide {slide + 1} of {learnQuiz.pointsToRead.length}</span>
                          <span className="text-sm text-gray-500">Estimated time: {SECONDS_PER_SLIDE} sec</span>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 mb-4 min-h-[100px] flex flex-col items-center justify-center text-lg font-bold text-gray-800">
                          {learnQuiz.pointsToRead[slide]}
                          <div className="mt-4 text-base font-normal text-gray-600 text-center">
                            {learnQuiz.extraInfo[slide]}
                          </div>
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
                            onClick={() => setSlide((s) => Math.min(learnQuiz.pointsToRead.length - 1, s + 1))}
                            disabled={!canProceed || slide === learnQuiz.pointsToRead.length - 1}
                          >
                            Next
                          </button>
                        </div>
                        {slide === learnQuiz.pointsToRead.length - 1 && canProceed && (
                          <Link href={`/quiz/${learnQuiz.id}`} className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mt-4">
                            Start Quiz
                          </Link>
                        )}
                      </DialogContent>
                    )}
                  </Dialog>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No quizzes found</h3>
            <p className="text-gray-500">Try selecting a different category or check back later for new quizzes.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl font-bold text-green-800">Join the Sustainability Movement</h2>
              </div>
              <p className="text-green-700 mb-6">
                Take quizzes regularly to earn Green Points, learn about sustainability, and make a positive impact on our planet. 
                Share your knowledge with friends and family!
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-green-600">
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>Earn Green Points</span>
                </div>
                <div className="flex items-center gap-1">
                  <Brain className="w-4 h-4" />
                  <span>Learn & Grow</span>
                </div>
                <div className="flex items-center gap-1">
                  <Leaf className="w-4 h-4" />
                  <span>Save the Planet</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 