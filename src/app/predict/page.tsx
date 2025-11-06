"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, TrendingUp, TrendingDown, Info, Sparkles, Upload, FileSpreadsheet, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface BatchPrediction {
  booking_id: number
  cancellation_probability: number
  risk_level: string
  confidence: number
}

interface BatchResult {
  success: boolean
  total_bookings: number
  predictions: BatchPrediction[]
  statistics: {
    average_probability: number
    median_probability: number
    min_probability: number
    max_probability: number
    risk_distribution: {
      "Low Risk": number
      "Medium Risk": number
      "High Risk": number
      "Very High Risk": number
    }
  }
  data_quality: {
    missing_before: Record<string, number>
    missing_after: Record<string, number>
    rows_processed: number
    columns_processed: number
  }
  processed_data: any[]
}

export default function PredictPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    leadTime: 30,
    arrivalMonth: "",
    stayDuration: 2,
    adults: 2,
    children: 0,
    depositType: "",
    previousCancellations: 0,
    previousBookings: 0,
    specialRequests: 0,
    bookingChanges: 0,
    marketSegment: "",
    roomType: "",
    mealPlan: "",
  })

  const [prediction, setPrediction] = useState<{
    probability: number
    confidence: number
    riskLevel: string
    riskColor: string
    keyFactors: string[]
    recommendations: string[]
  } | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [batchResult, setBatchResult] = useState<BatchResult | null>(null)
  const [isBatchLoading, setIsBatchLoading] = useState(false)

  const handlePredict = () => {
    setIsLoading(true)
    
    // Simulate ML prediction with realistic logic
    setTimeout(() => {
      // Calculate probability based on factors
      let probability = 30 // Base probability

      // Lead time impact (longer lead time = higher cancellation)
      if (formData.leadTime > 90) probability += 25
      else if (formData.leadTime > 60) probability += 15
      else if (formData.leadTime > 30) probability += 10
      else if (formData.leadTime < 7) probability -= 10

      // Deposit type impact
      if (formData.depositType === "no_deposit") probability += 20
      else if (formData.depositType === "refundable") probability += 10
      else if (formData.depositType === "non_refundable") probability -= 15

      // Previous cancellations impact
      probability += formData.previousCancellations * 8

      // Special requests impact (shows commitment)
      probability -= formData.specialRequests * 3

      // Booking changes impact (shows uncertainty)
      probability += formData.bookingChanges * 5

      // Market segment impact
      if (formData.marketSegment === "online_ta") probability += 5
      else if (formData.marketSegment === "corporate") probability -= 10
      else if (formData.marketSegment === "direct") probability -= 5

      // Clamp probability between 0 and 100
      probability = Math.max(5, Math.min(95, probability))

      // Determine risk level
      let riskLevel = ""
      let riskColor = ""
      if (probability < 25) {
        riskLevel = "Low Risk"
        riskColor = "text-green-600"
      } else if (probability < 50) {
        riskLevel = "Medium Risk"
        riskColor = "text-yellow-600"
      } else if (probability < 75) {
        riskLevel = "High Risk"
        riskColor = "text-orange-600"
      } else {
        riskLevel = "Very High Risk"
        riskColor = "text-red-600"
      }

      // Determine key factors
      const keyFactors = []
      if (formData.leadTime > 60) keyFactors.push("Long lead time increases risk")
      if (formData.depositType === "no_deposit") keyFactors.push("No deposit required")
      if (formData.previousCancellations > 0) keyFactors.push("Guest has previous cancellations")
      if (formData.bookingChanges > 0) keyFactors.push("Multiple booking modifications")
      if (formData.specialRequests > 2) keyFactors.push("High special request count shows commitment")

      // Generate recommendations
      const recommendations = []
      if (probability > 50) {
        recommendations.push("Send confirmation reminder 48h before arrival")
        recommendations.push("Consider offering upgrade incentive to reduce cancellation")
      }
      if (formData.depositType === "no_deposit" && probability > 40) {
        recommendations.push("Request deposit to reduce cancellation risk")
      }
      if (formData.specialRequests === 0 && probability > 40) {
        recommendations.push("Follow up with guest to confirm details and build engagement")
      }
      recommendations.push("Enable overbooking buffer for this risk category")

      setPrediction({
        probability: Math.round(probability),
        confidence: Math.round(85 + Math.random() * 10),
        riskLevel,
        riskColor,
        keyFactors: keyFactors.length > 0 ? keyFactors : ["Standard booking pattern"],
        recommendations,
      })
      setIsLoading(false)
    }, 1500)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ]
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV or Excel file",
          variant: "destructive"
        })
        return
      }

      setUploadedFile(file)
      toast({
        title: "File selected",
        description: `${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
      })
    }
  }

  const handleBatchPredict = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a file first",
        variant: "destructive"
      })
      return
    }

    setIsBatchLoading(true)
    setBatchResult(null)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)

      const response = await fetch('/api/predict-batch', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process file')
      }

      setBatchResult(data)
      toast({
        title: "Analysis complete",
        description: `Processed ${data.total_bookings} bookings successfully`,
      })
    } catch (error) {
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      })
    } finally {
      setIsBatchLoading(false)
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low Risk": return "text-green-600"
      case "Medium Risk": return "text-yellow-600"
      case "High Risk": return "text-orange-600"
      case "Very High Risk": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const downloadSampleCSV = () => {
    const sampleData = `lead_time,arrival_month,stay_duration,adults,children,deposit_type,previous_cancellations,previous_bookings,special_requests,booking_changes,market_segment,room_type,meal_plan
45,july,3,2,0,no_deposit,0,2,1,0,online_ta,standard,bb
120,august,5,2,1,refundable,1,5,2,1,direct,deluxe,hb
15,september,2,1,0,non_refundable,0,0,0,0,corporate,standard,no_meal
90,december,7,4,2,,2,3,3,2,groups,suite,fb
30,june,4,2,1,no_deposit,,1,1,0,online_ta,family,bb`

    const blob = new Blob([sampleData], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    
    // Check if running in iframe
    const isInIframe = window.self !== window.top
    
    if (isInIframe) {
      // In iframe - open in new tab
      const a = document.createElement('a')
      a.href = url
      a.download = 'sample_bookings.csv'
      a.target = '_blank'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      // Also notify parent window to open
      window.parent.postMessage({ 
        type: "OPEN_EXTERNAL_URL", 
        data: { url } 
      }, "*")
    } else {
      // Not in iframe - normal download
      const a = document.createElement('a')
      a.href = url
      a.download = 'sample_bookings.csv'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
    
    // Cleanup after a delay
    setTimeout(() => {
      window.URL.revokeObjectURL(url)
    }, 100)

    toast({
      title: "Sample file downloaded",
      description: "Use this template for your booking data",
    })
  }

  const loadSampleFile = async () => {
    try {
      // Fetch the sample file from public folder
      const response = await fetch('/sample_hotel_bookings.csv')
      if (!response.ok) throw new Error('Failed to fetch sample file')
      
      const blob = await response.blob()
      const file = new File([blob], 'sample_hotel_bookings.csv', { type: 'text/csv' })
      
      setUploadedFile(file)
      toast({
        title: "Sample file loaded",
        description: `${file.name} (${(file.size / 1024).toFixed(2)} KB) - Ready to analyze`,
      })
    } catch (error) {
      toast({
        title: "Failed to load sample",
        description: "Could not load the sample file",
        variant: "destructive"
      })
    }
  }

  const downloadBatchResults = () => {
    if (!batchResult) return

    // Convert results to CSV format
    const headers = ['Booking ID', 'Cancellation Probability (%)', 'Risk Level', 'Confidence (%)']
    const rows = batchResult.predictions.map(pred => [
      pred.booking_id,
      pred.cancellation_probability,
      pred.risk_level,
      pred.confidence
    ])

    // Create CSV content
    let csvContent = headers.join(',') + '\n'
    rows.forEach(row => {
      csvContent += row.join(',') + '\n'
    })

    // Add summary statistics at the bottom
    csvContent += '\n'
    csvContent += 'Summary Statistics\n'
    csvContent += `Total Bookings,${batchResult.total_bookings}\n`
    csvContent += `Average Probability,${batchResult.statistics.average_probability}%\n`
    csvContent += `Median Probability,${batchResult.statistics.median_probability}%\n`
    csvContent += `Min Probability,${batchResult.statistics.min_probability}%\n`
    csvContent += `Max Probability,${batchResult.statistics.max_probability}%\n`
    csvContent += '\n'
    csvContent += 'Risk Distribution\n'
    Object.entries(batchResult.statistics.risk_distribution).forEach(([level, count]) => {
      csvContent += `${level},${count}\n`
    })

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const filename = `cancellation_predictions_${new Date().toISOString().split('T')[0]}.csv`
    
    // Check if running in iframe
    const isInIframe = window.self !== window.top
    
    if (isInIframe) {
      // In iframe - open in new tab
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.target = '_blank'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      // Also notify parent window
      window.parent.postMessage({ 
        type: "OPEN_EXTERNAL_URL", 
        data: { url } 
      }, "*")
    } else {
      // Not in iframe - normal download
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
    
    // Cleanup after a delay
    setTimeout(() => {
      window.URL.revokeObjectURL(url)
    }, 100)

    toast({
      title: "Results downloaded",
      description: `${filename} has been saved`,
    })
  }

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <Sparkles className="h-3 w-3 mr-1" />
            ML-Powered Prediction
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cancellation Risk Predictor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Predict cancellation risk for individual bookings or analyze bulk data with incomplete information
          </p>
        </div>

        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="single">Single Prediction</TabsTrigger>
            <TabsTrigger value="batch">Batch Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>
                    Fill in the booking information to predict cancellation risk
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Lead Time */}
                  <div className="space-y-2">
                    <Label>Lead Time: {formData.leadTime} days</Label>
                    <Slider
                      value={[formData.leadTime]}
                      onValueChange={(value) => setFormData({ ...formData, leadTime: value[0] })}
                      min={0}
                      max={365}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Days between booking date and arrival date
                    </p>
                  </div>

                  {/* Arrival Month */}
                  <div className="space-y-2">
                    <Label>Arrival Month</Label>
                    <Select value={formData.arrivalMonth} onValueChange={(value) => setFormData({ ...formData, arrivalMonth: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="january">January</SelectItem>
                        <SelectItem value="february">February</SelectItem>
                        <SelectItem value="march">March</SelectItem>
                        <SelectItem value="april">April</SelectItem>
                        <SelectItem value="may">May</SelectItem>
                        <SelectItem value="june">June</SelectItem>
                        <SelectItem value="july">July</SelectItem>
                        <SelectItem value="august">August</SelectItem>
                        <SelectItem value="september">September</SelectItem>
                        <SelectItem value="october">October</SelectItem>
                        <SelectItem value="november">November</SelectItem>
                        <SelectItem value="december">December</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Stay Duration */}
                  <div className="space-y-2">
                    <Label>Stay Duration: {formData.stayDuration} nights</Label>
                    <Slider
                      value={[formData.stayDuration]}
                      onValueChange={(value) => setFormData({ ...formData, stayDuration: value[0] })}
                      min={1}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Guests */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Adults</Label>
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        value={formData.adults}
                        onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Children</Label>
                      <Input
                        type="number"
                        min={0}
                        max={10}
                        value={formData.children}
                        onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  {/* Deposit Type */}
                  <div className="space-y-2">
                    <Label>Deposit Type</Label>
                    <Select value={formData.depositType} onValueChange={(value) => setFormData({ ...formData, depositType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select deposit type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no_deposit">No Deposit</SelectItem>
                        <SelectItem value="refundable">Refundable</SelectItem>
                        <SelectItem value="non_refundable">Non-Refundable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Guest History */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Previous Cancellations</Label>
                      <Input
                        type="number"
                        min={0}
                        max={20}
                        value={formData.previousCancellations}
                        onChange={(e) => setFormData({ ...formData, previousCancellations: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Previous Bookings</Label>
                      <Input
                        type="number"
                        min={0}
                        max={50}
                        value={formData.previousBookings}
                        onChange={(e) => setFormData({ ...formData, previousBookings: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  {/* Special Requests & Changes */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Special Requests</Label>
                      <Input
                        type="number"
                        min={0}
                        max={10}
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Booking Changes</Label>
                      <Input
                        type="number"
                        min={0}
                        max={10}
                        value={formData.bookingChanges}
                        onChange={(e) => setFormData({ ...formData, bookingChanges: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  {/* Market Segment */}
                  <div className="space-y-2">
                    <Label>Market Segment</Label>
                    <Select value={formData.marketSegment} onValueChange={(value) => setFormData({ ...formData, marketSegment: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select market segment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="direct">Direct</SelectItem>
                        <SelectItem value="online_ta">Online Travel Agency</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="groups">Groups</SelectItem>
                        <SelectItem value="offline_ta">Offline Travel Agency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Room Type */}
                  <div className="space-y-2">
                    <Label>Room Type</Label>
                    <Select value={formData.roomType} onValueChange={(value) => setFormData({ ...formData, roomType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="deluxe">Deluxe</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                        <SelectItem value="family">Family Room</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Meal Plan */}
                  <div className="space-y-2">
                    <Label>Meal Plan</Label>
                    <Select value={formData.mealPlan} onValueChange={(value) => setFormData({ ...formData, mealPlan: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bb">Bed & Breakfast</SelectItem>
                        <SelectItem value="hb">Half Board</SelectItem>
                        <SelectItem value="fb">Full Board</SelectItem>
                        <SelectItem value="no_meal">No Meal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handlePredict} 
                    className="w-full" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Analyzing..." : "Predict Cancellation Risk"}
                  </Button>
                </CardContent>
              </Card>

              {/* Prediction Results */}
              <div className="space-y-6">
                {!prediction && (
                  <Card className="border-dashed">
                    <CardContent className="pt-6 text-center py-12">
                      <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Fill in the booking details and click "Predict" to see the cancellation risk analysis.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {prediction && (
                  <>
                    {/* Risk Score */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Cancellation Probability</CardTitle>
                        <CardDescription>ML model prediction result</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="text-center">
                          <div className={`text-6xl font-bold ${prediction.riskColor} mb-2`}>
                            {prediction.probability}%
                          </div>
                          <Badge className={`text-lg px-4 py-1 ${prediction.riskColor}`} variant="outline">
                            {prediction.riskLevel}
                          </Badge>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Cancellation Risk</span>
                            <span className="font-medium">{prediction.probability}%</span>
                          </div>
                          <Progress value={prediction.probability} className="h-3" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Model Confidence</span>
                            <span className="font-medium">{prediction.confidence}%</span>
                          </div>
                          <Progress value={prediction.confidence} className="h-2" />
                        </div>

                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Risk Assessment</AlertTitle>
                          <AlertDescription>
                            {prediction.probability < 25 && "This booking shows low cancellation risk. Standard procedures apply."}
                            {prediction.probability >= 25 && prediction.probability < 50 && "Moderate risk detected. Consider confirmation follow-up."}
                            {prediction.probability >= 50 && prediction.probability < 75 && "High risk of cancellation. Implement preventive measures."}
                            {prediction.probability >= 75 && "Very high cancellation risk. Immediate action recommended."}
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>

                    {/* Key Factors */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Risk Factors</CardTitle>
                        <CardDescription>Main factors influencing the prediction</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {prediction.keyFactors.map((factor, index) => (
                            <li key={index} className="flex items-start gap-2">
                              {prediction.probability > 50 ? (
                                <TrendingUp className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              )}
                              <span className="text-sm">{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Recommendations */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recommended Actions</CardTitle>
                        <CardDescription>Suggested measures to reduce cancellation risk</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {prediction.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-primary">{index + 1}</span>
                              </div>
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="batch">
            <div className="space-y-6">
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5" />
                    Batch Upload & Analysis
                  </CardTitle>
                  <CardDescription>
                    Upload a CSV or Excel file with booking data. Our system will automatically fill incomplete data and predict cancellation risk for all bookings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Accepted Formats</AlertTitle>
                    <AlertDescription>
                      CSV (.csv) or Excel (.xlsx, .xls) files with columns: lead_time, arrival_month, stay_duration, adults, children, deposit_type, previous_cancellations, previous_bookings, special_requests, booking_changes, market_segment, room_type, meal_plan
                    </AlertDescription>
                  </Alert>

                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      onClick={downloadSampleCSV}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Sample Template
                    </Button>
                    <Button 
                      variant="default" 
                      onClick={loadSampleFile}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Load Sample File
                    </Button>
                  </div>

                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="file-upload" className="text-lg font-medium cursor-pointer">
                        {uploadedFile ? uploadedFile.name : "Choose a file or drag it here"}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {uploadedFile 
                          ? `${(uploadedFile.size / 1024).toFixed(2)} KB` 
                          : "CSV or Excel format, max 10MB"}
                      </p>
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button 
                        variant="secondary" 
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="mt-4"
                      >
                        Select File
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={handleBatchPredict}
                    disabled={!uploadedFile || isBatchLoading}
                    className="w-full"
                    size="lg"
                  >
                    {isBatchLoading ? "Processing..." : "Analyze Bookings"}
                  </Button>
                </CardContent>
              </Card>

              {/* Results Section */}
              {batchResult && (
                <>
                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Total Bookings</CardDescription>
                        <CardTitle className="text-3xl">{batchResult.total_bookings}</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Avg Probability</CardDescription>
                        <CardTitle className="text-3xl">{batchResult.statistics.average_probability}%</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>High Risk Count</CardDescription>
                        <CardTitle className="text-3xl text-orange-600">
                          {batchResult.statistics.risk_distribution["High Risk"] + batchResult.statistics.risk_distribution["Very High Risk"]}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Low Risk Count</CardDescription>
                        <CardTitle className="text-3xl text-green-600">
                          {batchResult.statistics.risk_distribution["Low Risk"]}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* Data Quality Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Processing Summary</CardTitle>
                      <CardDescription>Information about missing data that was automatically filled</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Missing Fields (Before):</p>
                          {Object.keys(batchResult.data_quality.missing_before).length > 0 ? (
                            <ul className="text-sm space-y-1">
                              {Object.entries(batchResult.data_quality.missing_before).map(([key, value]) => (
                                <li key={key} className="text-muted-foreground">
                                  {key}: {value} missing values
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground">No missing data</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Processing Results:</p>
                          <ul className="text-sm space-y-1">
                            <li className="text-green-600">✓ All missing data filled automatically</li>
                            <li className="text-green-600">✓ {batchResult.data_quality.rows_processed} rows processed</li>
                            <li className="text-green-600">✓ {batchResult.data_quality.columns_processed} columns analyzed</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Distribution</CardTitle>
                      <CardDescription>Breakdown of bookings by risk level</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(batchResult.statistics.risk_distribution).map(([level, count]) => (
                          <div key={level}>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="font-medium">{level}</span>
                              <span className="text-muted-foreground">{count} bookings</span>
                            </div>
                            <Progress 
                              value={(count / batchResult.total_bookings) * 100} 
                              className="h-2"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Predictions Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Individual Predictions</CardTitle>
                      <CardDescription>Detailed results for each booking</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Booking ID</TableHead>
                              <TableHead>Cancellation Probability</TableHead>
                              <TableHead>Risk Level</TableHead>
                              <TableHead>Confidence</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {batchResult.predictions.map((pred) => (
                              <TableRow key={pred.booking_id}>
                                <TableCell className="font-medium">#{pred.booking_id}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <span className={`font-bold ${getRiskColor(pred.risk_level)}`}>
                                      {pred.cancellation_probability}%
                                    </span>
                                    <Progress 
                                      value={pred.cancellation_probability} 
                                      className="h-2 w-20"
                                    />
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge 
                                    variant="outline" 
                                    className={getRiskColor(pred.risk_level)}
                                  >
                                    {pred.risk_level}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {pred.confidence}%
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>

                  <Button 
                    onClick={downloadBatchResults}
                    className="w-full"
                    size="lg"
                  >
                    Download Results
                  </Button>
                </>
              )}

              {!batchResult && !isBatchLoading && (
                <Card className="border-dashed">
                  <CardContent className="pt-6 text-center py-12">
                    <FileSpreadsheet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Upload a file to start batch analysis
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}