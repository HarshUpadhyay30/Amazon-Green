import Image from "next/image"
import Link from "next/link"
import { Star, Leaf, Award } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  greenRating: number
  certifications: number
  image: string
  prime?: boolean
}

export default function ProductCard({ product }: { product: Product }) {
  const renderStars = (rating: number, isGreen = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
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

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
        <div className="aspect-square mb-3 relative">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover rounded" />
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

        <div className="flex items-center gap-1 mb-1">
          {renderStars(product.rating)}
          <span className="text-sm text-gray-600 ml-1">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
        </div>

        {/* Green rating and certifications - Made more prominent */}
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Leaf className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-600">Eco Rating:</span>
            {renderStars(product.greenRating, true)}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">{product.certifications}</span>
              </div>
              <span className="text-xs text-green-600 font-medium">Certifications</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
