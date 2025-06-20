"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, Menu, User, Leaf, Users, Recycle, Crown, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/components/cart-provider"
import { useSearch } from "@/components/search-provider"
import { categories } from "@/lib/products-data"
import { Sheet, SheetContent, SheetHeader, SheetFooter } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const { user, logout, isLoading } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { totalItems, clearCart } = useCart()
  const { setSearchQuery: setGlobalSearchQuery } = useSearch()
  const router = useRouter()
  const [primeOpen, setPrimeOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setGlobalSearchQuery(searchQuery)
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleAccountClick = () => {
    if (user) {
      router.push(user.type === "customer" ? "/customer/dashboard" : "/seller/dashboard")
    }
  }

  return (
    <header className="bg-gray-900 text-white">
      {/* Top bar */}
      <div className="bg-gray-800 px-4 py-1 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div />
          <div className="flex items-center gap-4 ml-auto">
            {!isLoading && (
              <>
               {user && (
              <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-400" onClick={() => router.push('/ecosmart')}>
                Mainpage
              </Button>
            )}
                <span>Hello, {user?.name || "Guest"}</span>
                
                {user ? (
                  <Button variant="ghost" size="sm" onClick={() => { logout(); clearCart(); }} className="text-white hover:text-green-400">
                    Sign Out
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-white hover:text-green-400">
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="flex items-center">
              <Leaf className="w-6 h-6 text-green-400" />
              <ShoppingCart className="w-5 h-5 text-orange-400 -ml-1" />
            </div>
            <span>
              amazon<span className="text-green-400">green</span>
            </span>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex">
              <select
                className="bg-gray-200 text-gray-900 px-3 py-2 rounded-l border-r border-gray-300"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Eco-Products</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Input
                type="text"
                placeholder="Search Amazon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 rounded-none border-0 focus:ring-0"
              />
              <Button type="submit" className="bg-orange-400 hover:bg-orange-500 text-gray-900 rounded-l-none px-4">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Green Prime Icon */}
          <button
            className="ml-4 flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none"
            onClick={() => setPrimeOpen(true)}
            aria-label="Green Prime Benefits"
            type="button"
          >
            <Crown className="w-5 h-5 text-yellow-200" />
            <span className="font-semibold text-white text-sm hidden sm:inline">Green Prime</span>
          </button>

          {/* Right side */}
          <div className="flex items-center gap-6 ml-4">
            <Link href="/cart" className="flex items-center gap-1 hover:text-green-400 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user && (
              <Button variant="ghost" className="text-white hover:text-green-400" onClick={handleAccountClick}>
                <User className="w-4 h-4 mr-1" />
                Account
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Green Prime Modal */}
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

      {/* Navigation */}
      <div className="bg-gray-700 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-6 text-sm overflow-x-auto">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-green-400 whitespace-nowrap"
            onClick={() => router.push("/products")}
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Button>
          <Link href="/category/clothing" className="hover:text-green-400 whitespace-nowrap">
            Sustainable Fashion
          </Link>
          <Link href="/category/electronics" className="hover:text-green-400 whitespace-nowrap">
            Green Electronics
          </Link>
          <Link href="/category/home-garden" className="hover:text-green-400 whitespace-nowrap">
            Eco Home & Garden
          </Link>
          <Link href="/category/personal-care" className="hover:text-green-400 whitespace-nowrap">
            Personal Care
          </Link>
          <Link href="/category/beauty-skincare" className="hover:text-green-400 whitespace-nowrap">
            Beauty & Skincare
          </Link>
          <Link href="/category/sports-fitness" className="hover:text-green-400 whitespace-nowrap">
            Sports & Fitness
          </Link>
          <Link href="/marketplace" className="relative group whitespace-nowrap">
            <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Users className="w-4 h-4" />
              <span className="font-semibold">Marketplace</span>
            </div>
          </Link>
          <Link href="/refurbished" className="relative group whitespace-nowrap">
            <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Recycle className="w-4 h-4" />
              <span className="font-semibold">Refurbished</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

