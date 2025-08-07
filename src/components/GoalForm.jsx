import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Target, GraduationCap, Briefcase } from 'lucide-react'

export function GoalForm({ onGoalSubmit }) {
  const [formData, setFormData] = useState({
    currentIncome: '',
    targetIncome: '',
    timeframe: '',
    studyGoals: '',
    careerGoals: '',
    currentStudies: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onGoalSubmit(formData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Your Financial & Career Goals
        </CardTitle>
        <CardDescription>
          Tell us about your current situation and future aspirations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentIncome">Current Monthly Income (R)</Label>
              <Input
                id="currentIncome"
                type="number"
                placeholder="e.g., 15000"
                value={formData.currentIncome}
                onChange={(e) => handleChange('currentIncome', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetIncome">Target Monthly Income (R)</Label>
              <Input
                id="targetIncome"
                type="number"
                placeholder="e.g., 50000"
                value={formData.targetIncome}
                onChange={(e) => handleChange('targetIncome', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeframe">Timeframe to Achieve Goal</Label>
            <Select onValueChange={(value) => handleChange('timeframe', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-year">1 Year</SelectItem>
                <SelectItem value="2-years">2 Years</SelectItem>
                <SelectItem value="3-years">3 Years</SelectItem>
                <SelectItem value="5-years">5 Years</SelectItem>
                <SelectItem value="10-years">10+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentStudies" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Current Studies/Education
            </Label>
            <Input
              id="currentStudies"
              placeholder="e.g., BCom Accounting, Graphic Design Course"
              value={formData.currentStudies}
              onChange={(e) => handleChange('currentStudies', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studyGoals">Study Goals</Label>
            <Textarea
              id="studyGoals"
              placeholder="What do you want to study or learn? Any certifications or degrees you're pursuing?"
              value={formData.studyGoals}
              onChange={(e) => handleChange('studyGoals', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="careerGoals" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Career Goals
            </Label>
            <Textarea
              id="careerGoals"
              placeholder="What's your dream career? Do you want to start a business, get promoted, change industries?"
              value={formData.careerGoals}
              onChange={(e) => handleChange('careerGoals', e.target.value)}
              rows={3}
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Submit Goals & Generate Report
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

