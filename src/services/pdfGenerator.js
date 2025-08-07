// PDF Report Generator Service
export class PDFGenerator {
  static async generateReport(reportData, clientInfo) {
    // In a real implementation, this would use a PDF library like jsPDF or PDFKit
    // For now, we'll create a downloadable HTML report that can be printed as PDF
    
    const htmlContent = this.generateHTMLReport(reportData, clientInfo)
    
    // Create a blob and download link
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    
    // Create download link
    const link = document.createElement('a')
    link.href = url
    link.download = `Financial_Audit_Report_${new Date().toISOString().split('T')[0]}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up
    URL.revokeObjectURL(url)
    
    return true
  }

  static generateHTMLReport(reportData, clientInfo = {}) {
    const { overview, aiInsights, budgetPlan, actionPlan, goalTracker } = reportData
    const currentDate = new Date().toLocaleDateString('en-ZA')
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Financial Audit Report</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f8f9fa;
        }
        .report-container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #007bff;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #007bff;
            margin: 0;
            font-size: 2.5em;
        }
        .header p {
            color: #666;
            margin: 10px 0 0 0;
        }
        .section {
            margin-bottom: 30px;
            padding: 20px;
            border-left: 4px solid #007bff;
            background: #f8f9fa;
        }
        .section h2 {
            color: #007bff;
            margin-top: 0;
            font-size: 1.5em;
        }
        .overview-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .overview-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #e9ecef;
        }
        .overview-card.income {
            border-color: #28a745;
            background: #f8fff9;
        }
        .overview-card.expense {
            border-color: #dc3545;
            background: #fff8f8;
        }
        .overview-card.balance {
            border-color: #007bff;
            background: #f8f9ff;
        }
        .overview-card h3 {
            margin: 0 0 10px 0;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .overview-card .amount {
            font-size: 2em;
            font-weight: bold;
            margin: 0;
        }
        .income .amount { color: #28a745; }
        .expense .amount { color: #dc3545; }
        .balance .amount { color: #007bff; }
        .alert {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .alert.warning {
            background: #f8d7da;
            border-color: #f5c6cb;
            color: #721c24;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin-bottom: 8px;
        }
        .budget-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background: white;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #e9ecef;
        }
        .budget-progress {
            width: 100%;
            height: 8px;
            background: #e9ecef;
            border-radius: 4px;
            margin: 5px 0;
        }
        .budget-progress-bar {
            height: 100%;
            background: #007bff;
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        .action-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background: white;
            margin: 10px 0;
            border-radius: 5px;
            border-left: 4px solid #28a745;
        }
        .savings-badge {
            background: #28a745;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.9em;
            font-weight: bold;
        }
        .goal-progress {
            background: #e9ecef;
            height: 20px;
            border-radius: 10px;
            margin: 15px 0;
            overflow: hidden;
        }
        .goal-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #007bff, #28a745);
            border-radius: 10px;
            transition: width 0.3s ease;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #666;
            font-size: 0.9em;
        }
        @media print {
            body { background: white; }
            .report-container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="header">
            <h1>AI Financial Audit Report</h1>
            <p>Generated on ${currentDate}</p>
            <p>Powered by Gemini AI Financial Advisor</p>
        </div>

        <div class="section">
            <h2>📊 Financial Overview</h2>
            <div class="overview-grid">
                <div class="overview-card income">
                    <h3>Total Income</h3>
                    <p class="amount">R${overview.totalIncome.toLocaleString()}</p>
                </div>
                <div class="overview-card expense">
                    <h3>Total Expenses</h3>
                    <p class="amount">R${overview.totalExpenses.toLocaleString()}</p>
                </div>
                <div class="overview-card balance">
                    <h3>Net Balance</h3>
                    <p class="amount">R${overview.netBalance.toLocaleString()}</p>
                </div>
            </div>
            ${overview.overspending > 0 ? `
            <div class="alert warning">
                <strong>⚠️ Overspending Alert:</strong> You overspent by <strong>R${overview.overspending.toLocaleString()}</strong> this month.
            </div>
            ` : ''}
        </div>

        <div class="section">
            <h2>🧠 AI Financial Insights</h2>
            <h3>Key Findings:</h3>
            <ul>
                ${aiInsights.keyFindings.map(finding => `<li>${finding}</li>`).join('')}
            </ul>
            
            <h3>Recommendations:</h3>
            <ul>
                ${aiInsights.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>

        <div class="section">
            <h2>💰 Smart Budget Plan (50/30/20 Rule)</h2>
            <p>Recommended allocation vs your current spending:</p>
            ${budgetPlan.categories.map(category => `
                <div class="budget-item">
                    <div style="flex: 1;">
                        <strong>${category.name}</strong>
                        <div class="budget-progress">
                            <div class="budget-progress-bar" style="width: ${Math.min((category.current / category.recommended) * 100, 100)}%"></div>
                        </div>
                        <small>R${category.current.toLocaleString()} / R${category.recommended.toLocaleString()}</small>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h2>🎯 Action Plan</h2>
            <p>Specific steps to improve your financial situation:</p>
            ${actionPlan.actions.map((action, index) => `
                <div class="action-item">
                    <div>
                        <strong>${index + 1}. ${action.description}</strong>
                    </div>
                    <div class="savings-badge">
                        Save R${action.monthlySavings.toLocaleString()}
                    </div>
                </div>
            `).join('')}
            
            <div class="alert">
                <strong>💡 Total Monthly Savings Potential: R${actionPlan.totalSavings.toLocaleString()}</strong>
            </div>
        </div>

        <div class="section">
            <h2>🏆 Goal Progress Tracker</h2>
            <div style="margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Current Income: <strong>R${goalTracker.currentIncome.toLocaleString()}</strong></span>
                    <span>Target Income: <strong>R${goalTracker.targetIncome.toLocaleString()}</strong></span>
                </div>
                <div class="goal-progress">
                    <div class="goal-progress-bar" style="width: ${goalTracker.progressPercentage}%"></div>
                </div>
                <div style="text-align: center; margin-top: 10px;">
                    <strong>${goalTracker.progressPercentage}% Progress</strong>
                </div>
            </div>
            
            <div class="alert ${goalTracker.onTrack ? '' : 'warning'}">
                ${goalTracker.onTrack 
                    ? `✅ <strong>On Track:</strong> You're on track to reach your goal by ${goalTracker.timeline}`
                    : `⚠️ <strong>Behind Schedule:</strong> Current timeline estimate: ${goalTracker.revisedTimeline}`
                }
            </div>
        </div>

        <div class="footer">
            <p>This report was generated by AI Financial Audit System</p>
            <p>For personalized financial advice, consider consulting with a certified financial planner.</p>
            <p><em>Report generated on ${currentDate}</em></p>
        </div>
    </div>
</body>
</html>
    `
  }
}

