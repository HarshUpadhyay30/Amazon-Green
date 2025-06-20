"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Share2, MapPin, Star, Receipt, Eye, MessageCircle, Shield } from "lucide-react"
import Image from "next/image"

interface P2PItem {
  id: string
  title: string
  category: string
  price: number
  originalPrice: number
  condition: "like-new" | "good" | "fair" | "poor"
  description: string
  images: string[]
  hasReceipt: boolean
  location: string
  views: number
  likes: number
  sellerName: string
  sellerRating: number
  sellerSales: number
  createdAt: string
  detailedDescription: string
  specifications: { [key: string]: string }
}

export default function MarketplaceItemPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  // Mock data - in real app, this would be fetched based on the ID
  const p2pItems: Record<string, P2PItem> = {
    "p2p-1": {
      id: "p2p-1",
      title: "Vintage Denim Jacket - Size M",
      category: "clothing",
      price: 799,
      originalPrice: 1599,
      condition: "good",
      description: "Classic vintage denim jacket in great condition. Slight fading which adds to the vintage look.",
      detailedDescription:
        "This beautiful vintage denim jacket is a timeless piece that never goes out of style. Made from high-quality denim with authentic vintage wash and fading that gives it character. The jacket features classic button closure, chest pockets, and side pockets. Perfect for layering and adds a cool, casual vibe to any outfit. Has been well-maintained and shows minimal signs of wear.",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      ],
      hasReceipt: false,
      location: "Mumbai, Maharashtra",
      views: 47,
      likes: 8,
      sellerName: "Aarav S.",
      sellerRating: 4.8,
      sellerSales: 23,
      createdAt: "2024-01-20",
      specifications: {
        Size: "Medium",
        Brand: "Vintage",
        Material: "100% Cotton Denim",
        Color: "Classic Blue",
        Condition: "Good - Minor fading",
        "Care Instructions": "Machine wash cold, hang dry",
      },
    },
    "p2p-2": {
      id: "p2p-2",
      title: "Harry Potter Complete Book Set",
      category: "books",
      price: 45.0,
      originalPrice: 0,
      condition: "like-new",
      description: "Complete Harry Potter series in excellent condition. All 7 books included, barely read.",
      detailedDescription: "Complete Harry Potter series in excellent condition. All 7 books included, barely read.",
      images: [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop",
      ],
      hasReceipt: true,
      location: "Delhi, Delhi",
      views: 89,
      likes: 15,
      sellerName: "Priya R.",
      sellerRating: 4.9,
      sellerSales: 41,
      createdAt: "2024-01-18",
      specifications: {},
    },
    // ...repeat for all p2p-3, p2p-4, etc. from main page...
  };
  const item = p2pItems[params.id as string] || p2pItems["p2p-1"];

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-white rounded-lg overflow-hidden">
              <Image
                src={item.images[selectedImageIndex] || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                {item.hasReceipt && (
                  <Badge className="bg-green-100 text-green-800">
                    <Receipt className="w-3 h-3 mr-1" />
                    Receipt Available
                  </Badge>
                )}
                <Badge className={getConditionColor(item.condition)}>
                  {item.condition.replace("-", " ").toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Thumbnail Images */}
            {item.images.length > 1 && (
              <div className="flex gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? "border-purple-500" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${item.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{item.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{item.likes} likes</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-2">
                <div className="text-4xl font-bold text-purple-600">₹{item.price.toLocaleString('en-IN')}</div>
                <span className="text-lg text-gray-400 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{item.sellerName}</span>
                      <div className="flex items-center gap-1">
                        {renderStars(item.sellerRating)}
                        <span className="text-sm text-gray-600">({item.sellerRating})</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{item.sellerSales} successful sales</div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <Shield className="w-4 h-4" />
                      <span>Verified seller</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Seller
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Contact Seller</Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500 border-red-200" : ""}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{item.detailedDescription}</p>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(item.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-600">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
