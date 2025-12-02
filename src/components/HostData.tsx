"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast, toast } from "@/hooks/use-toast"
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
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
  bio: z
    .string()
    .min(0, {
      message: "Bio must be at least 10 characters.",
    })
})

export default function TextareaForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] md:w-2/3">
        <div className="w-full mb-2 flex items-center justify-between">
            <FormLabel><h1 className="text-lg">Enter the Data to be hosted</h1></FormLabel>
            <Button type="submit">Submit</Button>
        </div>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  className="resize-none h-[70vh]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                  The data here will be available for 24 hours.
              </FormDescription>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
