import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Download, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar,
  DollarSign,
  PieChart,
  CheckCircle,
  XCircle
} from 'lucide-react'

export function ReportDisplay({ reportData, onDownload, onNewAnalysis }) {
  const {
    overview,
    aiInsights,
    budgetPlan,
    actionPlan,
    goalTracker
  } = reportData

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              Your AI Financial Audit Report
            </CardTitle>
            <CardDescription>
              Generated on {new Date().toLocaleDateString('en-ZA')}
            </CardDescription>
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={onDownload} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download PDF Report
              </Button>
              <Button variant="outline" onClick={onNewAnalysis}>
                New Analysis
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Financial Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-green-600">R{overview.totalIncome.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">R{overview.totalExpenses.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Net Balance</p>
                <p className={`text-2xl font-bold ${overview.netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  R{overview.netBalance.toLocaleString()}
                </p>
              </div>
            </div>
            
            {overview.overspending > 0 && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span className="font-semibold text-orange-800">Overspending Alert</span>
                </div>
                <p className="text-orange-700">
                  You overspent by <strong>R{overview.overspending.toLocaleString()}</strong> this month.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              AI Financial Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Key Findings</h4>
                <ul className="space-y-1 text-yellow-700">
                  {aiInsights.keyFindings.map((finding, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Recommendations</h4>
                <ul className="space-y-1 text-blue-700">
                  {aiInsights.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Smart Budget Plan (50/30/20 Rule)</CardTitle>
            <CardDescription>
              Recommended allocation vs your current spending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetPlan.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.name}</span>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">
                        R{category.current.toLocaleString()} / R{category.recommended.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={(category.current / category.recommended) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{category.percentage}% of income</span>
                    <span className={category.current > category.recommended ? 'text-red-600' : 'text-green-600'}>
                      {category.current > category.recommended ? 'Over' : 'Under'} by R{Math.abs(category.current - category.recommended).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Action Plan</CardTitle>
            <CardDescription>
              Specific steps to improve your financial situation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {actionPlan.actions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span>{action.description}</span>
                  </div>
                  <Badge variant="secondary" className="text-green-700 bg-green-100">
                    Save R{action.monthlySavings.toLocaleString()}
                  </Badge>
                </div>
              ))}
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-green-800">Total Monthly Savings</span>
                  <span className="text-xl font-bold text-green-600">
                    R{actionPlan.totalSavings.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goal Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Goal Progress Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Current Income</span>
                <span className="font-semibold">R{goalTracker.currentIncome.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Target Income</span>
                <span className="font-semibold">R{goalTracker.targetIncome.toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Progress</span>
                  <span>{goalTracker.progressPercentage}%</span>
                </div>
                <Progress value={goalTracker.progressPercentage} />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  {goalTracker.onTrack ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      On track to reach goal by {goalTracker.timeline}
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <XCircle className="h-4 w-4" />
                      Behind schedule - estimated {goalTracker.revisedTimeline}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

