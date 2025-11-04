import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingDown, DollarSign, Target, CheckCircle, BarChart3, Clock, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <Badge className="mb-4" variant="secondary">
              AI-Powered Prediction
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Predict Hotel Booking Cancellations with{" "}
              <span className="text-primary">95% Accuracy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leverage machine learning to identify high-risk bookings, optimize revenue management, and reduce financial losses from cancellations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="text-lg">
                <Link href="/predict">Try Prediction Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Target className="h-10 w-10 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold">95%</div>
                <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <DollarSign className="h-10 w-10 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold">30%</div>
                <p className="text-sm text-muted-foreground">Revenue Loss Reduction</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-10 w-10 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold">48h</div>
                <p className="text-sm text-muted-foreground">Early Warning Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-10 w-10 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold">500+</div>
                <p className="text-sm text-muted-foreground">Hotels Using</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Use Cancellation Prediction?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our ML model analyzes multiple factors to provide accurate predictions and actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Brain className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Advanced ML Algorithm</CardTitle>
                <CardDescription>
                  Trained on millions of booking records using state-of-the-art machine learning techniques including Random Forest and XGBoost.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingDown className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Reduce No-Shows</CardTitle>
                <CardDescription>
                  Identify high-risk bookings early and take proactive measures like overbooking strategies or targeted communication.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Optimize Revenue</CardTitle>
                <CardDescription>
                  Implement dynamic pricing and inventory management based on cancellation probabilities to maximize revenue.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Real-Time Analytics</CardTitle>
                <CardDescription>
                  Access comprehensive dashboards with cancellation trends, seasonal patterns, and key performance indicators.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-4" />
                <CardTitle>High Accuracy</CardTitle>
                <CardDescription>
                  Our model achieves 95% accuracy by analyzing lead time, deposit type, special requests, booking changes, and 20+ other features.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>
                  Simple API integration with your existing property management system. Get predictions in real-time or batch mode.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How The ML Model Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our prediction model analyzes key booking features to determine cancellation risk.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Input Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Lead Time:</strong> Days between booking and arrival</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Deposit Type:</strong> No deposit, non-refundable, or refundable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Previous Cancellations:</strong> Guest cancellation history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Special Requests:</strong> Number of special requests made</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Booking Changes:</strong> Number of modifications made</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Market Segment:</strong> Online TA, Direct, Corporate, etc.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Model Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Cancellation Probability:</strong> 0-100% risk score</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Confidence Score:</strong> Model confidence level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Risk Category:</strong> Low, Medium, High, Very High</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Key Factors:</strong> Most influential features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Recommendations:</strong> Suggested actions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Similar Cases:</strong> Historical comparison</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Predict Cancellations?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Start using our ML model today and reduce your cancellation losses. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-lg">
                  <Link href="/predict">Get Started Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/analytics">View Analytics Demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}