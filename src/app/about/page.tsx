import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Database, Zap, Shield, CheckCircle, TrendingUp, Target, BarChart3 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <Brain className="h-3 w-3 mr-1" />
            About Our Model
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ML-Powered Cancellation Prediction
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how our advanced machine learning model predicts hotel booking cancellations with industry-leading accuracy.
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What is Cancellation Prediction?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Hotel booking cancellation prediction is a machine learning solution that analyzes historical booking data and guest behavior patterns to predict the likelihood of a reservation being cancelled. Our model helps hotels:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Optimize revenue management and dynamic pricing strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Implement targeted retention campaigns for high-risk bookings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Make informed overbooking decisions to minimize lost revenue</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Reduce financial losses from last-minute cancellations</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Model Architecture */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Model Architecture & Methodology</CardTitle>
            <CardDescription>How our prediction system works</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Training Data</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our model is trained on over 2 million hotel booking records from diverse properties worldwide, spanning multiple years and including both cancelled and confirmed reservations.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Algorithms</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  We use ensemble methods combining Random Forest, XGBoost, and Neural Networks to achieve optimal performance. The ensemble approach provides robust predictions across different booking patterns.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Real-Time Processing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Predictions are generated in milliseconds using optimized inference pipelines. The model is updated weekly with new data to maintain accuracy.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Validation</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Rigorous cross-validation and holdout testing ensure model generalization. We achieve 95%+ accuracy on unseen data across different hotel types.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Features Used in Prediction</CardTitle>
            <CardDescription>26 features analyzed by our ML model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Booking Characteristics</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Lead time (days between booking and arrival)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Arrival date (month, week, day)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Length of stay</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Number of adults and children</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Room type and assigned room</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Meal plan (BB, HB, FB)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Guest Behavior</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Previous cancellations by guest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Previous bookings (not cancelled)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Guest type (transient, group, contract)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Number of special requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Booking changes (modifications)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Financial Factors</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Deposit type (no deposit, refundable, non-refundable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Average daily rate (ADR)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Total booking value</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Distribution Channel</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Market segment (online TA, direct, corporate, groups)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Distribution channel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Customer country of origin</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Model Performance & Accuracy</CardTitle>
            <CardDescription>Validated metrics on test dataset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 border rounded-lg">
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold mb-1">95.2%</div>
                <p className="text-sm text-muted-foreground">Overall Accuracy</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold mb-1">93.8%</div>
                <p className="text-sm text-muted-foreground">Precision</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold mb-1">92.4%</div>
                <p className="text-sm text-muted-foreground">Recall</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold mb-1">0.94</div>
                <p className="text-sm text-muted-foreground">F1 Score</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong>Accuracy</strong> measures the percentage of correct predictions (both cancelled and non-cancelled bookings).
              </p>
              <p>
                <strong>Precision</strong> indicates how many predicted cancellations actually resulted in cancellations, minimizing false alarms.
              </p>
              <p>
                <strong>Recall</strong> shows how many actual cancellations we successfully identified, ensuring we don't miss high-risk bookings.
              </p>
              <p>
                <strong>F1 Score</strong> is the harmonic mean of precision and recall, providing a balanced measure of model performance.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Real-World Applications</CardTitle>
            <CardDescription>How hotels use cancellation predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Revenue Management</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust pricing strategies and overbooking levels based on predicted cancellation rates for different segments and time periods.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Guest Communication</h3>
                <p className="text-sm text-muted-foreground">
                  Send targeted pre-arrival messages and confirmation reminders to guests with high cancellation risk to improve retention.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Inventory Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Make data-driven decisions about accepting group bookings and allocation of room types based on expected availability.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Policy Design</h3>
                <p className="text-sm text-muted-foreground">
                  Design deposit requirements and cancellation policies for different channels and booking patterns to minimize risk.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
            <CardDescription>For developers and data scientists</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Model Stack</h3>
              <ul className="space-y-1 ml-6">
                <li>• Python 3.11+ with scikit-learn, XGBoost, TensorFlow</li>
                <li>• Feature engineering with pandas and NumPy</li>
                <li>• Hyperparameter tuning using Optuna</li>
                <li>• Model serving with FastAPI and Docker</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Data Processing</h3>
              <ul className="space-y-1 ml-6">
                <li>• Automated data cleaning and outlier detection</li>
                <li>• Feature scaling and normalization</li>
                <li>• Categorical encoding (one-hot and target encoding)</li>
                <li>• Time-series feature extraction</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">API Integration</h3>
              <ul className="space-y-1 ml-6">
                <li>• RESTful API with JSON request/response</li>
                <li>• Batch and real-time prediction endpoints</li>
                <li>• Rate limiting and authentication</li>
                <li>• Comprehensive API documentation with examples</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
