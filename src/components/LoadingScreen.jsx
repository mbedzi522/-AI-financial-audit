import { Card, CardContent } from '@/components/ui/card.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Brain, FileText, Calculator, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { icon: FileText, text: "Analyzing bank statement...", duration: 2000 },
    { icon: Calculator, text: "Categorizing transactions...", duration: 2500 },
    { icon: Brain, text: "AI generating financial insights...", duration: 3000 },
    { icon: TrendingUp, text: "Creating personalized recommendations...", duration: 2000 },
    { icon: FileText, text: "Generating PDF report...", duration: 1500 }
  ]

  useEffect(() => {
    let totalDuration = 0
    let currentDuration = 0

    const totalTime = steps.reduce((acc, step) => acc + step.duration, 0)

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        currentDuration += 100
        totalDuration += 100
        
        const stepProgress = (currentDuration / steps[currentStep].duration) * 100
        const overallProgress = (totalDuration / totalTime) * 100
        
        setProgress(overallProgress)
        
        if (currentDuration >= steps[currentStep].duration) {
          setCurrentStep(prev => prev + 1)
          currentDuration = 0
        }
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const CurrentIcon = currentStep < steps.length ? steps[currentStep].icon : FileText

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                  <CurrentIcon className="h-8 w-8 text-primary animate-bounce" />
                </div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Processing Your Financial Data</h2>
              <p className="text-muted-foreground">
                {currentStep < steps.length ? steps[currentStep].text : "Almost done..."}
              </p>
            </div>
            
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                {Math.round(progress)}% complete
              </p>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>Our AI is analyzing your spending patterns and generating personalized insights.</p>
              <p className="mt-1">This usually takes 30-60 seconds.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

