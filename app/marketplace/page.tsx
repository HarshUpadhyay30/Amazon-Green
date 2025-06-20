"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Leaf, 
  Award, 
  Star,
  ArrowRight,
  Users,
  MapPin,
  Heart,
  Eye,
  Search
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
  sellerName: string
  sellerRating: number
  sellerSales: number
  createdAt: string
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<P2PItem[]>([
    {
      id: "p2p-1",
      title: "Vintage Denim Jacket - Size M",
      category: "clothing",
      price: 799,
      condition: "good",
      description: "Classic vintage denim jacket in great condition. Slight fading which adds to the vintage look.",
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
    },  
    {
      id: "p2p-2",
      title: "Harry Potter Complete Book Set",
      category: "books",
      price: 1445.0,
      condition: "like-new",
      description: "Complete Harry Potter series in excellent condition. All 7 books included, barely read.",
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
    },
    {
      id: "p2p-3",
      title: "Ceramic Plant Pots Set of 3",
      category: "home-decor",
      price: 425.0,
      condition: "good",
      description: "Beautiful ceramic plant pots, perfect for small plants. One has a tiny chip but still functional.",
      images: [
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=300&fit=crop",
      ],
      hasReceipt: false,
      location: "Bengaluru, Karnataka",
      views: 34,
      likes: 6,
      sellerName: "Rohan K.",
      sellerRating: 4.6,
      sellerSales: 12,
      createdAt: "2024-01-15",
    },
    {
      id: "p2p-4",
      title: "Nike Running Shoes - Size 9",
      category: "sports",
      price: 555.0,
      condition: "good",
      description: "Nike Air Max running shoes, lightly used. Great for jogging and casual wear.",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      ],
      hasReceipt: true,
      location: "Chennai, Tamil Nadu",
      views: 67,
      likes: 12,
      sellerName: "Ananya M.",
      sellerRating: 4.7,
      sellerSales: 18,
      createdAt: "2024-01-12",
    },
    {
      id: "p2p-5",
      title: "Wooden Chess Set - Handcrafted",
      category: "toys",
      price: 640.0,
      condition: "like-new",
      description: "Beautiful handcrafted wooden chess set. All pieces included, barely used.",
      images: [
        "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=300&h=300&fit=crop",
      ],
      hasReceipt: false,
      location: "Hyderabad, Telangana",
      views: 23,
      likes: 4,
      sellerName: "Vikram P.",
      sellerRating: 4.5,
      sellerSales: 8,
      createdAt: "2024-01-10",
    },
    {
      id: "p2p-6",
      title: "Bluetooth Wireless Headphones",
      category: "electronics",
      price: 7500.0,
      condition: "good",
      description: "Sony wireless headphones in good working condition. Minor wear on headband padding.",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      ],
      hasReceipt: true,
      location: "Kolkata, West Bengal",
      views: 91,
      likes: 18,
      sellerName: "Meera J.",
      sellerRating: 4.8,
      sellerSales: 29,
      createdAt: "2024-01-08",
    },
    {
      id: "p2p-7",
      title: "Men's Cotton Shorts - Navy Blue",
      category: "clothing",
      price: 499,
      condition: "good",
      description: "Comfortable cotton shorts, perfect for summer. Lightly used, no stains or tears.",
      images: [
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&h=300&fit=crop",
      ],
      hasReceipt: false,
      location: "Pune, Maharashtra",
      views: 22,
      likes: 3,
      sellerName: "Rishi T.",
      sellerRating: 4.6,
      sellerSales: 7,
      createdAt: "2024-01-19",
    },
    {
      id: "p2p-8",
      title: "Graphic Print T-Shirt - Large",
      category: "clothing",
      price: 429,
      condition: "like-new",
      description: "Trendy graphic print t-shirt, barely worn. 100% cotton, soft and breathable.",
      images: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop",
      ],
      hasReceipt: false,
      location: "Bengaluru, Karnataka",
      views: 18,
      likes: 2,
      sellerName: "Sneha M.",
      sellerRating: 4.7,
      sellerSales: 11,
      createdAt: "2024-01-17",
    },
    {
      id: "p2p-9",
      title: "Slim Fit Blue Jeans - 32W 32L",
      category: "clothing",
      price: 699,
      condition: "good",
      description: "Classic slim fit blue jeans, gently used. No rips, all buttons and zippers intact.",
      images: [
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=300&fit=crop",
      ],
      hasReceipt: false,
      location: "Ahmedabad, Gujarat",
      views: 25,
      likes: 4,
      sellerName: "Karan P.",
      sellerRating: 4.5,
      sellerSales: 9,
      createdAt: "2024-01-16",
    },
    {
      id: "p2p-10",
      title: "Formal White Shirt - Size 40",
      category: "clothing",
      price: 549,
      condition: "like-new",
      description: "Elegant formal white shirt, worn only once for an interview. No marks, crisp and clean.",
      images: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&h=300&fit=crop",
      ],
      hasReceipt: false,
      location: "Delhi, Delhi",
      views: 30,
      likes: 5,
      sellerName: "Amit S.",
      sellerRating: 4.9,
      sellerSales: 15,
      createdAt: "2024-01-14",
    },
    {
      id: "p2p-11",
      title: "Woolen Sweater - Maroon, Medium",
      category: "clothing",
      price: 649,
      condition: "good",
      description: "Warm woolen sweater, maroon color, perfect for winter. No holes or pilling.",
      images: [
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=300&h=300&fit=crop",
      ],
      hasReceipt: false,
      location: "Shimla, Himachal Pradesh",
      views: 12,
      likes: 2,
      sellerName: "Priya D.",
      sellerRating: 4.8,
      sellerSales: 6,
      createdAt: "2024-01-13",
    },
  ])

  const marketplaceCategories = [
    { id: "clothing", name: "Clothing & Fashion", icon: "👕", itemCount: 156 },
    { id: "books", name: "Books & Media", icon: "📚", itemCount: 89 },
    { id: "home-decor", name: "Home & Decor", icon: "🏠", itemCount: 234 },
    { id: "sports", name: "Sports & Fitness", icon: "⚽", itemCount: 123 },
    { id: "toys", name: "Toys & Games", icon: "🧸", itemCount: 67 },
    { id: "electronics", name: "Small Electronics", icon: "📱", itemCount: 198 },
    { id: "beauty", name: "Beauty & Personal Care", icon: "💄", itemCount: 145 },
    { id: "accessories", name: "Accessories & Jewelry", icon: "👜", itemCount: 112 },
  ]

  // Get trending marketplace items (most viewed/liked)
  const trendingItems = items
    .sort((a, b) => (b.views + b.likes) - (a.views + a.likes))
    .slice(0, 8)

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'clothing': return 'bg-blue-50 border-blue-200 hover:bg-blue-100'
      case 'books': return 'bg-amber-50 border-amber-200 hover:bg-amber-100'
      case 'home-decor': return 'bg-orange-50 border-orange-200 hover:bg-orange-100'
      case 'sports': return 'bg-green-50 border-green-200 hover:bg-green-100'
      case 'toys': return 'bg-purple-50 border-purple-200 hover:bg-purple-100'
      case 'electronics': return 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
      case 'beauty': return 'bg-pink-50 border-pink-200 hover:bg-pink-100'
      case 'accessories': return 'bg-teal-50 border-teal-200 hover:bg-teal-100'
      default: return 'bg-gray-50 border-gray-200 hover:bg-gray-100'
      }
    }

  const getCategoryImage = (categoryId: string) => {
    switch (categoryId) {
      case 'clothing': return 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop'
      case 'books': return 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
      case 'home-decor': return 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop'
      case 'sports': return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'
      case 'toys': return 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=400&h=300&fit=crop'
      case 'electronics': return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
      case 'beauty': return 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop'
      case 'accessories': return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
      default: return 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop'
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "like-new": return "bg-green-100 text-green-800"
      case "good": return "bg-blue-100 text-blue-800"
      case "fair": return "bg-yellow-100 text-yellow-800"
      case "poor": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search page with query
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}&type=marketplace`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">P2P Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Buy and sell pre-loved items with other eco-conscious community members. Give items a second life and reduce waste.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                  placeholder="Search for items in marketplace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
              />
            </div>
              <Button type="submit" className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                Search
            </Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-2">
              Search across {marketplaceCategories.reduce((sum, cat) => sum + cat.itemCount, 0)}+ items from our community
            </p>
          </div>
                  </div>

        {/* Categories Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {marketplaceCategories.map((category) => (
              <Link key={category.id} href={`/marketplace/category/${category.id}`}>
                <Card className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${getCategoryColor(category.id)}`}>
                  <div className="relative h-40 overflow-hidden rounded-t-lg">
                    <Image
                      src={getCategoryImage(category.id)}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl">{category.icon}</div>
                  <div>
                          <h3 className="text-lg font-bold text-white">{category.name}</h3>
                          <p className="text-white/80 text-xs">{category.itemCount} items available</p>
                        </div>
                      </div>
                  </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-blue-600" />
                        <span className="text-xs text-gray-600">Community</span>
                  </div>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                </div>
              </CardContent>
            </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Items Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Trending in Marketplace</h2>
            </div>
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingItems.map((item) => (
              <Link key={item.id} href={`/marketplace/item/${item.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-48">
                      <Image
                      src={item.images[0]}
                        alt={item.title}
                        fill
                      className="object-cover"
                      />
                    <div className="absolute top-2 left-2">
                        <Badge className={getConditionColor(item.condition)}>
                        {item.condition.replace('-', ' ')}
                        </Badge>
                      </div>
                    <div className="absolute top-2 right-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-green-600">₹{item.price.toLocaleString('en-IN')}</span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </div>
                            </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                        {item.views}
                            </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {item.likes}
                          </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        {item.sellerRating}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Join Our Community</h2>
            <p className="text-blue-700">Connect with eco-conscious buyers and sellers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">Active Community</h3>
              <p className="text-blue-700 text-sm">10,000+ verified members</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">Eco-Friendly</h3>
              <p className="text-blue-700 text-sm">Reduce waste through reuse</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">Trusted Sellers</h3>
              <p className="text-blue-700 text-sm">Verified profiles and ratings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
