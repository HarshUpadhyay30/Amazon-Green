"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Package,
  DollarSign,
  TrendingUp,
  Plus,
  Upload,
  Leaf,
  Award,
  Eye,
  BarChart3,
  Star,
  Globe,
  Flag,
  MapPin,
  Recycle,
  RefreshCw,
  Shield,
  Clock,
  Camera,
  Repeat,
  Edit,
} from "lucide-react"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Product {
  id: string
  name: string
  price: number
  status: "active" | "pending" | "inactive"
  views: number
  orders: number
  revenue: number
  rating: number
  reviewCount: number
  image: string
  createdAt: string
  type: "new" | "refurbished"
  category: string
}

interface RefurbishedProduct extends Product {
  type: "refurbished"
  condition: "like-new" | "very-good" | "good" | "acceptable"
  warrantyMonths: number
  originalAccessories: string[]
  missingAccessories: string[]
  cosmeticCondition: string
  functionalityTested: boolean
  originalPackaging: boolean
  returnDays: number
}

const productCategories = [
  {
    id: "clothing",
    name: "Clothing & Apparel",
    description: "Sustainable fashion, organic textiles, eco-friendly clothing",
    fields: ["size", "material", "color", "brand", "careInstructions"],
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Energy-efficient devices, refurbished electronics, eco-tech",
    fields: ["brand", "model", "specifications", "energyRating", "warranty"],
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    description: "Eco-friendly home products, sustainable gardening supplies",
    fields: ["dimensions", "material", "capacity", "powerSource", "installation"],
  },
  {
    id: "beauty-health",
    name: "Beauty & Health",
    description: "Natural cosmetics, organic health products, cruelty-free items",
    fields: ["ingredients", "skinType", "volume", "expiryDate", "certifications"],
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    description: "Sustainable sports gear, eco-friendly outdoor equipment",
    fields: ["size", "weight", "material", "weatherResistance", "activityType"],
  },
  {
    id: "books-media",
    name: "Books & Media",
    description: "Educational content, sustainable living guides, eco-awareness media",
    fields: ["author", "publisher", "isbn", "format", "language"],
  },
  {
    id: "toys-games",
    name: "Toys & Games",
    description: "Eco-friendly toys, educational games, sustainable play items",
    fields: ["ageRange", "material", "safetyStandards", "batteryType", "dimensions"],
  },
  {
    id: "automotive",
    name: "Automotive",
    description: "Electric vehicle accessories, eco-friendly car products",
    fields: ["compatibility", "material", "installation", "warranty", "certification"],
  },
  {
    id: "food-beverages",
    name: "Food & Beverages",
    description: "Organic foods, sustainable packaging, eco-friendly beverages",
    fields: ["ingredients", "nutritionFacts", "expiryDate", "storage", "certifications"],
  },
  {
    id: "office-supplies",
    name: "Office Supplies",
    description: "Recycled paper products, eco-friendly office equipment",
    fields: ["dimensions", "material", "compatibility", "recycledContent", "certifications"],
  },
]

