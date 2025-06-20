"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import ProductDetails from "./ProductDetails"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  description?: string
  features?: string[]
  specifications?: { [key: string]: string }
  badge?: string
  discount?: string
}

export default function AmazonClone() {
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { logout } = useAuth()
  const { totalItems, addToCart, clearCart } = useCart()
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("amazon-green-user")
      if (storedUser) {
        const user = JSON.parse(storedUser)
        setUserName(user.name)
      }
    }
  }, [])

  const products: Product[] = [
    {
      id: 1,
      name: "Sony WH-1000XM4 Wireless Industry Leading Noise Canceling Overhead Headphones",
      price: 299.99 * 83,
      originalPrice: 349.99 * 83,
      image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
      badge: "Amazon's Choice",
      discount: "14% off",
      description:
        "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo.",
      features: [
        "Industry-leading noise canceling",
        "30-hour battery life",
        "Touch sensor controls",
        "Built-in Alexa",
        "High-resolution audio",
      ],
      specifications: {
        "Battery Life": "30 hours",
        "Bluetooth Version": "5.0",
        Weight: "254g",
        "Charging Time": "3 hours",
        "Water Resistance": "No",
      },
    },
    {
      id: 2,
      name: "Samsung Galaxy S21 5G Android Smartphone 128GB Unlocked Phantom Gray",
      price: 699.99 * 83,
      originalPrice: 799.99 * 83,
      image: "https://m.media-amazon.com/images/I/91iwO+XKsVL.jpg",
      badge: "Best Seller",
      discount: "13% off",
      description:
        "The Samsung Galaxy S21 features a stunning 6.2-inch Dynamic AMOLED display, powerful Snapdragon 888 processor, and a versatile triple camera system.",
      features: [
        "6.2-inch Dynamic AMOLED display",
        "Snapdragon 888 processor",
        "Triple camera system",
        "5G capable",
        "All-day battery life",
      ],
      specifications: {
        Display: "6.2-inch Dynamic AMOLED",
        Processor: "Snapdragon 888",
        RAM: "8GB",
        Storage: "128GB",
        Battery: "4000mAh",
      },
    },
    {
      id: 3,
      name: "HP Pavilion 15.6 inch FHD Laptop, AMD Ryzen 5, 8GB RAM, 256GB SSD",
      price: 599.49 * 83,
      originalPrice: 699.99 * 83,
      image: "https://m.media-amazon.com/images/I/71lWuRFiCoL._UF1000,1000_QL80_.jpg",
      discount: "14% off",
      description:
        "Powerful performance meets sleek design with the HP Pavilion laptop. Perfect for work, entertainment, and everything in between.",
      features: ["AMD Ryzen processor", "15.6-inch Full HD display", "8GB RAM", "256GB SSD storage", "Windows 11 Home"],
      specifications: {
        Processor: "AMD Ryzen 5",
        Display: "15.6-inch Full HD",
        RAM: "8GB",
        Storage: "256GB SSD",
        OS: "Windows 11 Home",
      },
    },
    {
      id: 4,
      name: "Regular Cotton T-Shirt - Classic Fit",
      price: 1299,
      originalPrice: 1499,
      image: "https://fullyfilmy.in/cdn/shop/products/New-Mockups---no-hanger---TShirt-Yellow.jpg?v=1747992993",
      badge: undefined,
      discount: "13% off",
      description:
        "A classic fit, regular cotton t-shirt. Soft, comfortable, and perfect for everyday wear. Not made with organic or sustainable materials.",
      features: [
        "100% regular cotton",
        "Classic fit",
        "Available in multiple colors",
        "Machine washable",
        "Durable and comfortable",
        "No special certifications",
        "Standard packaging"
      ],
      specifications: {
        "Material": "100% Cotton",
        "Fit": "Classic",
        "Colors": "White, Black, Blue, Red",
        "Sizes": "S, M, L, XL, XXL",
        "Care": "Machine wash cold, tumble dry low",
        "Origin": "Made in India",
        "Sustainability": "None"
      },
    },
    {
      id: 5,
      name: "Apple AirPods Pro (2nd Generation) Wireless Earbuds with MagSafe Case",
      price: 199.99 * 83,
      originalPrice: 249.99 * 83,
      image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg",
      badge: "Best Seller",
      discount: "20% off",
    },
    {
      id: 6,
      name: "Nintendo Switch OLED Model with White Joy-Con Controllers",
      price: 349.99 * 83,
      originalPrice: 399.99 * 83,
      image: "https://m.media-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg",
      badge: "Amazon's Choice",
      discount: "13% off",
    },
    {
      id: 7,
      name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker",
      price: 79.99 * 83,
      originalPrice: 99.99 * 83,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR-6qrfz1Dc-bwmjQt3puwxw0QB4Wt6lmIow&s",
      badge: "Amazon's Choice",
      discount: "20% off",
    },
    {
      id: 8,
      name: "Echo Dot (5th Gen) Smart Speaker with Alexa | Charcoal",
      price: 39.99 * 83,
      originalPrice: 49.99 * 83,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgD5EXxwdVhwpvfh-G7UgqCAU1DXSQtud8Aw&s",
      discount: "20% off",
    },
  ]

  const handleAmazonGreen = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("amazon-green-user")
      if (storedUser) {
        const user = JSON.parse(storedUser)
        if (user.type === "customer") {
          router.push("/customer/dashboard")
          return
        } else if (user.type === "seller") {
          router.push("/seller/dashboard")
          return
        }
      }
    }
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Greeting Strip */}
      <div className="w-full bg-[#232f3e] text-white text-sm">
        <div className="max-w-6xl mx-auto flex justify-end items-center px-4 py-3 gap-4">
          <span>Hello, {userName ?? "Guest"}</span>
          <button
            onClick={() => { logout(); clearCart(); }}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition text-white text-xs font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>
      {/* Amazon-style Header */}
      <header className="bg-[#131921] text-white py-2 sticky top-0 z-40 shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl" role="img" aria-label="cart">🛒</span>
            <span className="text-2xl font-bold cursor-pointer hover:text-orange-300 transition-colors select-none" onClick={() => router.push("/")}>amazon</span>
          </div>
          {/* Search bar */}
          <div className="flex-grow mx-2 max-w-2xl">
            <div className="relative flex rounded-lg overflow-hidden">
              {/* Filter Dropdown */}
              <button className="flex items-center px-4 py-3 bg-gray-200 text-black font-normal text-base rounded-l-lg border-r border-gray-300 focus:outline-none">
                Select Category
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search Amazon"
                className="flex-grow px-4 py-3 text-gray-700 text-base font-normal focus:outline-none bg-white"
                style={{ minWidth: 0 }}
              />
              <button className="px-6 bg-[#ff9900] hover:bg-[#f3a847] text-black text-lg rounded-r-lg transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
          {/* Right section */}
          <div className="flex items-center space-x-4 text-sm">
            {/* Prime Button */}
            <button
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow"
              style={{ fontSize: '1rem' }}
            >
              <span className="text-xl mr-1" role="img" aria-label="crown">👑</span>
              Prime
            </button>
            <button
              className="relative flex items-center hover:text-orange-300 transition-colors"
              onClick={() => router.push("/cart")}
            >
              <span className="text-2xl mr-1" role="img" aria-label="cart">🛍️</span>
              <span className="absolute -top-1 -right-1 text-xs bg-[#febd69] text-black px-1.5 py-0.5 rounded-full font-bold">
                {totalItems}
              </span>
            </button>
            <button
              className="flex items-center gap-1 hover:text-orange-300 transition-colors"
              onClick={() => router.push('/customer/dashboard')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              Account
            </button>
          </div>
        </div>
      </header>
      {/* Category Navigation Strip */}
      <nav className="w-full bg-[#232f3e] text-white text-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-6 overflow-x-auto px-4 py-3">
          <button
            className="flex items-center gap-1 hover:text-orange-300 transition-colors font-semibold"
            onClick={() => router.push("/ecosmart")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
            </svg>
            Home
          </button>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">Electronics</span>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">Books</span>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">Fashion</span>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">Home & Kitchen</span>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">Toys</span>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">Sports</span>
          <span className="cursor-pointer hover:text-orange-300 transition-colors whitespace-nowrap">More</span>
          <button
            onClick={handleAmazonGreen}
            className="ml-auto bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition text-white text-sm font-semibold shadow"
          >
            🌱 AmazonGreen
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative h-56 flex items-center justify-center bg-gradient-to-r from-yellow-50 to-blue-50 mb-8">
        <div className="text-center z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Welcome to Amazon Marketplace</h2>
          <p className="text-gray-700 text-lg">Everything you need, delivered to your door. Discover millions of products at great prices.</p>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop')] bg-cover bg-center" />
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h3>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer flex flex-col"
              onClick={() => router.push(`/ecosmart/${product.id}`)}
            >
              <div className="relative h-44 bg-gray-50 rounded-t-lg flex items-center justify-center">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h4 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h4>
                <div className="mt-auto flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <button
                  className="mt-4 w-full bg-[#febd69] hover:bg-[#f3a847] text-black text-sm font-semibold py-2 rounded-md transition"
                  onClick={e => {
                    e.stopPropagation()
                    addToCart({
                      id: String(product.id),
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      greenRating: 0,
                      certifications: 0
                    })
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full bg-[#232f3e] text-white mt-12 py-6 text-center text-sm">
        <div className="font-bold text-lg mb-1">amazon</div>
        <div>© 2024, Amazon.com, Inc. or its affiliates</div>
      </footer>

      {/* Product Details Modal */}
      {selectedProduct && <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
