import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Upload, FileText, CheckCircle } from 'lucide-react'

export function FileUpload({ onFileUpload }) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    const allowedTypes = ['text/csv', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a CSV or PDF file only.')
      return
    }
    
    setUploadedFile(file)
    onFileUpload(file)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Bank Statement
        </CardTitle>
        <CardDescription>
          Upload your CSV or PDF bank statement for analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".csv,.pdf"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          {uploadedFile ? (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <p className="text-sm font-medium">{uploadedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">
                Drag & drop your bank statement here
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse files
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Choose File
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <p>Supported formats: CSV, PDF</p>
          <p>Supported banks: Capitec, FNB, Nedbank, Standard Bank</p>
        </div>
      </CardContent>
    </Card>
  )
}

