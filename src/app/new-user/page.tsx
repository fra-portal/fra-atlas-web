"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"

import { useToast, toast } from "@/hooks/use-toast"

import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
    username: z.string().min(6, {
      message: "Username must be at least 6 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
})

export default function UserDataForm() {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log(data);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }

    interface FormFields {
        name: string;
        label: string;
        placeholder: string;
        description: string;
    };

    const formFields:FormFields[] = [
            { name:"Username", label: "Username", placeholder: "Username", description:"" },
            { name:"Password", label: "Password", placeholder: "Password", description:"" }
    ];

  return (
    <>
        <Navbar />
        <div className="m-4 w-fill-available flex justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-[300px] w-1/5 bg-slate-400 text-primary-foreground shadow p-5 rounded-md [&>*]:my-2">

              {formFields.map((formfield: FormFields, index: number): any => (
                <FormField
                  key={index}
                  control={form.control}
                  name={formfield.name.toLowerCase() as "username" | "password"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formfield.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={formfield.placeholder}
                          {...field}
                        />
                      </FormControl>
                      {formfield.description && <FormDescription>
                        {formfield.description}
                      </FormDescription>}

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
                <Button variant="secondary" className="w-full" type="submit" >Submit</Button>
              </form>
            </Form>

            
        </div>
    </>
  )
}