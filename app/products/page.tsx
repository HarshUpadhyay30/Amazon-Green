"use client"

import { useState } from "react"
import Header from "@/components/header"
import ProductCard from "@/components/product-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Leaf, 
  Award, 
  Star,
  ArrowRight
} from "lucide-react"
import { categories, allProducts, type Product } from "@/lib/products-data"
import Link from "next/link"
import Image from "next/image"

export default function ProductsPage() {
  // Get trending products (top rated products)
  const trendingProducts = allProducts
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8)

  const getCategoryIcon = (icon: string) => {
    return <span className="text-2xl">{icon}</span>
  }

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'clothing': return 'bg-blue-50 border-blue-200 hover:bg-blue-100'
      case 'electronics': return 'bg-green-50 border-green-200 hover:bg-green-100'
      case 'footwear': return 'bg-purple-50 border-purple-200 hover:bg-purple-100'
      case 'home-garden': return 'bg-orange-50 border-orange-200 hover:bg-orange-100'
      case 'personal-care': return 'bg-pink-50 border-pink-200 hover:bg-pink-100'
      case 'beauty-skincare': return 'bg-rose-50 border-rose-200 hover:bg-rose-100'
      case 'sports-fitness': return 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
      case 'books-education': return 'bg-amber-50 border-amber-200 hover:bg-amber-100'
      case 'pet-care': return 'bg-teal-50 border-teal-200 hover:bg-teal-100'
      case 'baby-kids': return 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100'
      case 'office-stationery': return 'bg-slate-50 border-slate-200 hover:bg-slate-100'
      case 'outdoor-camping': return 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
      default: return 'bg-gray-50 border-gray-200 hover:bg-gray-100'
    }
  }

  const getCategoryTextColor = (categoryId: string) => {
    switch (categoryId) {
      case 'clothing': return 'text-blue-800'
      case 'electronics': return 'text-green-800'
      case 'footwear': return 'text-purple-800'
      case 'home-garden': return 'text-orange-800'
      case 'personal-care': return 'text-pink-800'
      case 'beauty-skincare': return 'text-rose-800'
      case 'sports-fitness': return 'text-indigo-800'
      case 'books-education': return 'text-amber-800'
      case 'pet-care': return 'text-teal-800'
      case 'baby-kids': return 'text-cyan-800'
      case 'office-stationery': return 'text-slate-800'
      case 'outdoor-camping': return 'text-emerald-800'
      default: return 'text-gray-800'
    }
  }

  const getCategoryImage = (categoryId: string) => {
    switch (categoryId) {
      case 'clothing': return 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'
      case 'electronics': return 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
      case 'footwear': return 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop'
      case 'home-garden': return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
      case 'personal-care': return 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=300&fit=crop'
      case 'beauty-skincare': return 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop'
      case 'sports-fitness': return 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
      case 'books-education': return 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop'
      case 'pet-care': return 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop'
      case 'baby-kids': return 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop'
      case 'office-stationery': return 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop'
      case 'outdoor-camping': return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
      default: return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Sustainable Categories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover eco-friendly products across all categories. Each item is carefully selected for its environmental impact and sustainability credentials.
          </p>
          </div>

        {/* Categories Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
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
                          <p className="text-white/80 text-xs">Explore eco-friendly options</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-gray-600">Sustainable</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Products Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Trending Right Now</h2>
            </div>
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
              <Star className="w-3 h-3 mr-1" />
              Top Rated
            </Badge>
          </div>
          
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

          <div className="text-center mt-8">
            <Link href="/search">
              <Button variant="outline" size="lg" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                <TrendingUp className="w-4 h-4 mr-2" />
                View All Trending Products
          </Button>
            </Link>
          </div>
        </div>

        {/* Sustainability Stats */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-2">Why Choose Amazon?</h2>
            <p className="text-green-700">Every product is carefully vetted for sustainability and environmental impact</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Certified Sustainable</h3>
              <p className="text-green-700 text-sm">All products meet strict environmental standards</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Carbon Neutral</h3>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Quality Guaranteed</h3>
              <p className="text-green-700 text-sm">Premium eco-friendly products with excellent reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
