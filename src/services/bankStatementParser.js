// Bank Statement Parser for South African Banks
export class BankStatementParser {
  static async parseFile(file) {
    const fileType = file.type
    
    if (fileType === 'text/csv') {
      return await this.parseCSV(file)
    } else if (fileType === 'application/pdf') {
      return await this.parsePDF(file)
    } else {
      throw new Error('Unsupported file type')
    }
  }

  static async parseCSV(file) {
    const text = await file.text()
    const lines = text.split('\n').filter(line => line.trim())
    
    // Detect bank format based on headers
    const headers = lines[0].toLowerCase()
    
    if (headers.includes('capitec')) {
      return this.parseCapitecCSV(lines)
    } else if (headers.includes('fnb') || headers.includes('first national')) {
      return this.parseFNBCSV(lines)
    } else if (headers.includes('nedbank')) {
      return this.parseNedbankCSV(lines)
    } else if (headers.includes('standard') || headers.includes('stanbic')) {
      return this.parseStandardBankCSV(lines)
    } else {
      // Generic CSV parser
      return this.parseGenericCSV(lines)
    }
  }

  static async parsePDF(file) {
    // For demo purposes, return mock data
    // In a real implementation, you would use PDF parsing libraries
    return this.getMockTransactionData()
  }

  static parseGenericCSV(lines) {
    const transactions = []
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
    
    // Find column indices
    const dateIndex = this.findColumnIndex(headers, ['date', 'transaction date', 'posting date'])
    const descIndex = this.findColumnIndex(headers, ['description', 'reference', 'details', 'transaction details'])
    const amountIndex = this.findColumnIndex(headers, ['amount', 'debit', 'credit', 'transaction amount'])
    const balanceIndex = this.findColumnIndex(headers, ['balance', 'running balance', 'available balance'])

    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(',').map(col => col.trim().replace(/"/g, ''))
      
      if (columns.length >= 3) {
        const transaction = {
          date: this.parseDate(columns[dateIndex] || columns[0]),
          description: columns[descIndex] || columns[1] || 'Unknown Transaction',
          amount: this.parseAmount(columns[amountIndex] || columns[2]),
          balance: balanceIndex >= 0 ? this.parseAmount(columns[balanceIndex]) : null,
          category: this.categorizeTransaction(columns[descIndex] || columns[1] || '')
        }
        
        if (transaction.date && !isNaN(transaction.amount)) {
          transactions.push(transaction)
        }
      }
    }

    return this.processTransactions(transactions)
  }

  static parseCapitecCSV(lines) {
    // Capitec specific parsing logic
    return this.parseGenericCSV(lines)
  }

  static parseFNBCSV(lines) {
    // FNB specific parsing logic
    return this.parseGenericCSV(lines)
  }

  static parseNedbankCSV(lines) {
    // Nedbank specific parsing logic
    return this.parseGenericCSV(lines)
  }

  static parseStandardBankCSV(lines) {
    // Standard Bank specific parsing logic
    return this.parseGenericCSV(lines)
  }

  static findColumnIndex(headers, possibleNames) {
    for (const name of possibleNames) {
      const index = headers.findIndex(header => header.includes(name))
      if (index >= 0) return index
    }
    return -1
  }

  static parseDate(dateString) {
    if (!dateString) return null
    
    // Handle various date formats
    const formats = [
      /(\d{4})-(\d{2})-(\d{2})/, // YYYY-MM-DD
      /(\d{2})\/(\d{2})\/(\d{4})/, // DD/MM/YYYY
      /(\d{2})-(\d{2})-(\d{4})/, // DD-MM-YYYY
    ]

    for (const format of formats) {
      const match = dateString.match(format)
      if (match) {
        if (format === formats[0]) {
          return new Date(match[1], match[2] - 1, match[3])
        } else {
          return new Date(match[3], match[2] - 1, match[1])
        }
      }
    }

    return new Date(dateString)
  }

  static parseAmount(amountString) {
    if (!amountString) return 0
    
    // Remove currency symbols and spaces
    const cleaned = amountString.toString()
      .replace(/[R$€£,\s]/g, '')
      .replace(/[()]/g, '') // Remove parentheses
    
    const amount = parseFloat(cleaned)
    return isNaN(amount) ? 0 : amount
  }

  static categorizeTransaction(description) {
    const desc = description.toLowerCase()
    
    const categories = {
      rent: ['rent', 'rental', 'property', 'landlord'],
      utilities: ['electricity', 'water', 'gas', 'municipal', 'rates', 'eskom'],
      groceries: ['checkers', 'pick n pay', 'woolworths', 'spar', 'shoprite', 'food', 'grocery'],
      transport: ['uber', 'bolt', 'taxi', 'petrol', 'fuel', 'garage', 'transport'],
      entertainment: ['netflix', 'dstv', 'showmax', 'spotify', 'cinema', 'movies'],
      dining: ['restaurant', 'takeaway', 'mcdonald', 'kfc', 'pizza', 'nando', 'steers'],
      shopping: ['clothing', 'fashion', 'shoes', 'mall', 'online', 'amazon', 'takealot'],
      medical: ['doctor', 'pharmacy', 'medical', 'hospital', 'clinic', 'dentist'],
      education: ['university', 'college', 'school', 'tuition', 'books', 'study'],
      subscriptions: ['subscription', 'monthly', 'annual', 'membership'],
      banking: ['bank', 'fee', 'charge', 'interest', 'atm'],
      income: ['salary', 'wage', 'payment', 'deposit', 'transfer in']
    }

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => desc.includes(keyword))) {
        return category
      }
    }

    return 'other'
  }

  static processTransactions(transactions) {
    // Sort by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date))

    // Calculate totals and categories
    let totalIncome = 0
    let totalExpenses = 0
    const categories = {}

    transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        totalIncome += transaction.amount
      } else {
        totalExpenses += Math.abs(transaction.amount)
      }

      const category = transaction.category
      if (!categories[category]) {
        categories[category] = 0
      }
      categories[category] += Math.abs(transaction.amount)
    })

    return {
      transactions,
      totalIncome,
      totalExpenses,
      categories,
      period: this.getStatementPeriod(transactions)
    }
  }

  static getStatementPeriod(transactions) {
    if (transactions.length === 0) return 'Unknown'
    
    const dates = transactions.map(t => new Date(t.date)).sort()
    const startDate = dates[0]
    const endDate = dates[dates.length - 1]
    
    return `${startDate.toLocaleDateString('en-ZA')} - ${endDate.toLocaleDateString('en-ZA')}`
  }

  static getMockTransactionData() {
    // Mock data for demo purposes
    const mockTransactions = [
      { date: new Date('2024-01-15'), description: 'Salary Deposit', amount: 25000, category: 'income' },
      { date: new Date('2024-01-16'), description: 'Rent Payment', amount: -8000, category: 'rent' },
      { date: new Date('2024-01-17'), description: 'Checkers Grocery', amount: -1200, category: 'groceries' },
      { date: new Date('2024-01-18'), description: 'Netflix Subscription', amount: -199, category: 'entertainment' },
      { date: new Date('2024-01-19'), description: 'Uber Trip', amount: -85, category: 'transport' },
      { date: new Date('2024-01-20'), description: 'McDonald\'s', amount: -120, category: 'dining' },
      { date: new Date('2024-01-21'), description: 'Electricity Bill', amount: -450, category: 'utilities' },
      { date: new Date('2024-01-22'), description: 'Takealot Purchase', amount: -350, category: 'shopping' },
      { date: new Date('2024-01-23'), description: 'DStv Subscription', amount: -399, category: 'entertainment' },
      { date: new Date('2024-01-24'), description: 'Petrol Station', amount: -600, category: 'transport' }
    ]

    return this.processTransactions(mockTransactions)
  }
}

