import { useState, useRef } from "react"
import { motion } from "framer-motion"
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
    <div id="upload-section" className="mt-36">
      <motion.div 
        className="p-8 backdrop-blur-lg bg-white/90 max-w-2xl mx-auto rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between ">
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
          <button
            onClick={onComplete}
            className="w-full group bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white py-3 rounded-md flex items-center justify-center space-x-2"
          >
            <span>
              {cvUploaded || transcriptUploaded ? "Continue with Uploads" : "Skip Uploads"}
            </span>
            {cvUploaded || transcriptUploaded ? (
              <FileCheck className="h-5 w-5 group-hover:scale-110 transition-transform" />
            ) : (
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </motion.div>
      </motion.div>
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
      <button
        onClick={handleClick}
        disabled={uploaded}
        className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 ${
          uploaded
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "border border-gray-300 hover:border-gray-400 text-gray-700"
        }`}
      >
        <span>{uploaded ? "Uploaded" : "Upload"}</span>
        <Upload className={`h-4 w-4 ${
          uploaded ? "" : "group-hover:translate-y-[-2px] transition-transform"
        }`} />
      </button>
    </motion.div>
  )
}