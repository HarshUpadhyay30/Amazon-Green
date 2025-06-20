"use client"

import { useParams } from "next/navigation"
import Header from "@/components/header"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { getProductsByCategory, categories, type Product } from "@/lib/products-data"
import { useState, useEffect } from "react"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [products, setProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState("all")

  const category = categories.find((cat) => cat.id === slug)

  useEffect(() => {
    let categoryProducts = getProductsByCategory(slug)

    // Apply sorting
    if (sortBy === "price-low") {
      categoryProducts = categoryProducts.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      categoryProducts = categoryProducts.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      categoryProducts = categoryProducts.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "green-rating") {
      categoryProducts = categoryProducts.sort((a, b) => b.greenRating - a.greenRating)
    }

    // Apply price filter
    if (priceRange === "under-25") {
      categoryProducts = categoryProducts.filter((p) => p.price < 25)
    } else if (priceRange === "25-50") {
      categoryProducts = categoryProducts.filter((p) => p.price >= 25 && p.price <= 50)
    } else if (priceRange === "50-100") {
      categoryProducts = categoryProducts.filter((p) => p.price >= 50 && p.price <= 100)
    } else if (priceRange === "over-100") {
      categoryProducts = categoryProducts.filter((p) => p.price > 100)
    }

    setProducts(categoryProducts)
  }, [slug, sortBy, priceRange])

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600">The category you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-gray-600 mt-1">Showing {products.length} sustainable products</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="green-rating">Green Rating</option>
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="all">All Prices</option>
              <option value="under-25">Under $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="over-100">Over $100</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or check back later for new products</p>
            <Button className="bg-green-600 hover:bg-green-700">View All Categories</Button>
          </div>
        )}

        {/* Load More */}
        {products.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
