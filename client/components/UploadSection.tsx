"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, ArrowRight, FileCheck } from 'lucide-react'

interface UploadSectionProps {
  onComplete: () => void
}

export default function UploadSection({ onComplete }: UploadSectionProps) {
  const [cvUploaded, setCvUploaded] = useState(false)
  const [transcriptUploaded, setTranscriptUploaded] = useState(false)

  const handleUpload = (type: "cv" | "transcript") => {
    if (type === "cv") setCvUploaded(true)
    else setTranscriptUploaded(true)
  }

  return (
    <div id="upload-section" className="scroll-mt-16">
      <Card className="p-8 backdrop-blur-lg bg-white/90 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Upload Your Documents</h2>
          <span className="text-sm text-gray-500">(Optional)</span>
        </div>
        
        <div className="space-y-6">
          <UploadButton
            label="Upload CV"
            onUpload={() => handleUpload("cv")}
            uploaded={cvUploaded}
          />
          <UploadButton
            label="Upload Relevé de Notes"
            onUpload={() => handleUpload("transcript")}
            uploaded={transcriptUploaded}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Button onClick={onComplete} className="w-full group">
            {cvUploaded || transcriptUploaded ? (
              <>
                Continue with Uploads
                <FileCheck className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </>
            ) : (
              <>
                Skip Uploads
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </motion.div>
      </Card>
    </div>
  )
}

interface UploadButtonProps {
  label: string
  onUpload: () => void
  uploaded: boolean
}

function UploadButton({ label, onUpload, uploaded }: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onUpload()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
    >
      <span className="text-gray-700">{label}</span>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx"
      />
      <Button
        onClick={handleClick}
        disabled={uploaded}
        variant={uploaded ? "default" : "outline"}
        className={`transition-all duration-300 ${
          uploaded ? "bg-green-500 hover:bg-green-600" : ""
        }`}
      >
        {uploaded ? "Uploaded" : "Upload"}
        <Upload className={`ml-2 h-4 w-4 ${
          uploaded ? "" : "group-hover:translate-y-[-2px] transition-transform"
        }`} />
      </Button>
    </motion.div>
  )
}