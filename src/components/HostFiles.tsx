"use client"

import { useState, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { File, Upload, Loader2, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type FileItem = {
  id: string
  name: string
  size: string
  uploadDate: string
  status: "uploading" | "completed" | "error"
  progress: number
}

export default function Component() {
  const [files, setFiles] = useState<FileItem[]>([
    { id: "1", name: "very-long-document-name-that-needs-truncating.pdf", size: "2.5 MB", uploadDate: "2023-05-15", status: "completed", progress: 100 },
    { id: "2", name: "image-with-long-descriptive-filename.jpg", size: "1.8 MB", uploadDate: "2023-05-14", status: "completed", progress: 100 },
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const simulateFileUpload = (file: File): Promise<FileItem> => {
    return new Promise((resolve) => {
      const newFile: FileItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        uploadDate: new Date().toISOString().split('T')[0],
        status: "uploading",
        progress: 0,
      }

      setFiles((prevFiles) => [newFile, ...prevFiles])

      const interval = setInterval(() => {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.id === newFile.id
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        )

        if (newFile.progress >= 100) {
          clearInterval(interval)
          resolve({ ...newFile, status: "completed", progress: 100 })
        }
      }, 500)
    })
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (uploadedFiles) {
      for (const file of Array.from(uploadedFiles)) {
        await simulateFileUpload(file)
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    else return (bytes / 1048576).toFixed(1) + ' MB'
  }

  const removeFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id))
  }

  return (
    <TooltipProvider>
      <div className="w-64 bg-card text-card-foreground rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold p-4 border-b">Files</h2>
        <div className="p-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            multiple
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="w-full" asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </span>
            </Button>
          </label>
        </div>
        <ScrollArea className="h-[400px]">
          <ul className="p-4 space-y-2">
            {files.map((file) => (
              <li key={file.id} className="flex items-center space-x-3 hover:bg-accent rounded-md p-2 transition-colors">
                <File className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-sm font-medium truncate">{file.name}</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{file.name}</p>
                    </TooltipContent>
                  </Tooltip>
                  <p className="text-xs text-muted-foreground">
                    {file.size} • {file.uploadDate}
                  </p>
                  {file.status === "uploading" && (
                    <Progress value={file.progress} className="w-full h-1 mt-1" />
                  )}
                </div>
                {file.status === "uploading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-xs text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
                      onClick={() => console.log(`Download ${file.name}`)}
                      aria-label={`Download ${file.name}`}
                    >
                      Download
                    </button>
                    <button
                      className="text-xs text-destructive hover:underline focus:outline-none focus:ring-2 focus:ring-destructive rounded"
                      onClick={() => removeFile(file.id)}
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </TooltipProvider>
  )
}