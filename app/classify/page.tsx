"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Upload, FileText } from "lucide-react"

export default function ClassifyPage() {
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Only create preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target) {
            setFilePreview(event.target.result as string)
          }
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setFilePreview(null)
      }

      setResult(null)
      setConfidence(null)
    }
  }

  const classifyFile = () => {
    setLoading(true)

    // Simulate classification with a timeout
    setTimeout(() => {
      // This is a mock result - in a real app, you would call an API
      const isAdversarial = Math.random() > 0.5
      const confidenceScore = Math.round(Math.random() * 50 + 50)

      setResult(isAdversarial ? "Adversarial" : "Clean")
      setConfidence(confidenceScore)
      setLoading(false)
    }, 1500)
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 relative">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="container max-w-4xl py-12 relative z-10">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Classify File</h1>
            <p className="mt-2 text-muted-foreground">Upload any file to analyze for adversarial perturbations.</p>
          </div>

          <Card className="backdrop-blur-sm bg-background/60 shadow-md">
            <CardHeader>
              <CardTitle>File Classifier</CardTitle>
              <CardDescription>Upload a file to analyze it for potential adversarial modifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div
                    className="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50/50 hover:bg-gray-100/50"
                    onClick={triggerFileInput}
                  >
                    {filePreview ? (
                      <Image
                        src={filePreview || "/placeholder.svg"}
                        alt="Uploaded file preview"
                        fill
                        className="object-contain p-2"
                      />
                    ) : file ? (
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="h-16 w-16 text-gray-400 mb-3" />
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-10 w-10 text-gray-400 mb-3" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">Any file type (MAX. 10MB)</p>
                      </div>
                    )}
                    <Input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                  </div>
                </div>

                {(file || filePreview) && (
                  <div className="flex justify-center">
                    <Button onClick={classifyFile} disabled={loading} className="w-full max-w-xs">
                      {loading ? "Analyzing..." : "Analyze File"}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            {result && (
              <CardFooter className="flex flex-col space-y-4">
                <div className="w-full rounded-lg bg-muted p-4">
                  <div className="mb-2 font-medium">Classification Result:</div>
                  <div className="flex items-center justify-between">
                    <span className={result === "Adversarial" ? "text-red-500 font-bold" : "text-green-500 font-bold"}>
                      {result}
                    </span>
                    <span className="text-sm text-muted-foreground">Confidence: {confidence}%</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {result === "Adversarial"
                    ? "This file appears to contain adversarial perturbations that might fool a machine learning model."
                    : "This file appears to be clean without detectable adversarial modifications."}
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
