"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Leaf, Award, ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import ProductReviews from "@/components/product-reviews"
import { useCart } from "@/components/cart-provider"

export default function ProductDetailPage() {
  const params = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart()

  // Mock product data
  const product = {
    id: String(params.id),
    name: "Organic Cotton T-Shirt - Sustainable Fashion",
    price: 699,
    originalPrice: 899,
    rating: 4.5,
    reviewCount: 1247,
    greenRating: 5,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop", // front
      "https://brownliving.in/cdn/shop/files/human-nature-kids-unisex-organic-cotton-t-shirt-white-ek-saath-sustainable-kids-t-shirts-brown-living-hn-kt-white-2-325646.jpg?v=1720439122&width=1200", // back
      "https://notbasics.co.uk/cdn/shop/files/womens-organic-white-cotton-tshirt-back-view.png?crop=region&crop_height=2400&crop_left=26&crop_top=0&crop_width=1608&v=1744151022&width=1660", // side
      "https://brownliving.in/cdn/shop/files/ek-saath-womens-organic-cotton-t-shirt-white-ek-saath-sustainable-womens-t-shirt-brown-living-hn-wt-es-wh-s-904992.jpg?v=1720422377&width=975", // detail/closeup
    ],
    certifications: [
      {
        name: "Global Organic Textile Standard (GOTS)",
        description: "Ensures fibers are ≥70% organic, prohibits toxic inputs, and requires social criteria (wages, working conditions).",
      },
      {
        name: "OEKO‑TEX® Standard 100",
        description: "Certifies that every component (thread, button, dye) has been lab‑tested to be free from a long list of harmful chemicals.",
      },
      {
        name: "Global Recycled Standard (GRS)",
        description: "Verifies the percentage of recycled material (e.g. post‑consumer PET bottles → polyester yarn) and enforces environmental/social best practices.",
      },
      {
        name: "Cradle to Cradle Certified",
        description: "Assesses material chemistry, recyclability, renewable‑energy use, water stewardship, and social fairness—across five progressive levels.",
      },
      {
        name: "ClimatePartner Climate Neutral",
        description: "Verifies that a brand has calculated, reduced, and offset the garment's CO₂ footprint through certified offset projects.",
      },
    ],
    description: `This premium organic cotton t-shirt represents the perfect blend of comfort, style, and sustainability. Made from 100% GOTS-certified organic cotton, this shirt is not only incredibly soft and breathable but also produced with the highest environmental and social standards.

Key Features:
• 100% GOTS-certified organic cotton
• Fair Trade certified production
• Carbon-neutral manufacturing process
• Natural dyes with no harmful chemicals
• Pre-shrunk for lasting fit
• Available in multiple sustainable colors

Our commitment to sustainability extends beyond just the materials. Each shirt is produced in facilities powered by renewable energy, and we plant a tree for every purchase made. The packaging is 100% recyclable and made from post-consumer recycled materials.

Care Instructions: Machine wash cold with like colors, tumble dry low, iron on low heat if needed.`,
    prime: true,
    inStock: true,
  }

  const renderStars = (rating: number, isGreen = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? isGreen
              ? "fill-green-500 text-green-500"
              : "fill-yellow-400 text-yellow-400"
            : isGreen
              ? "text-green-200"
              : "text-gray-300"
        }`}
      />
    ))
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      greenRating: product.greenRating,
      certifications: product.certifications.length,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Ratings */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  <div className="flex items-center">{renderStars(product.greenRating, true)}</div>
                  <span className="text-sm text-green-600">Green Rating</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>
            </div>

            {/* Certifications - Made more prominent */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-800">
                <Award className="w-6 h-6 text-green-600" />
                Sustainability Certifications
              </h3>
              <div className="space-y-4">
                {product.certifications.map((cert, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-green-100">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-800 text-lg mb-2">{cert.name}</h4>
                        <p className="text-green-700 text-sm leading-relaxed">{cert.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Product Description</h3>
              <div className="text-gray-700 whitespace-pre-line">{product.description}</div>
            </div>

            {/* Add to Cart */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="font-medium">Quantity:</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="border rounded px-3 py-1"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                      disabled={!product.inStock}
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  {product.inStock ? (
                    <p className="text-green-600 text-sm">✓ In Stock</p>
                  ) : (
                    <p className="text-red-600 text-sm">Out of Stock</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Image Carousel */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? "border-orange-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <ProductReviews productId={String(params.id)} averageRating={product.rating} totalReviews={product.reviewCount} />
        </div>
      </div>
    </div>
  )
}
