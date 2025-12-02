"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import dynamic from "next/dynamic"
import { PlusCircle, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

// Dynamic import to avoid SSR issues with Leaflet
const MapDrawer = dynamic(() => import("@/components/MapDrawer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-muted">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
})

const dependentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  aadharNumber: z.string().regex(/^\d{12}$/, { message: "Aadhar number must be exactly 12 digits." }),
})

const resourceRequestSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  aadharNumber: z.string().regex(/^\d{12}$/, {
    message: "Aadhar number must be exactly 12 digits.",
  }),
  resourceType: z.enum(["water", "agricultural_land", "forest"], {
    required_error: "Please select a resource type.",
  }),
  resourceDescription: z.string().min(5, {
    message: "Resource description must be at least 5 characters.",
  }),
  numberOfDependents: z.coerce.number().min(0, {
    message: "Number of dependents must be 0 or more.",
  }),
  dependents: z.array(dependentSchema).optional(),
  geoJsonData: z.string().min(1, {
    message: "Please draw a polygon on the map to define the area.",
  }),
}).refine((data) => {
  if (data.numberOfDependents > 0) {
    return data.dependents && data.dependents.length === data.numberOfDependents
  }
  return true
}, {
  message: "Number of dependents does not match the provided dependent information.",
  path: ["dependents"],
})

export default function ResourceRequestPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [geoJsonPreview, setGeoJsonPreview] = useState<string>("")

  const form = useForm<z.infer<typeof resourceRequestSchema>>({
    resolver: zodResolver(resourceRequestSchema),
    defaultValues: {
      name: "",
      aadharNumber: "",
      resourceType: undefined,
      resourceDescription: "",
      numberOfDependents: 0,
      dependents: [],
      geoJsonData: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dependents",
  })

  const numberOfDependents = form.watch("numberOfDependents")

  // Auto-adjust dependents array when numberOfDependents changes
  const handleDependentsChange = (value: number) => {
    const currentLength = fields.length
    if (value > currentLength) {
      // Add new dependent fields
      for (let i = currentLength; i < value; i++) {
        append({ name: "", aadharNumber: "" })
      }
    } else if (value < currentLength) {
      // Remove excess dependent fields
      for (let i = currentLength - 1; i >= value; i--) {
        remove(i)
      }
    }
  }

  const handlePolygonDrawn = (geoJson: any) => {
    const geoJsonString = JSON.stringify(geoJson, null, 2)
    form.setValue("geoJsonData", geoJsonString, { shouldValidate: true })
    setGeoJsonPreview(geoJsonString)
    
    // Extract and format coordinates for display
    if (geoJson.features && geoJson.features.length > 0) {
      let formattedPoints = ""
      geoJson.features.forEach((feature: any, index: number) => {
        const coords = feature.geometry.coordinates
        const type = feature.geometry.type
        
        formattedPoints += `Shape ${index + 1} (${type}):\n`
        
        if (type === "Polygon") {
          // Remove the last point as it's a duplicate of the first (closing point)
          const points = coords[0].slice(0, -1)
          points.forEach((point: number[], pointIndex: number) => {
            formattedPoints += `  Point ${pointIndex + 1}: [${point[0].toFixed(6)}, ${point[1].toFixed(6)}]\n`
          })
          formattedPoints += `  (Polygon automatically closes to Point 1)\n`
        }
        formattedPoints += "\n"
      })
      
      form.setValue("geoJsonData", formattedPoints.trim(), { shouldValidate: true })
    }
  }

  function onSubmit(values: z.infer<typeof resourceRequestSchema>) {
    // Show confirmation dialog
    if (!confirm("Are you sure you want to submit this resource request? Please verify all information is correct.")) {
      return
    }

    console.log(values)

    // Show success toast
    toast({
      title: "Resource Request Submitted Successfully",
      description: "Your request has been received. The authorities will review your application and reach out to you with further details soon.",
      duration: 5000,
    })

    // Reset form fields
    form.setValue("name", "")
    form.setValue("aadharNumber", "")
    form.setValue("resourceType", undefined as any)
    form.setValue("resourceDescription", "")
    form.setValue("numberOfDependents", 0)
    form.setValue("dependents", [])

    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col overflow-y-auto border-r bg-background lg:w-1/2">
        <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="p-6">
            <h1 className="text-3xl font-bold tracking-tight">Resource Request</h1>
            <p className="text-muted-foreground">
              Submit a request for resources by filling out the form and marking the area on the map
            </p>
          </div>
        </div>

        <div className="flex-1 p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aadharNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhar Card Number *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter 12-digit Aadhar number" 
                        maxLength={12}
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your 12-digit Aadhar card number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resourceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resource Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select resource type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="agricultural_land">Agricultural Land</SelectItem>
                        <SelectItem value="forest">Forest</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the type of resource you are requesting
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resourceDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resource Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the resource you need and its intended use"
                        className="min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide details about the resource and its intended use
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfDependents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Dependents</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        placeholder="0" 
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0
                          field.onChange(value)
                          handleDependentsChange(value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the number of dependents (0 if none)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {numberOfDependents > 0 && (
                <div className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Dependent Information</h3>
                    <span className="text-sm text-muted-foreground">
                      {fields.length} of {numberOfDependents}
                    </span>
                  </div>
                  
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-4 rounded-lg border bg-muted/50 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Dependent {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            remove(index)
                            form.setValue("numberOfDependents", numberOfDependents - 1)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`dependents.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter dependent's name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`dependents.${index}.aadharNumber`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Aadhar Number *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter 12-digit Aadhar number"
                                maxLength={12}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              )}

              <FormField
                control={form.control}
                name="geoJsonData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area Definition (Coordinates)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Draw on the map to generate coordinate points..."
                        className="min-h-[200px] resize-none font-mono text-sm"
                        readOnly
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Each point represents a vertex of your drawn polygon or rectangle. Coordinates are in [longitude, latitude] format.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Submit Request
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (confirm("This will clear all form data and map annotations. Continue?")) {
                      form.reset()
                      setGeoJsonPreview("")
                      window.location.reload() // Reload to clear map
                    }
                  }}
                >
                  Clear All
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right Side - Map */}
      <div className="relative flex w-full flex-col bg-muted lg:w-1/2">
        <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="p-6">
            <h2 className="text-xl font-semibold">Mark Area on Map</h2>
            <p className="text-sm text-muted-foreground">
              Use the drawing tools to mark the geographical area for your resource request
            </p>
          </div>
        </div>
        <div className="flex-1">
          <MapDrawer onPolygonDrawn={handlePolygonDrawn} />
        </div>
      </div>
    </div>
  )
}
