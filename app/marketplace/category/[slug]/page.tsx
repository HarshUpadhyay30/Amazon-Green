"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Heart, Eye, Receipt, Users, Star, ArrowLeft } from "lucide-react"
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

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function MarketplaceCategoryPage({ params }: PageProps) {
  const { slug } = use(params)
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
      price: 45.0,
      condition: "like-new",
      description: "Complete Harry Potter series in excellent condition. All 7 books included, barely read.",
      images: [
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
      price: 25.0,
      condition: "good",
      description: "Beautiful ceramic plant pots, perfect for small plants. One has a tiny chip but still functional.",
      images: [
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
      price: 55.0,
      condition: "good",
      description: "Nike Air Max running shoes, lightly used. Great for jogging and casual wear.",
      images: [
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
      price: 40.0,
      condition: "like-new",
      description: "Beautiful handcrafted wooden chess set. All pieces included, barely used.",
      images: [
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
      price: 75.0,
      condition: "good",
      description: "Sony wireless headphones in good working condition. Minor wear on headband padding.",
      images: [
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

  const [filteredItems, setFilteredItems] = useState<P2PItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const categoryInfo = {
    clothing: { name: "Clothing & Fashion", icon: "👕", color: "blue" },
    books: { name: "Books & Media", icon: "📚", color: "amber" },
    "home-decor": { name: "Home & Decor", icon: "🏠", color: "orange" },
    sports: { name: "Sports & Fitness", icon: "⚽", color: "green" },
    toys: { name: "Toys & Games", icon: "🧸", color: "purple" },
    electronics: { name: "Small Electronics", icon: "📱", color: "indigo" },
    beauty: { name: "Beauty & Personal Care", icon: "💄", color: "pink" },
    accessories: { name: "Accessories & Jewelry", icon: "👜", color: "teal" },
  }

  const category = categoryInfo[slug as keyof typeof categoryInfo]

  useEffect(() => {
    let filtered = items.filter(item => item.category === slug)

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Condition filter
    if (selectedCondition !== "all") {
      filtered = filtered.filter((item) => item.condition === selectedCondition)
    }

    // Price filter
    if (priceRange !== "all") {
      if (priceRange === "under-25") {
        filtered = filtered.filter((item) => item.price < 25)
      } else if (priceRange === "25-50") {
        filtered = filtered.filter((item) => item.price >= 25 && item.price <= 50)
      } else if (priceRange === "50-100") {
        filtered = filtered.filter((item) => item.price >= 50 && item.price <= 100)
      } else if (priceRange === "over-100") {
        filtered = filtered.filter((item) => item.price > 100)
      }
    }

    // Sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => b.views + b.likes - (a.views + a.likes))
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    setFilteredItems(filtered)
  }, [items, slug, searchQuery, selectedCondition, priceRange, sortBy])

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "like-new": return "bg-green-100 text-green-800"
      case "good": return "bg-blue-100 text-blue-800"
      case "fair": return "bg-yellow-100 text-yellow-800"
      case "poor": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
            <Link href="/marketplace">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/marketplace" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{category.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          </div>
          <p className="text-gray-600">
            Browse {filteredItems.length} items in {category.name.toLowerCase()}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={`Search in ${category.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Condition</label>
                    <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Conditions</SelectItem>
                        <SelectItem value="like-new">Like New</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="under-25">Under $25</SelectItem>
                        <SelectItem value="25-50">$25 - $50</SelectItem>
                        <SelectItem value="50-100">$50 - $100</SelectItem>
                        <SelectItem value="over-100">Over $100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCondition("all")
                        setPriceRange("all")
                        setSortBy("newest")
                      }}
                      className="w-full"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} found
          </p>
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Link href={`/marketplace/item/${item.id}`} key={item.id}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative aspect-square">
                      <Image
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        {item.hasReceipt && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <Receipt className="w-3 h-3 mr-1" />
                            Receipt
                          </Badge>
                        )}
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge className={getConditionColor(item.condition)}>
                          {item.condition.replace("-", " ").toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-blue-600">₹{item.price.toLocaleString('en-IN')}</span>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{item.likes}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                      {/* Seller Info */}
                      <div className="border-t pt-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-sm font-medium text-gray-900">{item.sellerName}</span>
                              <div className="flex items-center">{renderStars(item.sellerRating)}</div>
                            </div>
                            <div className="text-xs text-gray-500">{item.sellerSales} sales</div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                              <MapPin className="w-3 h-3" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                              <Eye className="w-3 h-3" />
                              <span>{item.views} views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCondition("all")
                setPriceRange("all")
                setSortBy("newest")
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 