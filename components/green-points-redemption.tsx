"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Award, Leaf, Info, Brain } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useQuiz } from "@/components/quiz-provider"

interface GreenPointsRedemptionProps {
  availablePoints: number
  onApplyPoints: (points: number, discount: number) => void
  appliedPoints?: number
  appliedDiscount?: number
}

export default function GreenPointsRedemption({
  availablePoints,
  onApplyPoints,
  appliedPoints = 0,
  appliedDiscount = 0,
}: GreenPointsRedemptionProps) {
  const [pointsToRedeem, setPointsToRedeem] = useState("")
  const [showRedemption, setShowRedemption] = useState(false)
  const { totalGreenPointsEarned } = useQuiz()

  // Conversion rate: 100 points = $1
  const conversionRate = 100
  const maxRedeemablePoints = Math.min(availablePoints, 5000) // Max 5000 points per order
  const estimatedDiscount = Number.parseInt(pointsToRedeem) / conversionRate || 0

  const handleApplyPoints = () => {
    const points = Number.parseInt(pointsToRedeem)
    if (points > 0 && points <= maxRedeemablePoints) {
      const discount = points / conversionRate
      onApplyPoints(points, discount)
      setPointsToRedeem("")
      setShowRedemption(false)
    }
  }

  const handleRemovePoints = () => {
    onApplyPoints(0, 0)
  }

  const presetAmounts = [
    { points: 500, discount: 5 },
    { points: 1000, discount: 10 },
    { points: 2000, discount: 20 },
  ].filter((preset) => preset.points <= availablePoints)

  return (
    <Card className="border-green-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Award className="w-5 h-5" />
          Green Points Redemption
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-green-500" />
            <span className="text-sm">Available Points:</span>
          </div>
          <Badge className="bg-green-100 text-green-800">{availablePoints.toLocaleString()}</Badge>
        </div>

        {/* Quiz Points Info */}
        {totalGreenPointsEarned > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Quiz Points Included</span>
            </div>
            <p className="text-xs text-blue-700">
              {totalGreenPointsEarned} points earned from sustainability quizzes
            </p>
          </div>
        )}

        {appliedPoints > 0 ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-green-800">Points Applied</p>
                <p className="text-sm text-green-600">
                  {appliedPoints.toLocaleString()} points = ${appliedDiscount.toFixed(2)} discount
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleRemovePoints} className="text-red-600 border-red-200">
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <>
            {!showRedemption ? (
              <Button
                variant="outline"
                onClick={() => setShowRedemption(true)}
                className="w-full border-green-200 text-green-700 hover:bg-green-50"
                disabled={availablePoints === 0}
              >
                Redeem Green Points
              </Button>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    100 Green Points = $1.00 discount. Maximum 5,000 points per order.
                  </AlertDescription>
                </Alert>

                {/* Preset amounts */}
                {presetAmounts.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Quick Select:</p>
                    <div className="flex gap-2 flex-wrap">
                      {presetAmounts.map((preset) => (
                        <Button
                          key={preset.points}
                          variant="outline"
                          size="sm"
                          onClick={() => setPointsToRedeem(preset.points.toString())}
                          className="text-xs"
                        >
                          {preset.points} pts = ${preset.discount}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom amount */}
                <div>
                  <label className="block text-sm font-medium mb-2">Enter Points to Redeem:</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={pointsToRedeem}
                      onChange={(e) => setPointsToRedeem(e.target.value)}
                      placeholder="Enter points"
                      min="1"
                      max={maxRedeemablePoints}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleApplyPoints}
                      disabled={!pointsToRedeem || Number.parseInt(pointsToRedeem) > maxRedeemablePoints}
                    >
                      Apply
                    </Button>
                  </div>
                  {pointsToRedeem && (
                    <p className="text-sm text-green-600 mt-1">Discount: ${estimatedDiscount.toFixed(2)}</p>
                  )}
                </div>

                <Button variant="ghost" size="sm" onClick={() => setShowRedemption(false)} className="w-full">
                  Cancel
                </Button>
              </div>
            )}
          </>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Earn Green Points with every eco-friendly purchase</p>
          <p>• Take sustainability quizzes to earn bonus points</p>
          <p>• Points never expire and can be used on future orders</p>
          <p>• Bonus points for sustainable packaging returns</p>
        </div>
      </CardContent>
    </Card>
  )
}
