"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Heart, Eye, Shield, Users, Star, ArrowLeft, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface RefurbishedItem {
  id: string
  title: string
  category: string
  originalPrice: number
  refurbishedPrice: number
  condition: "excellent" | "very-good" | "good" | "fair"
  description: string
  images: string[]
  warranty: string
  location: string
  views: number
  likes: number
  sellerName: string
  sellerRating: number
  sellerSales: number
  refurbishedBy: string
  createdAt: string
  features: string[]
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function RefurbishedCategoryPage({ params }: PageProps) {
  const { slug } = use(params)
  const [items, setItems] = useState<RefurbishedItem[]>([
    {
      id: "ref-1",
      title: "MacBook Pro 13\" (2020) - Refurbished",
      category: "laptops",
      originalPrice: 1299.0 * 83,
      refurbishedPrice: 899.0 * 83,
      condition: "excellent",
      description: "Fully refurbished MacBook Pro with 8GB RAM and 256GB SSD. Includes 1-year warranty.",
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      ],
      warranty: "1 Year",
      location: "Mumbai, Maharashtra",
      views: 156,
      likes: 23,
      sellerName: "Aarav S.",
      sellerRating: 4.9,
      sellerSales: 89,
      refurbishedBy: "Apple Certified",
      createdAt: "2024-01-20",
      features: ["Battery replaced", "Keyboard cleaned", "OS updated", "All ports tested"],
    },
    {
      id: "ref-2",
      title: "iPhone 12 Pro - 128GB - Refurbished",
      category: "phones",
      originalPrice: 999.0 * 83,
      refurbishedPrice: 649.0 * 83,
      condition: "very-good",
      description: "Refurbished iPhone 12 Pro in excellent condition. New battery and screen protector included.",
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      ],
      warranty: "6 Months",
      location: "Delhi, Delhi",
      views: 203,
      likes: 31,
      sellerName: "Priya R.",
      sellerRating: 4.8,
      sellerSales: 156,
      refurbishedBy: "Certified Technician",
      createdAt: "2024-01-18",
      features: ["New battery", "Screen protector", "Charger included", "30-day return"],
    },
    {
      id: "ref-3",
      title: "Sony WH-1000XM4 Headphones - Refurbished",
      category: "audio",
      originalPrice: 349.0 * 83,
      refurbishedPrice: 199.0 * 83,
      condition: "excellent",
      description: "Premium noise-canceling headphones, fully tested and cleaned. Like new condition.",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      ],
      warranty: "3 Months",
      location: "Bengaluru, Karnataka",
      views: 89,
      likes: 12,
      sellerName: "Rohan K.",
      sellerRating: 4.7,
      sellerSales: 67,
      refurbishedBy: "Sony Certified",
      createdAt: "2024-01-15",
      features: ["Deep cleaned", "New ear pads", "Bluetooth tested", "Case included"],
    },
    {
      id: "ref-4",
      title: "iPad Air 4th Gen - 64GB - Refurbished",
      category: "tablets",
      originalPrice: 599.0 * 83,
      refurbishedPrice: 399.0 * 83,
      condition: "good",
      description: "Refurbished iPad Air with minor cosmetic wear. Fully functional with new battery.",
      images: [
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
      ],
      warranty: "6 Months",
      location: "Chennai, Tamil Nadu",
      views: 134,
      likes: 18,
      sellerName: "Ananya M.",
      sellerRating: 4.6,
      sellerSales: 45,
      refurbishedBy: "Apple Certified",
      createdAt: "2024-01-12",
      features: ["New battery", "Screen tested", "Charger included", "Minor cosmetic wear"],
    },
    {
      id: "ref-5",
      title: "Dell XPS 15 - Refurbished Laptop",
      category: "laptops",
      originalPrice: 1499.0 * 83,
      refurbishedPrice: 999.0 * 83,
      condition: "very-good",
      description: "Powerful Dell XPS 15 with 16GB RAM and 512GB SSD. Professional refurbishment.",
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
      ],
      warranty: "1 Year",
      location: "Hyderabad, Telangana",
      views: 178,
      likes: 25,
      sellerName: "Vikram P.",
      sellerRating: 4.8,
      sellerSales: 112,
      refurbishedBy: "Dell Certified",
      createdAt: "2024-01-10",
      features: ["OS reinstalled", "Hardware tested", "New thermal paste", "90-day return"],
    },
    {
      id: "ref-6",
      title: "Samsung Galaxy S21 - 128GB - Refurbished",
      category: "phones",
      originalPrice: 799.0 * 83,
      refurbishedPrice: 449.0 * 83,
      condition: "good",
      description: "Refurbished Samsung Galaxy S21 with new battery and screen protector.",
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      ],
      warranty: "6 Months",
      location: "Kolkata, West Bengal",
      views: 167,
      likes: 22,
      sellerName: "Meera J.",
      sellerRating: 4.7,
      sellerSales: 89,
      refurbishedBy: "Samsung Certified",
      createdAt: "2024-01-08",
      features: ["New battery", "Screen protector", "Charger included", "Minor wear"],
    },
    {
      id: "ref-s1",
      title: "iPhone 13 Pro - Refurbished",
      category: "smartphones",
      originalPrice: 999.99 * 83,
      refurbishedPrice: 649.99 * 83,
      condition: "excellent",
      description: "Professionally refurbished iPhone 13 Pro with 128GB storage, Face ID, and triple camera system. Includes 1-year warranty.",
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      ],
      warranty: "1 Year",
      location: "Mumbai, Maharashtra",
      views: 156,
      likes: 23,
      sellerName: "TechHub Electronics",
      sellerRating: 4.8,
      sellerSales: 1247,
      refurbishedBy: "Apple Certified",
      createdAt: "2024-06-10",
      features: ["128GB Storage", "Face ID", "Triple Camera System", "5G Ready"],
    },
    {
      id: "ref-s2",
      title: "Samsung Galaxy S21 - Refurbished",
      category: "smartphones",
      originalPrice: 699.0 * 83,
      refurbishedPrice: 409.0 * 83,
      condition: "very-good",
      description: "Refurbished Samsung Galaxy S21 with new battery and screen protector. 128GB, 5G, and 6.2-inch display.",
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      ],
      warranty: "6 Months",
      location: "Delhi, Delhi",
      views: 203,
      likes: 31,
      sellerName: "Aditya N.",
      sellerRating: 4.7,
      sellerSales: 156,
      refurbishedBy: "Samsung Certified",
      createdAt: "2024-06-09",
      features: ["128GB Storage", "5G Ready", "New Battery", "Screen Protector"],
    },
    {
      id: "ref-s3",
      title: "Google Pixel 7 - Refurbished",
      category: "smartphones",
      originalPrice: 759.0 * 83,
      refurbishedPrice: 469.0 * 83,
      condition: "good",
      description: "Google Pixel 7, refurbished, 128GB, Android 13, 50MP camera, 5G. 6-month warranty included.",
      images: [
        "https://refitglobal.com/cdn/shop/files/Google_Pixel_7_Lemongrass_B_7f56d45a-f85f-4db5-8a97-6d11fb10e501.jpg?v=1724185006&width=416",
      ],
      warranty: "6 Months",
      location: "Kolkata, West Bengal",
      views: 167,
      likes: 22,
      sellerName: "Neha S.",
      sellerRating: 4.6,
      sellerSales: 89,
      refurbishedBy: "Google Certified",
      createdAt: "2024-06-08",
      features: ["128GB Storage", "Android 13", "50MP Camera", "5G Ready"],
    },
    {
      id: "ref-s4",
      title: "OnePlus 9 Pro - Refurbished",
      category: "smartphones",
      originalPrice: 723.0 * 83,
      refurbishedPrice: 259.0 * 83,
      condition: "very-good",
      description: "Refurbished OnePlus 9 Pro, 256GB, 5G, Hasselblad camera, 120Hz AMOLED display.",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQglPalTzjD4Oai7MQKvvo0PCr1DVMdduEJGw&s",
      ],
      warranty: "6 Months",
      location: "Bengaluru, Karnataka",
      views: 98,
      likes: 15,
      sellerName: "Ravi K.",
      sellerRating: 4.7,
      sellerSales: 54,
      refurbishedBy: "OnePlus Certified",
      createdAt: "2024-06-07",
      features: ["256GB Storage", "5G Ready", "Hasselblad Camera", "120Hz AMOLED"],
    },
    {
      id: "ref-s5",
      title: "Xiaomi Mi 11X - Refurbished",
      category: "smartphones",
      originalPrice: 699.0 * 83,
      refurbishedPrice: 399.0 * 83,
      condition: "good",
      description: "Xiaomi Mi 11X, 128GB, Snapdragon 870, 120Hz display, 48MP triple camera.",
      images: [
        "https://i02.appmifile.com/11_operator_in/23/04/2021/a3fa26aeb0a0e8ae38f38fb311d644e8.png",
      ],
      warranty: "6 Months",
      location: "Hyderabad, Telangana",
      views: 76,
      likes: 10,
      sellerName: "Sana P.",
      sellerRating: 4.5,
      sellerSales: 32,
      refurbishedBy: "Xiaomi Certified",
      createdAt: "2024-06-06",
      features: ["128GB Storage", "Snapdragon 870", "120Hz Display", "48MP Camera"],
    },
    {
      id: "ref-s6",
      title: "Realme GT Neo 2 - Refurbished",
      category: "smartphones",
      originalPrice: 709.0 * 83,
      refurbishedPrice: 419.0 * 83,
      condition: "very-good",
      description: "Realme GT Neo 2, 128GB, Snapdragon 870, 65W fast charging, 120Hz AMOLED.",
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      ],
      warranty: "6 Months",
      location: "Pune, Maharashtra",
      views: 54,
      likes: 8,
      sellerName: "Amit V.",
      sellerRating: 4.6,
      sellerSales: 21,
      refurbishedBy: "Realme Certified",
      createdAt: "2024-06-05",
      features: ["128GB Storage", "Snapdragon 870", "65W Fast Charging", "120Hz AMOLED"],
    },
  ])

  const [filteredItems, setFilteredItems] = useState<RefurbishedItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const categoryInfo = {
    laptops: { name: "Laptops & Computers", icon: "💻", color: "blue" },
    smartphones: { name: "Smartphones", icon: "📱", color: "green" },
    tablets: { name: "Tablets", icon: "📱", color: "purple" },
    audio: { name: "Audio & Headphones", icon: "🎧", color: "orange" },
    gaming: { name: "Gaming Consoles", icon: "🎮", color: "indigo" },
    cameras: { name: "Cameras & Photography", icon: "📷", color: "teal" },
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
      if (priceRange === "under-200") {
        filtered = filtered.filter((item) => item.refurbishedPrice < 200 * 83)
      } else if (priceRange === "200-500") {
        filtered = filtered.filter((item) => item.refurbishedPrice >= 200 * 83 && item.refurbishedPrice <= 500 * 83)
      } else if (priceRange === "500-1000") {
        filtered = filtered.filter((item) => item.refurbishedPrice >= 500 * 83 && item.refurbishedPrice <= 1000 * 83)
      } else if (priceRange === "over-1000") {
        filtered = filtered.filter((item) => item.refurbishedPrice > 1000 * 83)
      }
    }

    // Sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.refurbishedPrice - b.refurbishedPrice)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.refurbishedPrice - a.refurbishedPrice)
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => b.views + b.likes - (a.views + a.likes))
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    setFilteredItems(filtered)
  }, [items, slug, searchQuery, selectedCondition, priceRange, sortBy])

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent": return "bg-green-100 text-green-800"
      case "very-good": return "bg-blue-100 text-blue-800"
      case "good": return "bg-yellow-100 text-yellow-800"
      case "fair": return "bg-orange-100 text-orange-800"
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
            <Link href="/refurbished">
              <Button className="bg-green-600 hover:bg-green-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Refurbished
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
          <Link href="/refurbished" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Refurbished
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{category.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          </div>
          <p className="text-gray-600">
            Browse {filteredItems.length} refurbished items in {category.name.toLowerCase()}
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
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="very-good">Very Good</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
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
                        <SelectItem value="under-200">Under ₹200</SelectItem>
                        <SelectItem value="200-500">₹200 - ₹500</SelectItem>
                        <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                        <SelectItem value="over-1000">Over ₹1000</SelectItem>
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
              <Link href={`/refurbished/item/${item.id}`} key={item.id}>
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
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          {item.warranty}
                        </Badge>
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
                        <div>
                          <span className="text-2xl font-bold text-green-600">₹{item.refurbishedPrice.toLocaleString('en-IN')}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{item.likes}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                      {/* Refurbishment Info */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {item.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {feature}
                            </Badge>
                          ))}
                          {item.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{item.features.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

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
              className="bg-green-600 hover:bg-green-700"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 