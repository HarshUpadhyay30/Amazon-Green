"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { searchProducts, type Product } from "@/lib/products-data"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [products, setProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState("all")

  useEffect(() => {
    if (query) {
      let results = searchProducts(query)

      // Apply sorting
      if (sortBy === "price-low") {
        results = results.sort((a, b) => a.price - b.price)
      } else if (sortBy === "price-high") {
        results = results.sort((a, b) => b.price - a.price)
      } else if (sortBy === "rating") {
        results = results.sort((a, b) => b.rating - a.rating)
      } else if (sortBy === "green-rating") {
        results = results.sort((a, b) => b.greenRating - a.greenRating)
      }

      // Apply price filter
      if (priceRange === "under-25") {
        results = results.filter((p) => p.price < 25)
      } else if (priceRange === "25-50") {
        results = results.filter((p) => p.price >= 25 && p.price <= 50)
      } else if (priceRange === "50-100") {
        results = results.filter((p) => p.price >= 50 && p.price <= 100)
      } else if (priceRange === "over-100") {
        results = results.filter((p) => p.price > 100)
      }

      setProducts(results)
    }
  }, [query, sortBy, priceRange])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Results Header */}
        <div className="flex items-center gap-2 mb-6">
          <Search className="w-5 h-5 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">Search results for "{query}"</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? "result" : "results"} found
          </p>

          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="relevance">Sort by Relevance</option>
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

        {/* Search Results */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or browse our categories</p>
            <Button className="bg-green-600 hover:bg-green-700">Browse All Products</Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
