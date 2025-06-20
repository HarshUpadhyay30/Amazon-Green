"use client"

import Image from "next/image"
import { useState } from "react"

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

interface ProductDetailsProps {
  product: Product
  onClose: () => void
  fullPage?: boolean
  recommendations?: React.ReactNode
}

const placeholderImages = [
  "https://media.istockphoto.com/id/516114395/photo/man-posing-with-blank-yellow-shirt.jpg?s=612x612&w=0&k=20&c=PGvwPMlCeDTlChNOqSuQBJCped6GSIuzpJrfrUMxs_s=",
  "https://outoforder.in/wp-content/uploads/2020/03/Womens-Yellow-T-shirt-zoom-01-1.jpg",
  "https://www.bushirt.in/cdn/shop/files/8_2bf84e70-ebbc-4464-8e50-33507feaaa39_1800x1800.jpg?v=1698990168",
]

export default function ProductDetails({ product, onClose, fullPage = false, recommendations }: ProductDetailsProps) {
  const images = [product.image, ...placeholderImages]
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  // For demo: fake rating and stock
  const rating = 4.5
  const reviewCount = 1234
  const inStock = true

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10 border border-gray-100">
        {/* Left: Product Images */}
        <div className="flex flex-col items-center w-full">
          <div className="relative w-full h-80 md:h-[440px] bg-gray-50 rounded-xl border border-gray-200 mb-4 flex items-center justify-center shadow-sm overflow-hidden">
            {/* Badge overlay */}
            {product.badge && (
              <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded shadow z-10 animate-pulse-green">
                {product.badge}
              </span>
            )}
            {/* Discount overlay */}
            {product.discount && (
              <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow z-10">
                {product.discount}
              </span>
            )}
            <Image
              src={images[currentImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Carousel arrows */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
              onClick={() => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
              onClick={() => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 mt-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`w-14 h-14 border-2 rounded-lg overflow-hidden ${currentImage === idx ? "border-orange-400" : "border-gray-200 hover:border-gray-300"}`}
                onClick={() => setCurrentImage(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} view ${idx + 1}`}
                  width={56}
                  height={56}
                  className="object-contain w-full h-full p-1"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-5 w-full">
          {/* Product Name */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-1">{product.name}</h1>

          {/* Rating and Stock */}
          <div className="flex items-center gap-3 mb-1">
            {/* Stars */}
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map((star) => (
                <svg key={star} className={`w-5 h-5 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">{rating} ({reviewCount} ratings)</span>
            <span className={`ml-4 text-xs font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>{inStock ? 'In Stock' : 'Out of Stock'}</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-2">
            <span className="text-3xl font-bold text-red-600">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
            {product.discount && (
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">{product.discount}</span>
            )}
          </div>

          {/* Add to Cart & Buy Now */}
          <div className="flex gap-3 mb-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#febd69] hover:bg-[#f3a847] text-black font-semibold py-2 rounded-md transition-colors text-base shadow-sm border border-yellow-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 6h13l-1.5 9H7.5L7 6z" /><circle cx="9" cy="21" r="1.5" /><circle cx="17" cy="21" r="1.5" /></svg>
              Add to Cart
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#ff9900] hover:bg-[#e88900] text-white font-semibold py-2 rounded-md transition-colors text-base shadow-sm border border-orange-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              Buy Now
            </button>
          </div>

          {/* Sustainable Alternatives */}
          {recommendations && (
            <section className="mb-2 bg-green-50 border border-green-200 rounded-lg p-4">
              <div>{recommendations}</div>
            </section>
          )}

          {/* Product Description */}
          {product.description && (
            <div className="mt-4 border-t pt-4">
              <h3 className="text-lg font-semibold mb-1">Product Description</h3>
              <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
