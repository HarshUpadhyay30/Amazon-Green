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
  Shield,
  Recycle,
  Search
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface RefurbishedItem {
  id: string
  name: string
  originalPrice: number
  price: number
  savings: number
  condition: "Excellent" | "Very Good" | "Good" | "Fair"
  warranty: string
  image: string
  brand: string
  category: string
  inStock: boolean
  features: string[]
  seller: {
    name: string
    isVerified: boolean
    rating: number
    totalSales: number
  }
}

export default function RefurbishedPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<RefurbishedItem[]>([
    {
      id: "refurb-1",
      name: "iPhone 13 Pro - Refurbished",
      originalPrice: 999.99 * 83,
      price: 649.99 * 83,
      savings: 350.0 * 83,
      condition: "Excellent",
      warranty: "1 Year Apple Warranty",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      brand: "Apple",
      category: "smartphones",
      inStock: true,
      features: ["128GB Storage", "Face ID", "Triple Camera System", "5G Ready"],
      seller: {
        name: "TechHub Electronics",
        isVerified: true,
        rating: 4.8,
        totalSales: 1247,
      },
    },
    {
      id: "refurb-2",
      name: "MacBook Air M1 - Refurbished",
      originalPrice: 1299.99 * 83,
      price: 899.99 * 83,
      savings: 400.0 * 83,
      condition: "Very Good",
      warranty: "90 Day Warranty",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      brand: "Apple",
      category: "laptops",
      inStock: true,
      features: ["M1 Chip", "8GB RAM", "256GB SSD", "13.3-inch Display"],
      seller: {
        name: "Premium Refurbs",
        isVerified: true,
        rating: 4.9,
        totalSales: 892,
      },
    },
    {
      id: "refurb-3",
      name: "Samsung Galaxy Watch 4 - Refurbished",
      originalPrice: 329.99 * 83,
      price: 199.99 * 83,
      savings: 130.0 * 83,
      condition: "Good",
      warranty: "6 Month Warranty",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsbr-E2kd878W2LtcFZQGHQgpC5ofshn63ZA&s",
      brand: "Samsung",
      category: "smartwatches",
      inStock: true,
      features: ["Health Monitoring", "GPS", "Water Resistant", "40mm"],
      seller: {
        name: "Shubham Electronics",
        isVerified: false,
        rating: 4.6,
        totalSales: 654,
      },
    },
    {
      id: "refurb-4",
      name: "Dell XPS 13 - Refurbished",
      originalPrice: 1199.99 * 83,
      price: 749.99 * 83,
      savings: 450.0 * 83,
      condition: "Very Good",
      warranty: "1 Year Dell Warranty",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
      brand: "Dell",
      category: "laptops",
      inStock: true,
      features: ["Intel i7", "16GB RAM", "512GB SSD", "13.3-inch 4K"],
      seller: {
        name: "Elite Tech Solutions",
        isVerified: true,
        rating: 4.7,
        totalSales: 423,
      },
    },
    {
      id: "refurb-5",
      name: "iPad Pro 11-inch - Refurbished",
      originalPrice: 899.99 * 83,
      price: 599.99 * 83,
      savings: 300.0 * 83,
      condition: "Excellent",
      warranty: "1 Year Apple Warranty",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      brand: "Apple",
      category: "tablets",
      inStock: true,
      features: ["M1 Chip", "128GB Storage", "11-inch Liquid Retina", "Apple Pencil Compatible"],
      seller: {
        name: "Digital Depot",
        isVerified: true,
        rating: 4.8,
        totalSales: 1156,
      },
    },
    {
      id: "refurb-6",
      name: "Sony WH-1000XM4 - Refurbished",
      originalPrice: 349.99 * 83,
      price: 229.99 * 83,
      savings: 120.0 * 83,
      condition: "Very Good",
      warranty: "6 Month Warranty",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      brand: "Sony",
      category: "headphones",
      inStock: true,
      features: ["Noise Cancelling", "30hr Battery", "Touch Controls", "Hi-Res Audio"],
      seller: {
        name: "Audio Masters",
        isVerified: false,
        rating: 4.4,
        totalSales: 341,
      },
    },
    {
      id: "refurb-7",
      name: "Google Pixel 7 - Refurbished",
      originalPrice: 699.99 * 83,
      price: 449.99 * 83,
      savings: 250.0 * 83,
      condition: "Good",
      warranty: "6 Month Warranty",
      image: "https://bsmedia.business-standard.com/_media/bs/img/article/2024-08/22/thumb/fitandfill/1200X900/1724305131-8675.jpg",
      brand: "Google",
      category: "smartphones",
      inStock: true,
      features: ["Google Tensor", "50MP Camera", "Android 13", "5G Ready"],
      seller: {
        name: "Mobile World",
        isVerified: true,
        rating: 4.5,
        totalSales: 789,
      },
    },
    {
      id: "refurb-8",
      name: "Microsoft Surface Pro 8 - Refurbished",
      originalPrice: 1099.99 * 83,
      price: 699.99 * 83,
      savings: 400.0 * 83,
      condition: "Excellent",
      warranty: "1 Year Microsoft Warranty",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop",
      brand: "Microsoft",
      category: "tablets",
      inStock: true,
      features: ["Intel i5", "8GB RAM", "128GB SSD", "13-inch PixelSense"],
      seller: {
        name: "Surface Specialists",
        isVerified: true,
        rating: 4.9,
        totalSales: 567,
      },
    },
  ])

  const refurbishedCategories = [
    { id: "smartphones", name: "Smartphones", icon: "📱", itemCount: 234, avgSavings: 35 },
    { id: "laptops", name: "Laptops", icon: "💻", itemCount: 156, avgSavings: 40 },
    { id: "tablets", name: "Tablets", icon: "📱", itemCount: 89, avgSavings: 30 },
    { id: "smartwatches", name: "Smartwatches", icon: "⌚", itemCount: 67, avgSavings: 25 },
    { id: "headphones", name: "Headphones", icon: "🎧", itemCount: 123, avgSavings: 45 },
    { id: "cameras", name: "Cameras", icon: "📷", itemCount: 78, avgSavings: 50 },
    { id: "gaming", name: "Gaming", icon: "🎮", itemCount: 45, avgSavings: 35 },
    { id: "accessories", name: "Accessories", icon: "🔌", itemCount: 189, avgSavings: 20 },
  ]

  // Get trending refurbished items (most savings)
  const trendingItems = items
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 8)

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'smartphones': return 'bg-blue-50 border-blue-200 hover:bg-blue-100'
      case 'laptops': return 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
      case 'tablets': return 'bg-purple-50 border-purple-200 hover:bg-purple-100'
      case 'smartwatches': return 'bg-green-50 border-green-200 hover:bg-green-100'
      case 'headphones': return 'bg-orange-50 border-orange-200 hover:bg-orange-100'
      case 'cameras': return 'bg-red-50 border-red-200 hover:bg-red-100'
      case 'gaming': return 'bg-pink-50 border-pink-200 hover:bg-pink-100'
      case 'accessories': return 'bg-teal-50 border-teal-200 hover:bg-teal-100'
      default: return 'bg-gray-50 border-gray-200 hover:bg-gray-100'
      }
    }

  const getCategoryImage = (categoryId: string) => {
    switch (categoryId) {
      case 'smartphones': return 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop'
      case 'laptops': return 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop'
      case 'tablets': return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop'
      case 'smartwatches': return 'https://cdn.shopify.com/s/files/1/0997/6284/files/Watch_Colection_1024x1024.jpg?v=1654689385'
      case 'headphones': return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
      case 'cameras': return 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop'
      case 'gaming': return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop'
      case 'accessories': return 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop'
      default: return 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop'
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent": return "bg-green-100 text-green-800"
      case "Very Good": return "bg-blue-100 text-blue-800"
      case "Good": return "bg-yellow-100 text-yellow-800"
      case "Fair": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search page with query
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}&type=refurbished`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refurbished Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover a wide range of high-quality refurbished products—smartphones, laptops, tablets, accessories, and more. All items are professionally restored, come with warranties, and help you save money while reducing waste and supporting the circular economy.
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
                  placeholder="Search for refurbished products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button type="submit" className="h-12 px-8 bg-green-600 hover:bg-green-700">
                Search
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-2">
              Search across {refurbishedCategories.reduce((sum, cat) => sum + cat.itemCount, 0)}+ refurbished items
            </p>
          </div>
            </div>

        {/* Categories Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {refurbishedCategories.map((category) => (
              <Link key={category.id} href={`/refurbished/category/${category.id}`}>
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
                          <p className="text-white/80 text-xs">{category.itemCount} items • {category.avgSavings}% avg savings</p>
                  </div>
                  </div>
                  </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Recycle className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-gray-600">Refurbished</span>
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
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Biggest Savings</h2>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Recycle className="w-3 h-3 mr-1" />
              Top Deals
            </Badge>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingItems.map((item) => (
              <Link key={item.id} href={`/refurbished/item/${item.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-48">
                      <Image
                      src={item.image}
                        alt={item.name}
                        fill
                      className="object-cover"
                      />
                    <div className="absolute top-2 left-2">
                      <Badge className={getConditionColor(item.condition)}>
                          {item.condition}
                        </Badge>
                      </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-100 text-green-800 text-xs font-bold">
                        Save ₹{item.savings.toLocaleString('en-IN')}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-lg font-bold text-green-600">₹{item.price.toLocaleString('en-IN')}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-blue-500" />
                        <span className="text-xs text-gray-500">{item.warranty}</span>
                      </div>
                          </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        {item.seller.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">{item.seller.name}</span>
                              {item.seller.isVerified && (
                          <Shield className="w-3 h-3 text-blue-500" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
            </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-2">Why Choose Refurbished?</h2>
            <p className="text-green-700">Quality electronics at a fraction of the price</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Reduce E-Waste</h3>
              <p className="text-green-700 text-sm">Give electronics a second life</p>
            </div>
            
              <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Warranty Protected</h3>
              <p className="text-green-700 text-sm">All items come with warranty</p>
            </div>
            
              <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Quality Tested</h3>
              <p className="text-green-700 text-sm">Rigorous testing and certification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
