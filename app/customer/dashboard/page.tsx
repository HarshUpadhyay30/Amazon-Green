"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { useQuiz } from "@/components/quiz-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import ProductCard from "@/components/product-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Award,
  Package,
  Shield,
  Crown,
  HeadphonesIcon,
  TrendingUp,
  Globe,
  MapPin,
  Recycle,
  Plus,
  Camera,
  Receipt,
  Users,
  Brain,
  CheckCircle,
  Target,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetFooter } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface P2PItem {
  id: string
  title: string
  category: string
  price: number
  condition: "like-new" | "good" | "fair" | "poor"
  description: string
  images: string[]
  hasReceipt: boolean
  location: string
  views: number
  likes: number
  status: "active" | "sold" | "pending"
  createdAt: string
}

export default function CustomerDashboard() {
  const { user, isLoading } = useAuth()
  // Override quiz stats for Learn & Earn section
  const totalGreenPointsEarned = 675
  const completedQuizzes = Array(37).fill({})
  const quizStreak = 11
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"overview" | "sell-items">("overview")
  const [showSellForm, setShowSellForm] = useState(false)
  const [p2pItems, setP2pItems] = useState<P2PItem[]>([
    {
      id: "p2p-1",
      title: "Vintage Denim Jacket - Size M",
      category: "clothing",
      price: 299.0,
      condition: "good",
      description:
        "Classic vintage denim jacket in great condition. Slight fading which adds to the vintage look. Perfect for casual wear.",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      ],
      hasReceipt: false,
      location: "Patna, Bihar",
      views: 47,
      likes: 8,
      status: "active",
      createdAt: "2024-01-20",
    },
  ])

  const [sellForm, setSellForm] = useState({
    title: "",
    category: "",
    price: "",
    condition: "",
    description: "",
    location: "",
    images: [] as File[],
    receiptImage: null as File | null,
    isBranded: false,
  })

  const [primeOpen, setPrimeOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.type !== "customer")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  if (!user || user.type !== "customer") {
    return null
  }

  // Calculate total green points including quiz points
  const totalGreenPoints = 2450 + totalGreenPointsEarned

  const ecoStats = {
    co2Prevented: 127.5,
    greenPoints: totalGreenPoints,
    rank: "Eco Champion",
  }

  const leaderboard = {
    global: [
      { name: "Aarav S.", points: 15420, city: "Mumbai" },
      { name: "Priya R.", points: 12890, city: "Delhi" },
      { name: "You", points: totalGreenPoints, city: "Bengaluru", isUser: true },
    ],
    national: [
      { name: "Rohan K.", points: 8920, city: "Chennai" },
      { name: "Ananya M.", points: 7650, city: "Hyderabad" },
      { name: "You", points: totalGreenPoints, city: "Bengaluru", isUser: true },
    ],
    city: [
      { name: "Vikram P.", points: 3200, city: "Bengaluru" },
      { name: "You", points: totalGreenPoints, city: "Bengaluru", isUser: true },
    ],
  }

  // Updated featured products with real images
  const featuredProducts = [
    {
      id: "1",
      name: "Organic Cotton T-Shirt - Sustainable Fashion",
      price: 699,
      originalPrice: 899,
      rating: 4.5,
      reviewCount: 1247,
      greenRating: 5,
      certifications: 3,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      prime: true,
    },
    {
      id: "2",
      name: "Bamboo Fiber Phone Case - Biodegradable",
      price: Math.round(19.99 * 83),
      rating: 4.2,
      reviewCount: 856,
      greenRating: 4,
      certifications: 2,
      image: "https://img.tvcmall.com/dynamic/uploads/details/740x740_660178279A-1.webp",
      prime: true,
    },
    {
      id: "3",
      name: "Solar-Powered Bluetooth Speaker",
      price: Math.round(89.99 * 83),
    originalPrice: Math.round(119.99 * 83),
      rating: 4.7,
      reviewCount: 2341,
      greenRating: 5,
      certifications: 4,
      image: "https://img.freepik.com/free-photo/electronic-device-table_417767-143.jpg?semt=ais_hybrid&w=740",
    },
    {
      id: "4",
      name: "Recycled Ocean Plastic Water Bottle",
      price: Math.round(15.99 * 83),
      rating: 4.3,
      reviewCount: 1892,
      greenRating: 5,
      certifications: 2,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
      prime: true,
    },
  ]

  const p2pCategories = [
    { id: "clothing", name: "Clothing & Fashion", icon: "👕" },
    { id: "books", name: "Books & Media", icon: "📚" },
    { id: "home-decor", name: "Home & Decor", icon: "🏠" },
    { id: "sports", name: "Sports & Fitness", icon: "⚽" },
    { id: "toys", name: "Toys & Games", icon: "🧸" },
    { id: "electronics", name: "Small Electronics", icon: "📱" },
    { id: "beauty", name: "Beauty & Personal Care", icon: "💄" },
    { id: "accessories", name: "Accessories & Jewelry", icon: "👜" },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      if (files.length > 8) {
        alert("Please select maximum 8 images")
        return
      }
      setSellForm((prev) => ({ ...prev, images: files }))
    }
  }

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSellForm((prev) => ({ ...prev, receiptImage: e.target.files![0] }))
    }
  }

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!sellForm.title || !sellForm.category || !sellForm.price || !sellForm.condition || !sellForm.description) {
      alert("Please fill in all required fields")
      return
    }

    if (sellForm.images.length < 6) {
      alert("Please upload at least 6 photos to help buyers see your item clearly and build trust")
      return
    }

    if (sellForm.images.length > 8) {
      alert("Please select maximum 8 images")
      return
    }

    const newItem: P2PItem = {
      id: `p2p-${p2pItems.length + 1}`,
      title: sellForm.title,
      category: sellForm.category,
      price: Number.parseFloat(sellForm.price),
      condition: sellForm.condition as "like-new" | "good" | "fair" | "poor",
      description: sellForm.description,
      images: ["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=300&fit=crop"], // Placeholder
      hasReceipt: !!sellForm.receiptImage,
      location: sellForm.location || "Seattle, WA",
      views: 0,
      likes: 0,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setP2pItems((prev) => [newItem, ...prev])
    setShowSellForm(false)
    setSellForm({
      title: "",
      category: "",
      price: "",
      condition: "",
      description: "",
      location: "",
      images: [],
      receiptImage: null,
      isBranded: false,
    })

    alert("Your item has been listed successfully! It will be visible to other users immediately.")
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "like-new":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "sold":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Dashboard Header with Gradient and Tabs */}
      <div className="bg-gradient-to-r from-green-100 via-emerald-100 to-blue-100 py-8 px-4 mb-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            <div className="w-14 h-14 rounded-full bg-green-200 flex items-center justify-center text-2xl font-bold text-green-700 shadow">
              <Leaf className="w-8 h-8" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center w-full justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome, {user.name}</h1>
                <div className="text-green-700 text-sm font-medium">Customer Dashboard</div>
              </div>
              {/* Dashboard/Sell Your Items Tabs */}
              <div className="flex bg-white rounded-lg p-1 border mt-4 md:mt-0 ml-0 md:ml-8">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("overview")}
                  className="rounded-l-lg"
                >
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === "sell-items" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("sell-items")}
                  className="flex items-center gap-1 rounded-r-lg"
                >
                  <Users className="w-4 h-4" />
                  Sell Your Items
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {activeTab === "overview" && (
          <>
            {/* Enhanced Eco-Impact Header */}
            <div className="mb-8">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 p-8 text-white shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="w-full h-full bg-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/5 rounded-full animate-pulse delay-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <Leaf className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-1">Your Eco-Impact</h2>
                      <p className="text-emerald-100 text-lg">Making a difference, one purchase at a time</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* CO2 Prevented */}
                    <div className="group">
                      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-emerald-400/30 rounded-xl">
                            <Recycle className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-emerald-100 uppercase tracking-wide font-semibold">
                              This Month
                            </div>
                            <div className="text-sm text-white/80">+12.3 kg</div>
                          </div>
                        </div>
                        <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                          {ecoStats.co2Prevented} kg
                        </div>
                        <div className="text-emerald-100 font-medium mb-3">CO₂ Prevented</div>
                      </div>
                    </div>

                    {/* Green Points */}
                    <div className="group">
                      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-yellow-400/30 rounded-xl">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-emerald-100 uppercase tracking-wide font-semibold">
                              This Month
                            </div>
                            <div className="text-sm text-white/80">+450 pts</div>
                          </div>
                        </div>
                        <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                          {ecoStats.greenPoints.toLocaleString('en-IN')}
                        </div>
                        <div className="text-emerald-100 font-medium mb-3">Green Points</div>
                      </div>
                    </div>

                    {/* Current Rank */}
                    <div className="group">
                      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-orange-400/30 rounded-xl">
                            <Crown className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-emerald-100 uppercase tracking-wide font-semibold">
                              Rank Up
                            </div>
                            <div className="text-sm text-white/80">87% to Hero</div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-lg font-bold text-white">
                            <Crown className="w-5 h-5" />
                            {ecoStats.rank}
                          </div>
                        </div>
                        <div className="text-emerald-100 font-medium mb-3">Current Rank</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Eco-Impact Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Global
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                          <span className="font-semibold">🥇 Aarav S. <span className="text-xs text-gray-500 ml-2">Mumbai</span></span>
                          <span className="font-bold text-green-600">15,420</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="font-semibold">🥈 Priya R. <span className="text-xs text-gray-500 ml-2">Delhi</span></span>
                          <span className="font-bold text-green-600">12,890</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                          <span className="font-semibold">🥉 Rohan K. <span className="text-xs text-gray-500 ml-2">Chennai</span></span>
                          <span className="font-bold text-green-600">8,920</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-100 rounded border-2 border-green-300">
                          <span className="font-bold text-green-800">#125 You <span className="text-xs text-gray-500 ml-2">Bengaluru</span></span>
                          <span className="font-bold text-green-600">{totalGreenPoints.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        National
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                          <span className="font-semibold">🥇 Ananya M. <span className="text-xs text-gray-500 ml-2">Hyderabad</span></span>
                          <span className="font-bold text-green-600">7,650</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="font-semibold">🥈 Vikram P. <span className="text-xs text-gray-500 ml-2">Bengaluru</span></span>
                          <span className="font-bold text-green-600">3,200</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                          <span className="font-semibold">🥉 Meera J. <span className="text-xs text-gray-500 ml-2">Pune</span></span>
                          <span className="font-bold text-green-600">2,900</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-100 rounded border-2 border-green-300">
                          <span className="font-bold text-green-800">#76 You <span className="text-xs text-gray-500 ml-2">Bengaluru</span></span>
                          <span className="font-bold text-green-600">{totalGreenPoints.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Bengaluru
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                          <span className="font-semibold">🥇 Isha D. <span className="text-xs text-gray-500 ml-2">Bengaluru</span></span>
                          <span className="font-bold text-green-600">1,800</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="font-semibold">🥈 Aditya N. <span className="text-xs text-gray-500 ml-2">Bengaluru</span></span>
                          <span className="font-bold text-green-600">1,200</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                          <span className="font-semibold">🥉 Neha S. <span className="text-xs text-gray-500 ml-2">Bengaluru</span></span>
                          <span className="font-bold text-green-600">950</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-100 rounded border-2 border-green-300">
                          <span className="font-bold text-green-800">#16 You <span className="text-xs text-gray-500 ml-2">Bengaluru</span></span>
                          <span className="font-bold text-green-600">{totalGreenPoints.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quiz Section */}
            <div className="mb-8">
              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <Brain className="w-5 h-5 text-yellow-600" />
                    Sustainability Quiz Center
                  </CardTitle>
                  <CardDescription className="text-yellow-700">
                    Test your knowledge and earn Green Points while learning about sustainability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Quiz Progress */}
                    <div className="bg-white/60 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Quiz Progress</h3>
                          <p className="text-sm text-gray-600">{completedQuizzes.length} quizzes completed</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Green Points from Quizzes:</span>
                          <span className="font-semibold text-green-600">{totalGreenPointsEarned}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current Streak:</span>
                          <span className="font-semibold text-orange-600">{quizStreak} days</span>
                        </div>
                      </div>
                    </div>

                    {/* Quiz Categories */}
                    <div className="bg-white/60 rounded-lg p-4 border border-yellow-200">
                      <h3 className="font-semibold text-gray-900 mb-3">Available Categories</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">Sustainability Basics</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">Eco-Friendly Products</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-700">Climate Change</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-700">Recycling</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700">Energy Conservation</span>
                        </div>
                      </div>
                    </div>

                    {/* Quiz Benefits */}
                    <div className="bg-white/60 rounded-lg p-4 border border-yellow-200">
                      <h3 className="font-semibold text-gray-900 mb-3">Why Take Quizzes?</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Award className="w-4 h-4 text-green-600 mt-0.5" />
                          <span className="text-gray-700">Earn Green Points for discounts</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Brain className="w-4 h-4 text-blue-600 mt-0.5" />
                          <span className="text-gray-700">Learn about sustainability</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-orange-600 mt-0.5" />
                          <span className="text-gray-700">Track your progress</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Leaf className="w-4 h-4 text-green-600 mt-0.5" />
                          <span className="text-gray-700">Make better eco-choices</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-6 text-center">
                    <Link href="/quiz">
                      <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3">
                        <Brain className="w-5 h-5 mr-2" />
                        Learn & Earn
                      </Button>
                    </Link>
                    <p className="text-sm text-yellow-700 mt-2">
                      New quizzes added regularly • Points never expire • Compete with friends
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Featured Products Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Eco-Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Main Dashboard Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-2xl transition-shadow cursor-pointer border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="w-5 h-5 text-blue-500" />
                    Orders & Returns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">Track packages, view order history, and manage returns</p>
                  <Button variant="outline" size="sm" className="mt-3" asChild>
                    <Link href="/customer/orders">View Orders</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-shadow cursor-pointer border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="w-5 h-5 text-green-500" />
                    Account & Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Login settings, payment methods, and privacy controls</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Manage Account
                  </Button>
                </CardContent>
              </Card>

              {/* Green Prime Membership Card (replaces Prime Membership) */}
              <Card className="hover:shadow-2xl transition-shadow cursor-pointer border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Crown className="w-5 h-5 text-green-600" />
                    Green Prime Membership
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Manage your Green Prime benefits and green shipping options</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => setPrimeOpen(true)}>
                    View Benefits
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-shadow cursor-pointer border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <HeadphonesIcon className="w-5 h-5 text-purple-500" />
                    Customer Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Get help with orders, returns, and account issues</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sustainability Education Panel */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Leaf className="w-5 h-5" />
                  Today's Sustainability Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-800 mb-2">Why Group Orders Matter for the Environment</h3>
                    <p className="text-green-700 text-sm mb-4">
                      When you join a group order in your neighborhood, you're helping reduce delivery trucks on the
                      road. Each group order can prevent up to 5kg of CO₂ emissions compared to individual deliveries!
                    </p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Learn More
                    </Button>
                  </div>
                  <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                    <Recycle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "sell-items" && (
          <div className="space-y-6">
            {/* Sell Your Pre-loved Items */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-800 mb-2">Sell Your Pre-loved Items</h2>
                  <p className="text-blue-700 mb-4">
                    Give your items a second life! Sell clothing, books, home decor, and more directly to other
                    eco-conscious customers. It's sustainable, profitable, and helps reduce waste.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-700">Photo-based listings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-700">Direct customer sales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Recycle className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-700">Reduce waste together</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* My Listed Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    My Listed Items ({p2pItems.length})
                  </span>
                  <Button onClick={() => setShowSellForm(true)} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {p2pItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No items listed yet</h3>
                    <p className="text-gray-600 mb-6">Start selling your pre-loved items to other customers</p>
                    <Button onClick={() => setShowSellForm(true)} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      List Your First Item
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {p2pItems.map((item) => (
                      <Card key={item.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-6">
                            <Image
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.title}
                              width={120}
                              height={120}
                              className="rounded-lg object-cover"
                            />

                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.title}</h3>
                                  <p className="text-2xl font-bold text-blue-600">₹{item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Badge className={getStatusColor(item.status)}>{item.status.toUpperCase()}</Badge>
                                  <Badge className={getConditionColor(item.condition)}>
                                    {item.condition.replace("-", " ").toUpperCase()}
                                  </Badge>
                                  {item.hasReceipt && (
                                    <Badge className="bg-green-100 text-green-800">
                                      <Receipt className="w-3 h-3 mr-1" />
                                      Receipt
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {item.views} views
                                </span>
                                <span className="flex items-center gap-1">❤️ {item.likes} likes</span>
                                <span>📍 {item.location}</span>
                                <span>📅 Listed {new Date(item.createdAt).toLocaleDateString()}</span>
                              </div>

                              <div className="flex gap-3">
                                <Button variant="outline" size="sm" className="flex-1">
                                  Edit Listing
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                  Remove
                                </Button>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sell Form Modal */}
            {showSellForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5 text-blue-500" />
                      List Your Item
                    </CardTitle>
                    <CardDescription>Sell your pre-loved items to other eco-conscious customers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSellSubmit} className="space-y-6">
                      {/* Category Selection */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Product Category</h3>
                        <div>
                          <Label htmlFor="category">Select Category *</Label>
                          <select
                            id="category"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm mt-1"
                            value={sellForm.category}
                            onChange={(e) => setSellForm((prev) => ({ ...prev, category: e.target.value }))}
                            required
                          >
                            <option value="">Choose your item category</option>
                            {p2pCategories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.icon} {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Show remaining fields only after category is selected */}
                      {sellForm.category && (
                        <>
                          {/* Basic Information */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="title">Item Title *</Label>
                                <Input
                                  id="title"
                                  value={sellForm.title}
                                  onChange={(e) => setSellForm((prev) => ({ ...prev, title: e.target.value }))}
                                  placeholder="e.g., Nike Air Max 90 - Size 9 - White/Black"
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="price">Price (₹) *</Label>
                                <Input
                                  id="price"
                                  type="number"
                                  step="0.01"
                                  min="1"
                                  value={sellForm.price}
                                  onChange={(e) => setSellForm((prev) => ({ ...prev, price: e.target.value }))}
                                  placeholder="25.00"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="condition">Condition *</Label>
                              <select
                                id="condition"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm mt-1"
                                value={sellForm.condition}
                                onChange={(e) => setSellForm((prev) => ({ ...prev, condition: e.target.value }))}
                                required
                              >
                                <option value="">Select condition</option>
                                <option value="like-new">Like New - Barely used, no visible wear</option>
                                <option value="good">Good - Light wear, fully functional</option>
                                <option value="fair">Fair - Noticeable wear but works well</option>
                                <option value="poor">Poor - Heavy wear, may have minor issues</option>
                              </select>
                            </div>
                          </div>

                          {/* Category-Specific Fields */}
                          {sellForm.category === "clothing" && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900">Clothing Details</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="size">Size</Label>
                                  <select
                                    id="size"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm mt-1"
                                  >
                                    <option value="">Select size</option>
                                    <option value="xs">XS</option>
                                    <option value="s">S</option>
                                    <option value="m">M</option>
                                    <option value="l">L</option>
                                    <option value="xl">XL</option>
                                    <option value="xxl">XXL</option>
                                  </select>
                                </div>
                                <div>
                                  <Label htmlFor="brand">Brand</Label>
                                  <Input id="brand" placeholder="e.g., Nike, Adidas, H&M" />
                                </div>
                              </div>
                            </div>
                          )}

                          {sellForm.category === "electronics" && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900">Electronics Details</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="brand">Brand</Label>
                                  <Input id="brand" placeholder="e.g., Apple, Samsung, Sony" />
                                </div>
                                <div>
                                  <Label htmlFor="model">Model</Label>
                                  <Input id="model" placeholder="e.g., iPhone 13, Galaxy S21" />
                                </div>
                              </div>
                            </div>
                          )}

                          {sellForm.category === "books" && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900">Book Details</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="author">Author</Label>
                                  <Input id="author" placeholder="Author name" />
                                </div>
                                <div>
                                  <Label htmlFor="genre">Genre</Label>
                                  <select
                                    id="genre"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm mt-1"
                                  >
                                    <option value="">Select genre</option>
                                    <option value="fiction">Fiction</option>
                                    <option value="non-fiction">Non-Fiction</option>
                                    <option value="textbook">Textbook</option>
                                    <option value="children">Children's</option>
                                    <option value="other">Other</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}

                          <div>
                            <Label htmlFor="description">Item Description *</Label>
                            <Textarea
                              id="description"
                              rows={4}
                              value={sellForm.description}
                              onChange={(e) => setSellForm((prev) => ({ ...prev, description: e.target.value }))}
                              placeholder="Describe the item's condition, any flaws, why you're selling, etc. Be honest to build trust with buyers."
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="images">Item Photos (6-8 required) *</Label>
                            <div className="mt-1">
                              <Input type="file" accept="image/*" multiple onChange={handleImageUpload} required />
                              <p className="text-sm text-gray-500 mt-1">
                                Upload 6-8 high-quality photos from different angles to help buyers see your item
                                clearly.
                              </p>
                              {sellForm.images.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  <p className="text-sm font-medium">
                                    Uploaded: {sellForm.images.length}/8 images
                                    {sellForm.images.length < 6 && (
                                      <span className="text-red-600 ml-2">(Minimum 6 required)</span>
                                    )}
                                  </p>
                                  {sellForm.images.map((file, index) => (
                                    <p key={index} className="text-sm text-green-600">
                                      ✓ {file.name}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Brand Verification */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Brand Verification (Optional)</h3>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="isBranded"
                                checked={sellForm.isBranded}
                                onChange={(e) => setSellForm((prev) => ({ ...prev, isBranded: e.target.checked }))}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <Label htmlFor="isBranded">
                                This is a branded item (Nike, Apple, Designer brands, etc.)
                              </Label>
                            </div>

                            {sellForm.isBranded && (
                              <div>
                                <Label htmlFor="receipt">Upload Receipt/Proof of Purchase</Label>
                                <div className="mt-1">
                                  <Input
                                    id="receipt"
                                    type="file"
                                    accept="image/*,application/pdf"
                                    onChange={handleReceiptUpload}
                                  />
                                  <p className="text-sm text-gray-500 mt-1">
                                    Adding your original receipt increases buyer confidence. Personal info will be
                                    automatically blurred.
                                  </p>
                                  {sellForm.receiptImage && (
                                    <p className="text-sm text-green-600 mt-1">✓ {sellForm.receiptImage.name}</p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Location & Preferences</h3>
                            <div>
                              <Label htmlFor="location">General Location (City, State)</Label>
                              <Input
                                id="location"
                                value={sellForm.location}
                                onChange={(e) => setSellForm((prev) => ({ ...prev, location: e.target.value }))}
                                placeholder="e.g., Bengaluru, Karnataka"
                              />
                              <p className="text-sm text-gray-500 mt-1">
                                This helps buyers find local items and reduces shipping costs
                              </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-900 mb-3">Selling Options</h4>
                              <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    defaultChecked
                                  />
                                  <span className="text-sm text-gray-700">Allow local pickup (recommended)</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    defaultChecked
                                  />
                                  <span className="text-sm text-gray-700">Allow shipping (buyer pays shipping)</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  />
                                  <span className="text-sm text-gray-700">Accept reasonable offers</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="flex gap-4">
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={!sellForm.category}>
                          List Item
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowSellForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Green Prime Modal (same as header) */}
      <Sheet open={primeOpen} onOpenChange={setPrimeOpen}>
        <SheetContent side="right" className="max-w-md w-full">
          <SheetHeader>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-7 h-7 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Green Prime</span>
            </div>
            <p className="text-green-700 font-medium mb-2">Unlock exclusive eco-friendly benefits with Green Prime!</p>
          </SheetHeader>
          <div className="py-2">
            <ul className="list-disc pl-6 text-green-900 text-base space-y-2 mb-4">
              <li><span className="font-semibold">Free delivery</span> with reusable packaging (no extra cost)</li>
              <li><span className="font-semibold">Prime Early Access</span> & Exclusive Deals</li>
              <li><span className="font-semibold">Free Prime Video</span> access</li>
              <li><span className="font-semibold">Free Prime Music</span> access</li>
              <li><span className="font-semibold">Priority eco-customer support</span></li>
              <li><span className="font-semibold">Special Green Points multipliers</span></li>
            </ul>
            <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded mb-4 text-green-700 text-sm">
              All Green Prime deliveries use sustainable, reusable packaging to reduce waste.
            </div>
            <div className="mb-4">
              <div className="font-semibold text-green-900 mb-2">Choose your Green Prime plan:</div>
              <div className="grid grid-cols-1 gap-3">
                <button className="w-full border border-green-300 rounded-lg px-4 py-3 flex items-center justify-between hover:bg-green-100 transition">
                  <span className="font-bold text-lg text-green-800">₹299</span>
                  <span className="text-sm text-green-700">1 Month</span>
                </button>
                <button className="w-full border border-green-300 rounded-lg px-4 py-3 flex items-center justify-between hover:bg-green-100 transition">
                  <span className="font-bold text-lg text-green-800">₹599</span>
                  <span className="text-sm text-green-700">3 Months</span>
                </button>
                <button className="w-full border border-green-300 rounded-lg px-4 py-3 flex items-center justify-between hover:bg-green-100 transition">
                  <span className="font-bold text-lg text-green-800">₹1499</span>
                  <span className="text-sm text-green-700">12 Months</span>
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
