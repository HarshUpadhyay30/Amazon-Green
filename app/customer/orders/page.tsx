"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Package, Truck, CheckCircle, XCircle, RotateCcw, Recycle, Package2 } from "lucide-react"
import Image from "next/image"

interface Order {
  id: string
  items: {
    name: string
    price: number
    quantity: number
    image: string
    packagingType: "recyclable" | "reusable" | "biodegradable"
  }[]
  status: "processing" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  deliveryDate?: string
  total: number
  trackingNumber?: string
  canCancel: boolean
  canReturn: boolean
}

export default function OrdersPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [returnType, setReturnType] = useState<"normal" | "with-packaging" | null>(null)

  useEffect(() => {
    if (!isLoading && (!user || user.type !== "customer")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  if (!user || user.type !== "customer") {
    return null
  }

  const orders: Order[] = [
    {
      id: "AMZ-2024-001",
      items: [
        {
          name: "Organic Cotton T-Shirt - Sustainable Fashion",
          price: 699,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
          packagingType: "reusable",
        },
      ],
      status: "delivered",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-18",
      total: 1398,
      trackingNumber: "1Z999AA1234567890",
      canCancel: false,
      canReturn: true,
    },
    {
      id: "AMZ-2024-002",
      items: [
        {
          name: "Bamboo Fiber Phone Case - Biodegradable",
          price: 300,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=100&h=100&fit=crop",
          packagingType: "biodegradable",
        },
      ],
      status: "delivered",
      orderDate: "2024-01-20",
      deliveryDate: "2024-01-23",
      total: 300,
      trackingNumber: "1Z999AA1234567891",
      canCancel: false,
      canReturn: true,
    },
    {
      id: "AMZ-2024-003",
      items: [
        {
          name: "Recycled Ocean Plastic Water Bottle",
          price: 400,
          quantity: 3,
          image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop",
          packagingType: "recyclable",
        },
      ],
      status: "processing",
      orderDate: "2024-01-22",
      total: 1200,
      canCancel: true,
      canReturn: false,
    },
  ]

  const ongoingOrders = orders.filter((order) => order.status !== "delivered" && order.status !== "cancelled")
  const completedOrders = orders.filter((order) => order.status === "delivered")

  const handleCancelOrder = (orderId: string) => {
    // Handle order cancellation
    console.log("Cancelling order:", orderId)
  }

  const handleReturn = (orderId: string, type: "normal" | "with-packaging") => {
    // Handle return request
    console.log("Returning order:", orderId, "Type:", type)
    setSelectedOrder(null)
    setReturnType(null)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-orange-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders & Returns</h1>

        <Tabs defaultValue="ongoing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="ongoing">Ongoing Orders ({ongoingOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Order History ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="space-y-6">
            {ongoingOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No ongoing orders</h3>
                  <p className="text-gray-600">You don't have any orders in progress right now.</p>
                </CardContent>
              </Card>
            ) : (
              ongoingOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          Order #{order.id}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Placed on {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        {order.trackingNumber && (
                          <p className="text-sm text-gray-600 mt-1">Tracking: {order.trackingNumber}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} • ₹{item.price.toLocaleString('en-IN')} each
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-lg font-semibold">Total: ₹{order.total.toLocaleString('en-IN')}</div>
                        <div className="flex gap-2">
                          {order.canCancel && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelOrder(order.id)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Cancel Order
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Track Package
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        Order #{order.id}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Delivered on {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity} • ₹{item.price.toLocaleString('en-IN')} each
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {item.packagingType === "reusable" && "Reusable Packaging"}
                              {item.packagingType === "recyclable" && "Recyclable Packaging"}
                              {item.packagingType === "biodegradable" && "Biodegradable Packaging"}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-lg font-semibold">Total: ₹{order.total.toLocaleString('en-IN')}</div>
                      <div className="flex gap-2">
                        {order.canReturn && (
                          <div className="flex gap-2">
                            {order.items.some((item) => item.packagingType === "reusable") ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedOrder(order.id)
                                  setReturnType("with-packaging")
                                }}
                                className="text-green-600 border-green-200 hover:bg-green-50"
                              >
                                <Package2 className="w-4 h-4 mr-1" />
                                Return with Packaging
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedOrder(order.id)
                                  setReturnType("normal")
                                }}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              >
                                <Recycle className="w-4 h-4 mr-1" />
                                Return
                              </Button>
                            )}
                          </div>
                        )}
                        <Button variant="outline" size="sm">
                          Buy Again
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Return Confirmation Modal */}
        {selectedOrder && returnType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-blue-500" />
                  Confirm Return
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertDescription>
                    {returnType === "normal" ? (
                      <>
                        <span className="block">Your packaging is made of recyclable material. Please help us by ensuring it is recycled properly—this small step helps reduce landfill waste and supports a cleaner environment!</span>
                      </>
                    ) : (
                      <>
                        <strong>Return with Reusable Packaging:</strong> Please return the item in its original reusable packaging. You'll receive a full refund for helping us reuse materials!
                      </>
                    )}
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3">
                  <Button onClick={() => handleReturn(selectedOrder, returnType)} className="flex-1">
                    Confirm Return
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedOrder(null)
                      setReturnType(null)
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