export default function SellerDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showAddRefurbished, setShowAddRefurbished] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "refurbished">("overview")
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Eco-Friendly Bamboo Toothbrush Set",
      price: 199,
      status: "active",
      views: 1247,
      orders: 89,
      revenue: 1156.11,
      rating: 4.5,
      reviewCount: 67,
      image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop",
      createdAt: "2024-01-15",
      type: "new",
      category: "beauty-health",
    },
    {
      id: "2",
      name: "Solar-Powered Phone Charger",
      price: 749,
      status: "active",
      views: 892,
      orders: 34,
      revenue: 1563.66,
      rating: 4.2,
      reviewCount: 28,
      image: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=300&h=300&fit=crop",
      createdAt: "2024-01-10",
      type: "new",
      category: "electronics",
    },
  ])

  const [refurbishedProducts, setRefurbishedProducts] = useState<RefurbishedProduct[]>([
    {
      id: "ref-1",
      name: "Refurbished MacBook Air 13-inch",
      price: 79999,
      status: "active",
      views: 2341,
      orders: 12,
      revenue: 10799.88,
      rating: 4.6,
      reviewCount: 45,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      createdAt: "2024-01-12",
      type: "refurbished",
      category: "electronics",
      condition: "very-good",
      warrantyMonths: 12,
      originalAccessories: ["Power Adapter", "USB-C Cable", "Documentation"],
      missingAccessories: [],
      cosmeticCondition: "Minor scratches on the lid, screen is pristine",
      functionalityTested: true,
      originalPackaging: false,
      returnDays: 90,
    },
  ])

  const [productForm, setProductForm] = useState({
    category: "",
    itemName: "",
    manufacturerName: "",
    price: "",
    packagingCert: "",
    materialCert: "",
    description: "",
    images: [] as File[],
    packagingCertFile: null as File | null,
    materialCertFile: null as File | null,
    otherCertFiles: [] as File[],
    // Category-specific fields
    categoryFields: {} as Record<string, string>,
  })

  const [refurbishedForm, setRefurbishedForm] = useState({
    itemName: "",
    brand: "",
    model: "",
    category: "",
    price: "",
    condition: "",
    warrantyMonths: "12",
    originalAccessories: [] as string[],
    missingAccessories: [] as string[],
    cosmeticCondition: "",
    functionalityTested: false,
    originalPackaging: false,
    returnDays: "90",
    description: "",
    images: [] as File[],
    certificationDocs: [] as File[],
  })

  useEffect(() => {
    if (!isLoading && (!user || user.type !== "seller")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  if (!user || user.type !== "seller") {
    return null
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductForm((prev) => ({
        ...prev,
        images: Array.from(e.target.files || []),
      }))
    }
  }

  const handleRefurbishedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setRefurbishedForm((prev) => ({
        ...prev,
        images: Array.from(e.target.files || []),
      }))
    }
  }

  const handleCertificationDocsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setRefurbishedForm((prev) => ({
        ...prev,
        certificationDocs: Array.from(e.target.files || []),
      }))
    }
  }

  const handlePackagingCertFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductForm((prev) => ({
        ...prev,
        packagingCertFile: e.target.files![0],
      }))
    }
  }

  const handleMaterialCertFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductForm((prev) => ({
        ...prev,
        materialCertFile: e.target.files![0],
      }))
    }
  }

  const handleOtherCertFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductForm((prev) => ({
        ...prev,
        otherCertFiles: Array.from(e.target.files || []),
      }))
    }
  }

  const handleCategoryFieldChange = (fieldName: string, value: string) => {
    setProductForm((prev) => ({
      ...prev,
      categoryFields: {
        ...prev.categoryFields,
        [fieldName]: value,
      },
    }))
  }

  const handleCategoryChange = (categoryId: string) => {
    setProductForm((prev) => ({
      ...prev,
      category: categoryId,
      categoryFields: {}, // Reset category-specific fields when category changes
    }))
  }

  const handleAccessoryChange = (accessory: string, checked: boolean, type: "original" | "missing") => {
    setRefurbishedForm((prev) => ({
      ...prev,
      [type === "original" ? "originalAccessories" : "missingAccessories"]: checked
        ? [...prev[type === "original" ? "originalAccessories" : "missingAccessories"], accessory]
        : prev[type === "original" ? "originalAccessories" : "missingAccessories"].filter((item) => item !== accessory),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (
      !productForm.category ||
      !productForm.itemName ||
      !productForm.manufacturerName ||
      !productForm.price ||
      !productForm.description
    ) {
      alert("Please fill in all required fields")
      return
    }

    if (productForm.images.length < 7) {
      alert("Please upload at least 7 well-lit images from different angles")
      return
    }

    // Create new product
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      name: productForm.itemName,
      price: Number.parseFloat(productForm.price),
      status: "pending",
      views: 0,
      orders: 0,
      revenue: 0,
      rating: 0,
      reviewCount: 0,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=300&fit=crop",
      createdAt: new Date().toISOString().split("T")[0],
      type: "new",
      category: productForm.category,
    }

    setProducts((prev) => [newProduct, ...prev])
    setShowAddProduct(false)
    setProductForm({
      category: "",
      itemName: "",
      manufacturerName: "",
      price: "",
      packagingCert: "",
      materialCert: "",
      description: "",
      images: [],
      packagingCertFile: null,
      materialCertFile: null,
      otherCertFiles: [],
      categoryFields: {},
    })

    // Show success message
    alert("Product added successfully! It will be reviewed and published within 24 hours.")
  }

  const handleRefurbishedSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (
      !refurbishedForm.itemName ||
      !refurbishedForm.brand ||
      !refurbishedForm.category ||
      !refurbishedForm.price ||
      !refurbishedForm.condition ||
      !refurbishedForm.description
    ) {
      alert("Please fill in all required fields")
      return
    }

    if (refurbishedForm.images.length < 5) {
      alert("Please upload at least 5 verification photos covering all required angles")
      return
    }

    // Create new refurbished product
    const newRefurbishedProduct: RefurbishedProduct = {
      id: `ref-${refurbishedProducts.length + 1}`,
      name: `${refurbishedForm.brand} ${refurbishedForm.model || refurbishedForm.itemName} - Refurbished`,
      price: Number.parseFloat(refurbishedForm.price),
      status: "pending",
      views: 0,
      orders: 0,
      revenue: 0,
      rating: 0,
      reviewCount: 0,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=300&fit=crop",
      createdAt: new Date().toISOString().split("T")[0],
      type: "refurbished",
      category: refurbishedForm.category,
      condition: refurbishedForm.condition as "like-new" | "very-good" | "good" | "acceptable",
      warrantyMonths: Number.parseInt(refurbishedForm.warrantyMonths),
      originalAccessories: refurbishedForm.originalAccessories,
      missingAccessories: refurbishedForm.missingAccessories,
      cosmeticCondition: refurbishedForm.cosmeticCondition,
      functionalityTested: refurbishedForm.functionalityTested,
      originalPackaging: refurbishedForm.originalPackaging,
      returnDays: Number.parseInt(refurbishedForm.returnDays),
    }

    setRefurbishedProducts((prev) => [newRefurbishedProduct, ...prev])
    setShowAddRefurbished(false)
    setRefurbishedForm({
      itemName: "",
      brand: "",
      model: "",
      category: "",
      price: "",
      condition: "",
      warrantyMonths: "12",
      originalAccessories: [],
      missingAccessories: [],
      cosmeticCondition: "",
      functionalityTested: false,
      originalPackaging: false,
      returnDays: "90",
      description: "",
      images: [],
      certificationDocs: [],
    })

    // Show success message
    alert("Refurbished product added successfully! It will be reviewed and published within 24 hours.")
  }

  const totalRevenue =
    products.reduce((sum, product) => sum + product.revenue, 0) +
    refurbishedProducts.reduce((sum, product) => sum + product.revenue, 0)
  const totalOrders =
    products.reduce((sum, product) => sum + product.orders, 0) +
    refurbishedProducts.reduce((sum, product) => sum + product.orders, 0)
  const totalViews =
    products.reduce((sum, product) => sum + product.views, 0) +
    refurbishedProducts.reduce((sum, product) => sum + product.views, 0)

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "like-new":
        return "bg-green-100 text-green-800"
      case "very-good":
        return "bg-blue-100 text-blue-800"
      case "good":
        return "bg-yellow-100 text-yellow-800"
      case "acceptable":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Updated accessories for different categories
  const getAccessoriesForCategory = (category: string) => {
    switch (category) {
      case "electronics":
        return [
          "Power Adapter",
          "USB Cable",
          "USB-C Cable",
          "Lightning Cable",
          "Headphones",
          "Earbuds",
          "Remote Control",
          "Documentation",
          "Original Box",
          "Charging Case",
          "Screen Protector",
          "Protective Case",
        ]
      case "jewelry":
        return [
          "Original Box",
          "Certificate of Authenticity",
          "Warranty Card",
          "Cleaning Cloth",
          "Jewelry Pouch",
          "Documentation",
          "Appraisal Certificate",
          "Care Instructions",
        ]
      case "home-appliances":
        return [
          "Power Cord",
          "Remote Control",
          "User Manual",
          "Original Box",
          "Warranty Card",
          "Installation Guide",
          "Accessories Kit",
          "Cleaning Tools",
        ]
      case "sports-fitness":
        return [
          "Carrying Case",
          "Straps/Bands",
          "Charger",
          "User Manual",
          "Original Box",
          "Warranty Card",
          "Accessories Kit",
          "Cleaning Cloth",
        ]
      case "cameras":
        return [
          "Battery",
          "Charger",
          "Memory Card",
          "Camera Strap",
          "Lens Cap",
          "USB Cable",
          "User Manual",
          "Original Box",
          "Carrying Case",
          "Cleaning Kit",
        ]
      case "musical-instruments":
        return [
          "Case/Bag",
          "Cables",
          "Power Adapter",
          "Picks/Sticks",
          "User Manual",
          "Original Box",
          "Warranty Card",
          "Accessories Kit",
        ]
      default:
        return [
          "Original Box",
          "User Manual",
          "Warranty Card",
          "Power Adapter",
          "Cables",
          "Documentation",
          "Accessories Kit",
          "Cleaning Cloth",
        ]
    }
  }

  const refurbishedCategories = [
    { id: "electronics", name: "Electronics", description: "Phones, Laptops, Tablets, Headphones" },
    { id: "jewelry", name: "Jewelry & Watches", description: "Rings, Necklaces, Watches, Luxury Items" },
    { id: "home-appliances", name: "Home & Kitchen", description: "Appliances, Cookware, Home Decor" },
    { id: "sports-fitness", name: "Sports & Fitness", description: "Exercise Equipment, Outdoor Gear" },
    { id: "cameras", name: "Cameras & Photography", description: "DSLR, Mirrorless, Lenses, Accessories" },
    { id: "musical-instruments", name: "Musical Instruments", description: "Guitars, Keyboards, Audio Equipment" },
    { id: "automotive", name: "Automotive", description: "Car Parts, Accessories, Tools" },
    { id: "collectibles", name: "Collectibles & Antiques", description: "Art, Vintage Items, Memorabilia" },
  ]

  const renderCategorySpecificFields = (categoryId: string) => {
    const category = productCategories.find((cat) => cat.id === categoryId)
    if (!category) return null

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Category-Specific Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {category.fields.map((field) => (
            <div key={field}>
              <Label htmlFor={field} className="capitalize">
                {field.replace(/([A-Z])/g, " $1").trim()} *
              </Label>
              {field === "description" || field === "ingredients" || field === "careInstructions" ? (
                <Textarea
                  id={field}
                  value={productForm.categoryFields[field] || ""}
                  onChange={(e) => handleCategoryFieldChange(field, e.target.value)}
                  placeholder={`Enter ${field
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .toLowerCase()}`}
                  required
                />
              ) : (
                <Input
                  id={field}
                  value={productForm.categoryFields[field] || ""}
                  onChange={(e) => handleCategoryFieldChange(field, e.target.value)}
                  placeholder={`Enter ${field
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .toLowerCase()}`}
                  required
                />
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Dashboard Header with Gradient and Summary Bar */}
      <div className="bg-gradient-to-r from-green-100 via-emerald-100 to-blue-100 py-8 px-4 mb-8 rounded-b-3xl shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-200 flex items-center justify-center text-2xl font-bold text-green-700 shadow">
              <Leaf className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome, {user.name}</h1>
              <div className="text-green-700 text-sm font-medium">Seller Dashboard</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex bg-white rounded-lg p-1 border">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </Button>
            <Button
              variant={activeTab === "products" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("products")}
            >
              New Products
            </Button>
            <Button
              variant={activeTab === "refurbished" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("refurbished")}
              className="flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              Refurbished
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowAddProduct(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
            <Button onClick={() => setShowAddRefurbished(true)} className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Add Refurbished
            </Button>
          </div>
        </div>

        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="w-5 h-5 text-blue-500 bg-blue-100 rounded-full p-1" />
                    Total Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{products.length + refurbishedProducts.length}</div>
                  <p className="text-sm text-gray-600">{products.length} new, {refurbishedProducts.length} refurbished</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="w-5 h-5 text-green-500 bg-green-100 rounded-full p-1" />
                    Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</div>
                  <p className="text-sm text-gray-600">Total earnings</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5 text-purple-500 bg-purple-100 rounded-full p-1" />
                    Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalOrders}</div>
                  <p className="text-sm text-gray-600">Total orders</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Repeat className="w-5 h-5 text-yellow-500 bg-yellow-100 rounded-full p-1" />
                    Repeat Customer %
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">37%</div>
                  <p className="text-sm text-gray-600">Repeat customers</p>
                </CardContent>
              </Card>
            </div>

            {/* Environmental Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-green-800">
                    <Leaf className="w-5 h-5 text-green-600" />
                    CO₂ Prevented
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700">2,847 kg</div>
                  <p className="text-sm text-green-600">Carbon emissions saved</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                    Items Renewed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700">
                    {refurbishedProducts.reduce((sum, p) => sum + p.orders, 0)}
                  </div>
                  <p className="text-sm text-blue-600">Items given new life</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-yellow-800">
                    <Repeat className="w-5 h-5 text-yellow-600" />
                    Repeat Customer %
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-700">37%</div>
                  <p className="text-sm text-yellow-600">Percentage of customers who made more than one purchase</p>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Globe className="w-5 h-5" />
                    Global Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="font-semibold">🥇 EcoTech Solutions</span>
                      <span className="text-sm text-gray-600">15.2M kg CO₂</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-semibold">🥈 Green Living Co.</span>
                      <span className="text-sm text-gray-600">12.8M kg CO₂</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span className="font-semibold">🥉 Sustainable Goods</span>
                      <span className="text-sm text-gray-600">9.4M kg CO₂</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-100 rounded border-2 border-green-300">
                      <span className="font-bold text-green-800">#{Math.floor(Math.random() * 50) + 15} You</span>
                      <span className="text-sm text-green-700 font-semibold">2.8k kg CO₂</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Flag className="w-5 h-5" />
                    National Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="font-semibold">🥇 EcoTech Solutions</span>
                      <span className="text-sm text-gray-600">2.1M kg CO₂</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-semibold">🥈 Pure Earth</span>
                      <span className="text-sm text-gray-600">1.9M kg CO₂</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span className="font-semibold">🥉 Clean Future</span>
                      <span className="text-sm text-gray-600">1.6M kg CO₂</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-100 rounded border-2 border-green-300">
                      <span className="font-bold text-green-800">#{Math.floor(Math.random() * 20) + 8} You</span>
                      <span className="text-sm text-green-700 font-semibold">2.8k kg CO₂</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <MapPin className="w-4 h-4" />
                    Local Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="font-semibold">🥇 Local Green Store</span>
                      <span className="text-sm text-gray-600">45k kg CO₂</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-semibold">🥈 EcoMart</span>
                      <span className="text-sm text-gray-600">32k kg CO₂</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span className="font-semibold">🥉 Green Choice</span>
                      <span className="text-sm text-gray-600">21k kg CO₂</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-100 rounded border-2 border-green-300">
                      <span className="font-bold text-green-800">#7 You</span>
                      <span className="text-sm text-green-700 font-semibold">2.8k kg CO₂</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sustainability Education Panel */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Leaf className="w-5 h-5" />
                  Seller Sustainability Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <Award className="w-8 h-8 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-800 mb-2">Certification Verification</h3>
                      <p className="text-green-700 text-sm">
                        Learn how we verify sustainability certifications and what documentation is required for each
                        type.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="w-8 h-8 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-800 mb-2">Eco-Friendly Packaging</h3>
                      <p className="text-green-700 text-sm">
                        Best practices for sustainable packaging that reduces waste and appeals to eco-conscious
                        customers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RefreshCw className="w-8 h-8 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-800 mb-2">Refurbished Standards</h3>
                      <p className="text-green-700 text-sm">
                        Quality standards and testing requirements for refurbished items to ensure customer
                        satisfaction.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "products" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group transition-shadow hover:shadow-2xl border border-gray-200">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Badge className="bg-green-100 text-green-800">New</Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={
                        product.status === "active"
                          ? "default"
                          : product.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {product.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-green-600">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">
                      {productCategories.find((cat) => cat.id === product.category)?.name || product.category}
                    </Badge>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs"><Eye className="w-4 h-4" />{product.views}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-50 text-green-700 text-xs"><Package className="w-4 h-4" />{product.orders} Orders</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-purple-50 text-purple-700 text-xs"><DollarSign className="w-4 h-4" />₹{product.revenue.toLocaleString('en-IN')}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-50 text-yellow-700 text-xs"><Star className="w-4 h-4" />{product.rating || "N/A"}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs"><Leaf className="w-4 h-4" />{(product.orders * 2.3).toFixed(1)}kg CO₂</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-500">Listed on {product.createdAt}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-green-100">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-blue-100">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "refurbished" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {refurbishedProducts.map((product) => (
              <Card key={product.id} className="group transition-shadow hover:shadow-2xl border border-gray-200">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Badge className={getConditionColor(product.condition)}>
                      {product.condition.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={
                        product.status === "active"
                          ? "default"
                          : product.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {product.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-blue-600">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs"><Eye className="w-4 h-4" />{product.views}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs"><Leaf className="w-4 h-4" />{(product.orders * 2.3).toFixed(1)}kg CO₂</span>
                  </div>
                  <div className="mb-2 text-xs text-gray-600">
                    <span className="font-medium">Condition:</span> {product.cosmeticCondition}
                  </div>
                  <div className="mb-2 text-xs text-gray-600">
                    <span className="font-medium">Includes:</span> {product.originalAccessories.join(", ")}
                  </div>
                  {product.missingAccessories.length > 0 && (
                    <div className="mb-2 text-xs text-red-600">
                      <span className="font-medium">Missing:</span> {product.missingAccessories.join(", ")}
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-500">Listed on {product.createdAt}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-green-100">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-blue-100">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add Product Form */}
        {showAddProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-green-500" />
                  Add New Eco-Product
                </CardTitle>
                <CardDescription>List your sustainable product with all required certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Selection - First Step */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Product Category</h3>
                    <div>
                      <Label htmlFor="category">Select Product Category *</Label>
                      <Select value={productForm.category} onValueChange={handleCategoryChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your product category" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              <div>
                                <div className="font-medium">{category.name}</div>
                                <div className="text-xs text-gray-500">{category.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Show remaining fields only after category is selected */}
                  {productForm.category && (
                    <>
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="itemName">Product Name *</Label>
                            <Input
                              id="itemName"
                              value={productForm.itemName}
                              onChange={(e) => setProductForm((prev) => ({ ...prev, itemName: e.target.value }))}
                              placeholder="Enter product name"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="manufacturerName">Brand/Manufacturer *</Label>
                            <Input
                              id="manufacturerName"
                              value={productForm.manufacturerName}
                              onChange={(e) =>
                                setProductForm((prev) => ({ ...prev, manufacturerName: e.target.value }))
                              }
                              placeholder="Enter brand or manufacturer name"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="price">Price ($) *</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              value={productForm.price}
                              onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
                              placeholder="0.00"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Category-Specific Fields */}
                      {renderCategorySpecificFields(productForm.category)}

                      {/* Updated Certification Section */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <Award className="w-5 h-5 text-green-500" />
                          Sustainability Certifications
                        </h3>

                        {/* Packaging Certification */}
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="packagingCert">Packaging Material Certification</Label>
                              <Select
                                value={productForm.packagingCert}
                                onValueChange={(value) => setProductForm((prev) => ({ ...prev, packagingCert: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select certification" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="fsc">FSC Certified</SelectItem>
                                  <SelectItem value="recyclable">100% Recyclable</SelectItem>
                                  <SelectItem value="biodegradable">Biodegradable</SelectItem>
                                  <SelectItem value="compostable">Compostable</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="packagingCertFile">Upload Packaging Certification PDF</Label>
                              <div className="flex items-center gap-2 mt-1">
                                <Input
                                  id="packagingCertFile"
                                  type="file"
                                  accept=".pdf"
                                  onChange={handlePackagingCertFileUpload}
                                  disabled={!productForm.packagingCert}
                                  className="flex-1"
                                />
                                <Button type="button" variant="outline" size="sm" disabled={!productForm.packagingCert}>
                                  <Upload className="w-4 h-4" />
                                </Button>
                              </div>
                              {productForm.packagingCertFile && (
                                <p className="text-sm text-green-600 mt-1">✓ {productForm.packagingCertFile.name}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Material Certification */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="materialCert">Product Material Certification</Label>
                              <Select
                                value={productForm.materialCert}
                                onValueChange={(value) => setProductForm((prev) => ({ ...prev, materialCert: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select certification" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="organic">USDA Organic</SelectItem>
                                  <SelectItem value="fair-trade">Fair Trade</SelectItem>
                                  <SelectItem value="energy-star">Energy Star</SelectItem>
                                  <SelectItem value="cradle-to-cradle">Cradle to Cradle</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="materialCertFile">Upload Material Certification PDF</Label>
                              <div className="flex items-center gap-2 mt-1">
                                <Input
                                  id="materialCertFile"
                                  type="file"
                                  accept=".pdf"
                                  onChange={handleMaterialCertFileUpload}
                                  disabled={!productForm.materialCert}
                                  className="flex-1"
                                />
                                <Button type="button" variant="outline" size="sm" disabled={!productForm.materialCert}>
                                  <Upload className="w-4 h-4" />
                                </Button>
                              </div>
                              {productForm.materialCertFile && (
                                <p className="text-sm text-blue-600 mt-1">✓ {productForm.materialCertFile.name}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Other Certifications */}
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <Label htmlFor="otherCerts">Additional Certifications (PDF Upload)</Label>
                          <div className="mt-2 flex items-center gap-2">
                            <Input
                              id="otherCerts"
                              type="file"
                              accept=".pdf"
                              multiple
                              onChange={handleOtherCertFilesUpload}
                              className="flex-1"
                            />
                            <Button type="button" variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-1" />
                              Upload PDFs
                            </Button>
                          </div>
                          {productForm.otherCertFiles.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {productForm.otherCertFiles.map((file, index) => (
                                <p key={index} className="text-sm text-purple-600">
                                  ✓ {file.name}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Product Description *</Label>
                        <Textarea
                          id="description"
                          rows={4}
                          value={productForm.description}
                          onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your product's features, benefits, and sustainability aspects..."
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="images">Product Images (7-8 required) *</Label>
                        <div className="mt-1">
                          <Input type="file" accept="image/*" multiple onChange={handleImageUpload} required />
                          <p className="text-sm text-gray-500 mt-1">
                            Upload 7-8 high-quality, well-lit images from every angle (front, back, sides, top, bottom,
                            close-ups) to build customer trust and enable better verification.
                          </p>
                          {productForm.images.length > 0 && (
                            <div className="mt-2 space-y-1">
                              <p className="text-sm font-medium">
                                Uploaded: {productForm.images.length}/8 images
                                {productForm.images.length < 7 && (
                                  <span className="text-red-600 ml-2">(Minimum 7 required)</span>
                                )}
                              </p>
                              {productForm.images.map((file, index) => (
                                <p key={index} className="text-sm text-green-600">
                                  ✓ {file.name}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={!productForm.category}>
                      List Product
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddProduct(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Refurbished Product Form */}
        {showAddRefurbished && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-500" />
                  Add Refurbished Product
                </CardTitle>
                <CardDescription>
                  List your professionally refurbished high-value items with quality guarantee
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRefurbishedSubmit} className="space-y-6">
                  {/* Category Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Product Category</h3>
                    <div>
                      <Label htmlFor="refurb-category">Category *</Label>
                      <Select
                        value={refurbishedForm.category}
                        onValueChange={(value) => setRefurbishedForm((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product category" />
                        </SelectTrigger>
                        <SelectContent>
                          {refurbishedCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              <div>
                                <div className="font-medium">{category.name}</div>
                                <div className="text-xs text-gray-500">{category.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="refurb-brand">Brand *</Label>
                        <Input
                          id="refurb-brand"
                          value={refurbishedForm.brand}
                          onChange={(e) => setRefurbishedForm((prev) => ({ ...prev, brand: e.target.value }))}
                          placeholder="e.g., Apple, Samsung, Rolex"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="refurb-model">Model/Series</Label>
                        <Input
                          id="refurb-model"
                          value={refurbishedForm.model}
                          onChange={(e) => setRefurbishedForm((prev) => ({ ...prev, model: e.target.value }))}
                          placeholder="e.g., iPhone 13, Galaxy Watch 4"
                        />
                      </div>
                      <div>
                        <Label htmlFor="refurb-itemName">Product Title *</Label>
                        <Input
                          id="refurb-itemName"
                          value={refurbishedForm.itemName}
                          onChange={(e) => setRefurbishedForm((prev) => ({ ...prev, itemName: e.target.value }))}
                          placeholder="e.g., 128GB Space Gray, Gold Ring"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="refurb-price">Price ($) *</Label>
                        <Input
                          id="refurb-price"
                          type="number"
                          step="0.01"
                          value={refurbishedForm.price}
                          onChange={(e) => setRefurbishedForm((prev) => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="refurb-condition">Condition *</Label>
                        <Select
                          value={refurbishedForm.condition}
                          onValueChange={(value) => setRefurbishedForm((prev) => ({ ...prev, condition: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="like-new">Like New - Minimal to no signs of wear</SelectItem>
                            <SelectItem value="very-good">Very Good - Light signs of use, fully functional</SelectItem>
                            <SelectItem value="good">Good - Moderate signs of use, fully functional</SelectItem>
                            <SelectItem value="acceptable">
                              Acceptable - Heavy signs of use, fully functional
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Warranty & Returns */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Warranty & Returns</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="refurb-warranty">Warranty Period (Months)</Label>
                        <Select
                          value={refurbishedForm.warrantyMonths}
                          onValueChange={(value) => setRefurbishedForm((prev) => ({ ...prev, warrantyMonths: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 Months</SelectItem>
                            <SelectItem value="6">6 Months</SelectItem>
                            <SelectItem value="12">12 Months (Recommended)</SelectItem>
                            <SelectItem value="24">24 Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="refurb-return">Return Period (Days)</Label>
                        <Select
                          value={refurbishedForm.returnDays}
                          onValueChange={(value) => setRefurbishedForm((prev) => ({ ...prev, returnDays: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 Days</SelectItem>
                            <SelectItem value="90">90 Days (Amazon Renewed Standard)</SelectItem>
                            <SelectItem value="180">180 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Accessories & Packaging */}
                  {refurbishedForm.category && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Accessories & Packaging</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-base font-medium">Original Accessories Included</Label>
                          <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                            {getAccessoriesForCategory(refurbishedForm.category).map((accessory) => (
                              <div key={accessory} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`original-${accessory}`}
                                  checked={refurbishedForm.originalAccessories.includes(accessory)}
                                  onCheckedChange={(checked) =>
                                    handleAccessoryChange(accessory, checked as boolean, "original")
                                  }
                                />
                                <Label htmlFor={`original-${accessory}`} className="text-sm">
                                  {accessory}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-base font-medium">Missing Accessories</Label>
                          <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                            {getAccessoriesForCategory(refurbishedForm.category).map((accessory) => (
                              <div key={accessory} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`missing-${accessory}`}
                                  checked={refurbishedForm.missingAccessories.includes(accessory)}
                                  onCheckedChange={(checked) =>
                                    handleAccessoryChange(accessory, checked as boolean, "missing")
                                  }
                                />
                                <Label htmlFor={`missing-${accessory}`} className="text-sm">
                                  {accessory}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="original-packaging"
                            checked={refurbishedForm.originalPackaging}
                            onCheckedChange={(checked) =>
                              setRefurbishedForm((prev) => ({ ...prev, originalPackaging: checked as boolean }))
                            }
                          />
                          <Label htmlFor="original-packaging">Comes in original packaging</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="functionality-tested"
                            checked={refurbishedForm.functionalityTested}
                            onCheckedChange={(checked) =>
                              setRefurbishedForm((prev) => ({ ...prev, functionalityTested: checked as boolean }))
                            }
                          />
                          <Label htmlFor="functionality-tested">All functionality tested and working</Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Condition Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Condition Details</h3>
                    <div>
                      <Label htmlFor="refurb-cosmetic">Cosmetic Condition Description *</Label>
                      <Textarea
                        id="refurb-cosmetic"
                        rows={3}
                        value={refurbishedForm.cosmeticCondition}
                        onChange={(e) => setRefurbishedForm((prev) => ({ ...prev, cosmeticCondition: e.target.value }))}
                        placeholder="Describe any scratches, dents, or cosmetic wear. Be honest and detailed."
                        required
                      />
                    </div>
                  </div>

                  {/* Product Description */}
                  <div>
                    <Label htmlFor="refurb-description">Product Description *</Label>
                    <Textarea
                      id="refurb-description"
                      rows={4}
                      value={refurbishedForm.description}
                      onChange={(e) => setRefurbishedForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the product specifications, refurbishment process, and any additional details..."
                      required
                    />
                  </div>

                  {/* Enhanced Images & Documentation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Product Photos & Documentation</h3>

                    {/* Photo Requirements */}
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="flex items-start gap-3 mb-4">
                        <Camera className="w-6 h-6 text-red-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-red-800 mb-2">Required: 5-8 Verification Photos</h4>
                          <p className="text-red-700 text-sm mb-3">
                            For refurbished items, we require comprehensive photo documentation for quality
                            verification.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <h5 className="font-semibold text-red-800 mb-2">Required Angles:</h5>
                              <ul className="text-red-700 space-y-1">
                                <li>• Front view (full item)</li>
                                <li>• Back view (full item)</li>
                                <li>• Side profiles</li>
                                <li>• Close-up of any wear/damage</li>
                                <li>• Serial numbers/authenticity marks</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-red-800 mb-2">Category-Specific:</h5>
                              <ul className="text-red-700 space-y-1">
                                <li>
                                  • <strong>Electronics:</strong> Screen ON, ports, functionality
                                </li>
                                <li>
                                  • <strong>Jewelry:</strong> Hallmarks, gemstone clarity
                                </li>
                                <li>
                                  • <strong>Appliances:</strong> Control panels, interior
                                </li>
                                <li>
                                  • <strong>Sports:</strong> Wear points, moving parts
                                </li>
                                <li>
                                  • <strong>Cameras:</strong> Lens condition, viewfinder
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="refurb-images">Product Verification Photos (5-8 required) *</Label>
                        <Input
                          id="refurb-images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleRefurbishedImageUpload}
                          required
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Upload 5-8 high-quality photos covering all angles and requirements above.
                        </p>
                        {refurbishedForm.images.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">
                              Uploaded: {refurbishedForm.images.length}/8 photos
                              {refurbishedForm.images.length < 5 && (
                                <span className="text-red-600 ml-2">(Minimum 5 required)</span>
                              )}
                            </p>
                            <div className="grid grid-cols-4 gap-2">
                              {refurbishedForm.images.map((file, index) => (
                                <div key={index} className="text-center">
                                  <div className="w-full h-16 bg-gray-100 rounded border flex items-center justify-center">
                                    <Camera className="w-4 h-4 text-gray-400" />
                                  </div>
                                  <p className="text-xs text-blue-600 mt-1 truncate">{file.name}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="refurb-certs">Testing & Certification Documents</Label>
                        <Input
                          id="refurb-certs"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          multiple
                          onChange={handleCertificationDocsUpload}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Upload testing reports, authenticity certificates, or refurbishment documentation.
                        </p>
                        {refurbishedForm.certificationDocs.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {refurbishedForm.certificationDocs.map((file, index) => (
                              <p key={index} className="text-sm text-purple-600">
                                ✓ {file.name}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      List Refurbished Product
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddRefurbished(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
