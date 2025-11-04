"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart3, TrendingUp, TrendingDown, Calendar, DollarSign, Users, Target, AlertTriangle } from "lucide-react"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

const monthlyData = [
  { month: "Jan", cancellations: 245, bookings: 1200, rate: 20.4 },
  { month: "Feb", cancellations: 198, bookings: 980, rate: 20.2 },
  { month: "Mar", cancellations: 312, bookings: 1450, rate: 21.5 },
  { month: "Apr", cancellations: 289, bookings: 1350, rate: 21.4 },
  { month: "May", cancellations: 334, bookings: 1520, rate: 22.0 },
  { month: "Jun", cancellations: 402, bookings: 1680, rate: 23.9 },
  { month: "Jul", cancellations: 456, bookings: 1850, rate: 24.6 },
  { month: "Aug", cancellations: 423, bookings: 1780, rate: 23.8 },
  { month: "Sep", cancellations: 298, bookings: 1420, rate: 21.0 },
  { month: "Oct", cancellations: 267, bookings: 1380, rate: 19.3 },
  { month: "Nov", cancellations: 189, bookings: 1050, rate: 18.0 },
  { month: "Dec", cancellations: 278, bookings: 1400, rate: 19.9 },
]

const riskDistribution = [
  { name: "Low Risk", value: 42, color: "#22c55e" },
  { name: "Medium Risk", value: 31, color: "#eab308" },
  { name: "High Risk", value: 19, color: "#f97316" },
  { name: "Very High Risk", value: 8, color: "#ef4444" },
]

const depositTypeData = [
  { type: "No Deposit", cancellations: 68, bookings: 180 },
  { type: "Refundable", cancellations: 45, bookings: 220 },
  { type: "Non-Refundable", cancellations: 12, bookings: 185 },
]

const leadTimeData = [
  { range: "0-7 days", rate: 8.5 },
  { range: "8-30 days", rate: 15.2 },
  { range: "31-60 days", rate: 22.8 },
  { range: "61-90 days", rate: 28.4 },
  { range: "90+ days", rate: 35.6 },
]

const marketSegmentData = [
  { segment: "Direct", rate: 16.5 },
  { segment: "Online TA", rate: 25.8 },
  { segment: "Corporate", rate: 12.3 },
  { segment: "Groups", rate: 19.4 },
  { segment: "Offline TA", rate: 21.7 },
]

export default function AnalyticsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <BarChart3 className="h-3 w-3 mr-1" />
            Real-Time Analytics
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cancellation Analytics Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive insights and trends to help you understand cancellation patterns.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Cancellation Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21.3%</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-green-600" />
                <span className="text-green-600">2.4% lower than last year</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cancellations</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,691</div>
              <p className="text-xs text-muted-foreground">
                Out of 17,060 bookings this year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Loss</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1.2M</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-red-600" />
                <span className="text-red-600">8.3% of potential revenue</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Lead Time</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47 days</div>
              <p className="text-xs text-muted-foreground">
                For cancelled bookings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="factors">Risk Factors</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Cancellation Trends</CardTitle>
                <CardDescription>
                  Cancellation rates and volumes over the past 12 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="cancellations" stroke="#ef4444" strokeWidth={2} name="Cancellations" />
                      <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} name="Rate %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Patterns</CardTitle>
                  <CardDescription>Peak cancellation months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Summer (Jun-Aug)</span>
                        <span className="text-sm text-muted-foreground">24.1% avg rate</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: "24.1%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Spring (Mar-May)</span>
                        <span className="text-sm text-muted-foreground">21.6% avg rate</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: "21.6%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Fall (Sep-Nov)</span>
                        <span className="text-sm text-muted-foreground">19.4% avg rate</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: "19.4%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Winter (Dec-Feb)</span>
                        <span className="text-sm text-muted-foreground">20.2% avg rate</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: "20.2%" }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>Data-driven observations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Summer months show 15% higher cancellation rates due to vacation planning changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingDown className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Corporate bookings have lowest cancellation rate at 12.3%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Bookings with no deposit are 4.2x more likely to be cancelled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Lead times over 90 days show 35.6% cancellation rate</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Risk Factors Tab */}
          <TabsContent value="factors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Time Impact</CardTitle>
                  <CardDescription>Cancellation rate by booking lead time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={leadTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <ChartTooltip />
                        <Bar dataKey="rate" fill="#ef4444" name="Cancellation Rate %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deposit Type Analysis</CardTitle>
                  <CardDescription>Impact of deposit requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={depositTypeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <ChartTooltip />
                        <Bar dataKey="cancellations" fill="#f97316" name="Cancellations" />
                        <Bar dataKey="bookings" fill="#3b82f6" name="Total Bookings" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Risk Factors</CardTitle>
                <CardDescription>Features with highest impact on cancellation prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { factor: "Lead Time", importance: 28.5 },
                    { factor: "Deposit Type", importance: 22.3 },
                    { factor: "Previous Cancellations", importance: 18.7 },
                    { factor: "Market Segment", importance: 12.4 },
                    { factor: "Booking Changes", importance: 9.8 },
                    { factor: "Special Requests", importance: 8.3 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{item.factor}</span>
                        <span className="text-sm text-muted-foreground">{item.importance}% importance</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
                          style={{ width: `${item.importance}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Segments Tab */}
          <TabsContent value="segments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Segment Analysis</CardTitle>
                <CardDescription>Cancellation rates by booking channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketSegmentData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="segment" type="category" width={100} />
                      <ChartTooltip />
                      <Bar dataKey="rate" fill="#8b5cf6" name="Cancellation Rate %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Best Performer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">Corporate</div>
                  <p className="text-sm text-muted-foreground">12.3% cancellation rate</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Strong commitment and business necessity drive low cancellation rates
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Needs Attention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 mb-2">Online TA</div>
                  <p className="text-sm text-muted-foreground">25.8% cancellation rate</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Easy booking modifications and flexible policies increase risk
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Direct</div>
                  <p className="text-sm text-muted-foreground">16.5% cancellation rate</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Direct contact allows better guest engagement and retention
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Distribution Tab */}
          <TabsContent value="distribution" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Percentage of bookings by risk category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name}: ${entry.value}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {riskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Category Breakdown</CardTitle>
                  <CardDescription>Detailed statistics by risk level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {riskDistribution.map((risk, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="h-3 w-3 rounded-full" 
                              style={{ backgroundColor: risk.color }}
                            />
                            <span className="font-medium">{risk.name}</span>
                          </div>
                          <span className="text-2xl font-bold">{risk.value}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {risk.name === "Low Risk" && "Stable bookings with strong confirmation signals"}
                          {risk.name === "Medium Risk" && "Standard bookings requiring monitoring"}
                          {risk.name === "High Risk" && "Requires proactive engagement and follow-up"}
                          {risk.name === "Very High Risk" && "Implement immediate retention strategies"}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Model Performance Metrics</CardTitle>
                <CardDescription>ML model accuracy and reliability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">95.2%</div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">93.8%</div>
                    <p className="text-sm text-muted-foreground">Precision</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">92.4%</div>
                    <p className="text-sm text-muted-foreground">Recall</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">0.94</div>
                    <p className="text-sm text-muted-foreground">F1 Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
