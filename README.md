Project Requirements Summary

Project Overview:

Build an automated system for South African clients to:

1.
Upload bank statements.

2.
Enter study/career goals.

3.
Get a financial audit powered by Gemini AI.

4.
Receive a PDF report with budgeting, coaching, and advice.

5.
Receive results via Telegram, WhatsApp, or Email.

Core Features:

1. Bank Statement Upload:

•
Supported Formats: .CSV (Capitec, FNB, Nedbank, Standard Bank), .PDF (scanned or digital).

•
Upload Methods: Telegram bot (preferred), WhatsApp (via Twilio API), Web form.

•
Parsing: Extract date, description, amount. Categorize into: Rent, Food, Transport, Subscriptions, Clothing, Utilities, Loans, etc.

2. Gemini AI Financial Advisor Integration:

•
API: Google Gemini API.

•
Prompt Output: Overspending alerts, wasteful spending highlights, smart advice based on income, 50/30/20 budgeting plan, action plan (cost-cutting ideas), coaching on study/goal, timeline toward dream income.

3. PDF Report Generator:

•
Sections:

•
A. Bank Statement Overview (Statement Period, Income vs Expenses, Overspend amount, Closing balance, Categorized table of spending, Weekly spending summary, Notable transactions).

•
B. AI Financial Audit (Gemini-generated audit text, Overspending analysis, Recommendations for budgeting, Lifestyle change tips).

•
C. Study & Goal Check (Current spending vs. goal, study continuation based on finances, delaying dream by overspending).

•
D. Smart Budget Plan (Ideal 50/30/20 model, actual vs. recommended comparison).

•
E. Action Plan Table (Action, Monthly Savings).

•
F. Goal Tracker (Timeline toward R50K/month goal, on track or delayed).



4. Report Delivery System:

•
Channels: Telegram bot (auto), WhatsApp (via Twilio), Email (SMTP or Gmail API).

•
Optional: Google Drive link or Airtable entry.

5. (Optional) Admin Dashboard:

•
Features: View client submissions, track usage, update/resend reports.

•
Suggested Tech: Streamlit or simple admin panel.

Tech Stack Suggestions:

•
Backend: Python (Flask/FastAPI) or Node.js.

•
AI: Google Gemini API.

•
File Upload: Flask + HTML/JS or Telegram Bot API.

•
PDF Generator: reportlab, fpdf, or pdfkit.

•
WhatsApp: Twilio API.

•
Charts: matplotlib or plotly.

•
Bot: python-telegram-bot or Node wrapper.

•
Automation: n8n or cron job.

Final Deliverables:

•
Fully working web/Telegram bot accepting uploads.

•
Parser for CSV + PDF bank statements.

•
Categorization logic.

•
Gemini prompt automation.

•
AI analysis results.

•
PDF report generator with all sections.

•
PDF delivery system.

•
Basic admin interface (optional).

Provided by User:

•
Gemini API Key (dummy key provided: AIzaSyAJFQ_m8mrEB8n_QfiO7nosPfz9wJAtk_0)

•
Sample bank statement files (if needed)

•
Branding or logo for the PDF (if needed)

•
Prompt templates for AI audit (if needed)

•
Sample action plans (if needed)

Key Focus:

Speed, clarity, and automation. Client-ready system that feels like a real financial advisor.

