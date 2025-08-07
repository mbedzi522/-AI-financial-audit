// Gemini AI Service for Financial Analysis
const GEMINI_API_KEY = 'AIzaSyAJFQ_m8mrEB8n_QfiO7nosPfz9wJAtk_0'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

export class GeminiService {
  static async analyzeFinancialData(transactionData, goalData) {
    try {
      const prompt = this.buildFinancialAnalysisPrompt(transactionData, goalData)
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`)
      }

      const data = await response.json()
      const analysisText = data.candidates[0].content.parts[0].text
      
      return this.parseAnalysisResponse(analysisText, transactionData, goalData)
    } catch (error) {
      console.error('Gemini API Error:', error)
      // Return mock data for demo purposes
      return this.getMockAnalysis(transactionData, goalData)
    }
  }

  static buildFinancialAnalysisPrompt(transactionData, goalData) {
    const { transactions, totalIncome, totalExpenses, categories } = transactionData
    const { currentIncome, targetIncome, timeframe, studyGoals, careerGoals } = goalData

    return `
You are a professional financial advisor analyzing a South African client's bank statement and career goals. 

FINANCIAL DATA:
- Monthly Income: R${totalIncome.toLocaleString()}
- Monthly Expenses: R${totalExpenses.toLocaleString()}
- Net Balance: R${(totalIncome - totalExpenses).toLocaleString()}

SPENDING CATEGORIES:
${Object.entries(categories).map(([category, amount]) => 
  `- ${category}: R${amount.toLocaleString()}`
).join('\n')}

CLIENT GOALS:
- Current Income: R${currentIncome}
- Target Income: R${targetIncome}
- Timeframe: ${timeframe}
- Study Goals: ${studyGoals}
- Career Goals: ${careerGoals}

Please provide a comprehensive financial analysis including:

1. KEY FINDINGS (3-4 bullet points about spending patterns, overspending areas, financial habits)

2. RECOMMENDATIONS (4-5 specific actionable recommendations for budgeting and saving)

3. BUDGET ANALYSIS (How their spending compares to the 50/30/20 rule)

4. GOAL ASSESSMENT (Whether their current spending supports or hinders their career goals)

5. ACTION PLAN (5 specific actions they can take with estimated monthly savings for each)

6. TIMELINE ASSESSMENT (Are they on track to reach their R${targetIncome} goal in ${timeframe}?)

Format your response as structured text that can be easily parsed. Be specific about rand amounts and percentages. Focus on South African context and be encouraging but realistic.
    `
  }

  static parseAnalysisResponse(analysisText, transactionData, goalData) {
    // In a real implementation, you would parse the AI response
    // For now, return structured mock data based on the actual transaction data
    return this.getMockAnalysis(transactionData, goalData)
  }

  static getMockAnalysis(transactionData, goalData) {
    const { totalIncome, totalExpenses, categories } = transactionData
    const overspending = Math.max(0, totalExpenses - totalIncome)
    
    return {
      overview: {
        totalIncome,
        totalExpenses,
        netBalance: totalIncome - totalExpenses,
        overspending
      },
      aiInsights: {
        keyFindings: [
          `You're spending ${((totalExpenses / totalIncome) * 100).toFixed(1)}% of your income monthly`,
          `Highest spending category is ${this.getHighestCategory(categories)} at R${Math.max(...Object.values(categories)).toLocaleString()}`,
          overspending > 0 ? `Overspending by R${overspending.toLocaleString()} per month` : 'Maintaining positive cash flow',
          'Subscription services and takeaways are major expense areas'
        ],
        recommendations: [
          'Implement the 50/30/20 budgeting rule for better financial structure',
          'Cancel unused subscriptions and reduce takeaway spending',
          'Set up automatic savings transfers on payday',
          'Track daily expenses using a budgeting app',
          'Consider additional income streams to reach your target faster'
        ]
      },
      budgetPlan: {
        categories: [
          {
            name: 'Needs (50%)',
            current: categories.rent + categories.utilities + categories.groceries,
            recommended: totalIncome * 0.5,
            percentage: 50
          },
          {
            name: 'Wants (30%)',
            current: categories.entertainment + categories.shopping + categories.dining,
            recommended: totalIncome * 0.3,
            percentage: 30
          },
          {
            name: 'Savings (20%)',
            current: Math.max(0, totalIncome - totalExpenses),
            recommended: totalIncome * 0.2,
            percentage: 20
          }
        ]
      },
      actionPlan: {
        actions: [
          { description: 'Cancel unused streaming subscriptions', monthlySavings: 200 },
          { description: 'Reduce takeaway orders to twice per week', monthlySavings: 800 },
          { description: 'Shop with a grocery list and budget', monthlySavings: 400 },
          { description: 'Use public transport instead of Uber when possible', monthlySavings: 600 },
          { description: 'Find a side hustle or freelance work', monthlySavings: 2000 }
        ],
        totalSavings: 4000
      },
      goalTracker: {
        currentIncome: parseInt(goalData.currentIncome),
        targetIncome: parseInt(goalData.targetIncome),
        progressPercentage: Math.round((parseInt(goalData.currentIncome) / parseInt(goalData.targetIncome)) * 100),
        onTrack: overspending === 0,
        timeline: goalData.timeframe,
        revisedTimeline: overspending > 0 ? this.calculateRevisedTimeline(goalData.timeframe) : goalData.timeframe
      }
    }
  }

  static getHighestCategory(categories) {
    return Object.entries(categories).reduce((a, b) => categories[a[0]] > categories[b[0]] ? a : b)[0]
  }

  static calculateRevisedTimeline(originalTimeframe) {
    const timeMap = {
      '1-year': '18 months',
      '2-years': '3 years',
      '3-years': '4-5 years',
      '5-years': '7-8 years',
      '10-years': '12-15 years'
    }
    return timeMap[originalTimeframe] || 'longer than planned'
  }
}

