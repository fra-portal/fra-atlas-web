"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { File } from "lucide-react"

type FileItem = {
  id: string
  name: string
  size: string
  uploadDate: string
}

const mockFiles: FileItem[] = [
  { id: "1", name: "document.pdf", size: "2.5 MB", uploadDate: "2023-05-15" },
  { id: "2", name: "image.jpg", size: "1.8 MB", uploadDate: "2023-05-14" },
  { id: "3", name: "spreadsheet.xlsx", size: "3.2 MB", uploadDate: "2023-05-13" },
  { id: "4", name: "presentation.pptx", size: "5.7 MB", uploadDate: "2023-05-12" },
  { id: "5", name: "report.docx", size: "1.1 MB", uploadDate: "2023-05-11" },
]

export default function Component() {
  return (
    <div className="w-64 h-fit bg-card text-card-foreground rounded-lg shadow-lg dark:shadow-custom-color">
      <h2 className="text-lg font-semibold p-4 border-b">Uploaded Files</h2>
      <ScrollArea className="min-h-[50px]">
        <ul className="p-4 space-y-2 flex flex-col">
          {mockFiles.map((file) => (
            <li key={file.id} className="flex items-center space-x-3 hover:bg-accent rounded-md p-2 transition-colors">
              <File className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.size} • {file.uploadDate}
                </p>
              </div>
              <button
                className="text-xs text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
                onClick={() => console.log(`Download ${file.name}`)}
                aria-label={`Download ${file.name}`}
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}