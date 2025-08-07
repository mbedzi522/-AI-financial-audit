import { useState } from 'react'
import { FileUpload } from './components/FileUpload.jsx'
import { GoalForm } from './components/GoalForm.jsx'
import { LoadingScreen } from './components/LoadingScreen.jsx'
import { ReportDisplay } from './components/ReportDisplay.jsx'
import { BankStatementParser } from './services/bankStatementParser.js'
import { GeminiService } from './services/geminiService.js'
import { PDFGenerator } from './services/pdfGenerator.js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Brain, FileText, Target, Download } from 'lucide-react'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState('upload') // upload, goals, processing, report
  const [uploadedFile, setUploadedFile] = useState(null)
  const [transactionData, setTransactionData] = useState(null)
  const [goalData, setGoalData] = useState(null)
  const [reportData, setReportData] = useState(null)

  const handleFileUpload = async (file) => {
    setUploadedFile(file)
    try {
      const parsedData = await BankStatementParser.parseFile(file)
      setTransactionData(parsedData)
      setCurrentStep('goals')
    } catch (error) {
      console.error('Error parsing file:', error)
      alert('Error parsing bank statement. Please check the file format.')
    }
  }

  const handleGoalSubmit = async (goals) => {
    setGoalData(goals)
    setCurrentStep('processing')
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 8000))
      
      const analysis = await GeminiService.analyzeFinancialData(transactionData, goals)
      setReportData(analysis)
      setCurrentStep('report')
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Error generating report. Please try again.')
      setCurrentStep('goals')
    }
  }

  const handleDownloadReport = async () => {
    try {
      await PDFGenerator.generateReport(reportData, { file: uploadedFile.name })
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF report.')
    }
  }

  const handleNewAnalysis = () => {
    setCurrentStep('upload')
    setUploadedFile(null)
    setTransactionData(null)
    setGoalData(null)
    setReportData(null)
  }

  if (currentStep === 'processing') {
    return <LoadingScreen />
  }

  if (currentStep === 'report') {
    return (
      <ReportDisplay 
        reportData={reportData}
        onDownload={handleDownloadReport}
        onNewAnalysis={handleNewAnalysis}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            AI Financial Audit System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your bank statement, set your goals, and get personalized financial insights powered by AI
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              currentStep === 'upload' ? 'bg-primary text-primary-foreground' : 
              ['goals', 'report'].includes(currentStep) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">Upload Statement</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              currentStep === 'goals' ? 'bg-primary text-primary-foreground' : 
              currentStep === 'report' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Set Goals</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              currentStep === 'report' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 text-gray-600'
            }`}>
              <Brain className="h-4 w-4" />
              <span className="text-sm font-medium">AI Analysis</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 'upload' && (
            <div className="space-y-8">
              <FileUpload onFileUpload={handleFileUpload} />
              
              {/* Features Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Smart Parsing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Automatically categorizes transactions from all major South African banks (Capitec, FNB, Nedbank, Standard Bank)
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Brain className="h-5 w-5 text-purple-600" />
                      AI Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Powered by Google Gemini AI to provide personalized financial advice and budgeting recommendations
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Download className="h-5 w-5 text-green-600" />
                      PDF Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Generate comprehensive PDF reports with actionable insights and goal tracking
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentStep === 'goals' && (
            <div className="space-y-6">
              {transactionData && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-green-600">✅ Bank Statement Processed</CardTitle>
                    <CardDescription>
                      Found {transactionData.transactions.length} transactions from {transactionData.period}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Income</p>
                        <p className="text-xl font-bold text-green-600">R{transactionData.totalIncome.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Expenses</p>
                        <p className="text-xl font-bold text-red-600">R{transactionData.totalExpenses.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Net Balance</p>
                        <p className={`text-xl font-bold ${(transactionData.totalIncome - transactionData.totalExpenses) >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                          R{(transactionData.totalIncome - transactionData.totalExpenses).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <GoalForm onGoalSubmit={handleGoalSubmit} />
              
              <div className="text-center">
                <Button variant="outline" onClick={() => setCurrentStep('upload')}>
                  ← Back to Upload
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-muted-foreground">
          <p className="text-sm">
            Secure • Private • AI-Powered Financial Analysis for South African Clients
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

