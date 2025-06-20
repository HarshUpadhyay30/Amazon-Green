"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"

interface Review {
  id: string
  customerName: string
  rating: number
  title: string
  content: string
  date: string
  helpful: number
  notHelpful: number
}

interface ProductReviewsProps {
  productId: string
  averageRating: number
  totalReviews: number
}

export default function ProductReviews({ productId, averageRating, totalReviews }: ProductReviewsProps) {
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
  })

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: "1",
      customerName: "Sarah M.",
      rating: 5,
      title: "Amazing quality and truly sustainable!",
      content:
        "I've been wearing this organic cotton t-shirt for months now and it still looks brand new. The fabric is incredibly soft and breathable. Love knowing that my purchase is helping the environment!",
      date: "2024-01-10",
      helpful: 12,
      notHelpful: 1,
    },
    {
      id: "2",
      customerName: "Mike R.",
      rating: 4,
      title: "Great shirt, fast shipping",
      content:
        "Really happy with this purchase. The fit is perfect and the material feels premium. Arrived quickly with minimal packaging which I appreciated.",
      date: "2024-01-08",
      helpful: 8,
      notHelpful: 0,
    },
    {
      id: "3",
      customerName: "Emma L.",
      rating: 5,
      title: "Perfect for sensitive skin",
      content:
        "I have very sensitive skin and this organic cotton is perfect. No irritation at all and it gets softer with each wash. The certifications give me confidence in the quality.",
      date: "2024-01-05",
      helpful: 15,
      notHelpful: 2,
    },
  ]

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle review submission
    console.log("New review:", newReview)
    setShowWriteReview(false)
    setNewReview({ rating: 5, title: "", content: "" })
  }

  const renderStarsSummary = (rating: number) => {
    return renderStars(rating, "w-4 h-4")
  }

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
              <span className="text-2xl font-bold text-gray-800">Customer Reviews</span>
            </div>
            <Button
              onClick={() => setShowWriteReview(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
            >
              Write a Review
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Rating Overview */}
            <div className="lg:w-1/3">
              <div className="text-center bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-5xl font-bold text-gray-800 mb-2">{averageRating}</div>
                <div className="flex justify-center mb-2">{renderStarsSummary(averageRating)}</div>
                <div className="text-gray-600 font-medium">{totalReviews} reviews</div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="lg:w-2/3">
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = reviews.filter((r) => r.rating === stars).length
                  const percentage = (count / reviews.length) * 100
                  return (
                    <div key={stars} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium">{stars}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-12 text-sm text-gray-600 font-medium">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Form */}
      {showWriteReview && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="text-xl text-gray-800">Write a Review</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Review Title</label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Summarize your experience"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Review</label>
                <Textarea
                  value={newReview.content}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Tell others about your experience with this product"
                  rows={4}
                  className="focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  Submit Review
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowWriteReview(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-gray-800 text-lg">{review.customerName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-bold text-xl text-gray-800 mb-3">{review.title}</h4>
                <p className="text-gray-700 leading-relaxed text-lg">{review.content}</p>
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                <span className="text-gray-600 font-medium">Was this helpful?</span>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 hover:bg-green-100 text-green-700 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="font-medium">Yes ({review.helpful})</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  <span className="font-medium">No ({review.notHelpful})</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
