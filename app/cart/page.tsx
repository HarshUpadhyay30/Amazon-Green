"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ShoppingCart, Minus, Plus, Trash2, Users, MapPin, Leaf, Info } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { useQuiz } from "@/components/quiz-provider"
import GreenPointsRedemption from "@/components/green-points-redemption"

export default function CartPage() {
  const { items: cartItems, updateQuantity } = useCart()
  const { user } = useAuth()
  const { totalGreenPointsEarned } = useQuiz()
  const [showGroupOrders, setShowGroupOrders] = useState(cartItems.length > 0)
  const [appliedPoints, setAppliedPoints] = useState(0)
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [selectedPackaging, setSelectedPackaging] = useState<'standard' | 'reusable'>('standard')

  const groupOrders = [
    {
      id: "group-1",
      organizer: "Sarah M.",
      location: "0.8 km away - Pine Street",
      participants: 4,
      items: ["Organic Cotton T-Shirt", "Bamboo Phone Case"],
      discount: "20 Green Points",
      co2Saved: "3.2kg",
      deliveryDate: "Tomorrow",
    },
    {
      id: "group-2",
      organizer: "Mike R.",
      location: "1.2 km away - Oak Avenue",
      participants: 6,
      items: ["Organic Cotton T-Shirt"],
      discount: "20 Green Points",
      co2Saved: "2.8kg",
      deliveryDate: "Day after tomorrow",
    },
    {
      id: "group-3",
      organizer: "Aarav S.",
      location: "2.0 km away - MG Road",
      participants: 3,
      items: ["Bamboo Toothbrush"],
      discount: "20 Green Points",
      co2Saved: "1.9kg",
      deliveryDate: "Tomorrow",
    },
    {
      id: "group-4",
      organizer: "Priya R.",
      location: "0.5 km away - Brigade Road",
      participants: 5,
      items: ["Reusable Water Bottle"],
      discount: "20 Green Points",
      co2Saved: "2.5kg",
      deliveryDate: "Today",
    },
    {
      id: "group-5",
      organizer: "Rohan K.",
      location: "1.8 km away - Indiranagar",
      participants: 2,
      items: ["Organic Cotton Tote Bag"],
      discount: "20 Green Points",
      co2Saved: "1.2kg",
      deliveryDate: "Tomorrow",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 35 ? 0 : 5.99
  const packagingFee = selectedPackaging === 'reusable' ? 20 : 0
  const total = subtotal + shipping - appliedDiscount + packagingFee

  // Calculate total available points including quiz points
  const totalAvailablePoints = 2450 + totalGreenPointsEarned

  const handleApplyPoints = (points: number, discount: number) => {
    setAppliedPoints(points)
    setAppliedDiscount(discount)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some eco-friendly products to get started!</p>
            <Button className="bg-green-600 hover:bg-green-700">Continue Shopping</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">Green Rating: {item.greenRating}/5</span>
                        <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                          {item.certifications} certs
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded">
                        <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-3 py-1 min-w-[3rem] text-center">{item.quantity.toLocaleString('en-IN')}</span>
                        <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 0)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Group Orders Section */}
            {showGroupOrders && (
              <Alert className="border-green-200 bg-green-50">
                <Users className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 text-green-800 font-medium">Join a group order and earn 20 Green Points!</div>
                      <p className="text-green-700 text-sm mb-4">
                        We found group orders in your area with the same items. Join to reduce delivery emissions!
                      </p>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-50" style={{scrollbarColor:'#86efac #f0fdf4', scrollbarWidth:'thin'}}>
                      {groupOrders.map((group) => (
                        <Card key={group.id} className="border-green-200 min-w-[260px] max-w-[260px] flex-shrink-0">
                          <CardContent className="p-3">
                            <div className="flex flex-col gap-2 h-full justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <MapPin className="w-4 h-4 text-green-600" />
                                  <span className="font-medium text-green-800 text-sm">{group.location}</span>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">
                                  <span className="font-semibold">{group.organizer}</span> • {group.participants} joined
                                </p>
                                <p className="text-xs text-gray-600 mb-1">Delivery: {group.deliveryDate}</p>
                                <Badge className="bg-blue-600 text-white text-xs">-{group.co2Saved} CO₂</Badge>
                              </div>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full mt-2">
                                Join Group
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                        Start New Group
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowGroupOrders(false)}
                        className="text-gray-600"
                      >
                        Continue Individual Order
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Packaging Material Selection */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 text-base">Choose Packaging Material</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer justify-between">
                    <div className="flex items-start gap-3">
                      <input type="radio" name="packaging" value="standard" checked={selectedPackaging === 'standard'} onChange={() => setSelectedPackaging('standard')} className="mt-1" />
                      <div>
                        <span className="font-semibold text-green-900">Standard Recyclable</span>
                        <span className="block text-sm text-gray-700">Default cardboard box or bag made from recycled materials</span>
                      </div>
                    </div>
                    <span className="font-semibold text-green-700">Free</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer justify-between">
                    <div className="flex items-start gap-3">
                      <input type="radio" name="packaging" value="reusable" checked={selectedPackaging === 'reusable'} onChange={() => setSelectedPackaging('reusable')} className="mt-1" />
                      <div>
                        <span className="font-semibold text-green-900">Reusable</span>
                        <span className="block text-sm text-gray-700">Durable reusable mailer or box. The fee covers handling and cleaning, ensuring near-zero waste.</span>
                      </div>
                    </div>
                    <span className="font-semibold text-green-700">₹20</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Green Points Redemption */}
            {user && (
              <GreenPointsRedemption
                availablePoints={totalAvailablePoints}
                onApplyPoints={handleApplyPoints}
                appliedPoints={appliedPoints}
                appliedDiscount={appliedDiscount}
              />
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString('en-IN')}`}</span>
                </div>

                {packagingFee > 0 && (
                  <div className="flex justify-between">
                    <span>Packaging Fee</span>
                    <span>₹{packagingFee.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Green Points Discount</span>
                    <span>-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <hr />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg">
                  Proceed to Checkout
                </Button>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600 text-sm">
                    <Info className="w-4 h-4" />
                    <span>This order will prevent ~{(cartItems.length * 2.3).toFixed(1)}kg CO₂ emissions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
