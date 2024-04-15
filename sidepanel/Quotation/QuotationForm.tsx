import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~components/ui/form"
import { Input } from "~components/ui/input"
import { useToast } from "~components/ui/use-toast"

const FormSchema = z.object({
  email: z.string().email(),
})

export function QuotationForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit({ email }: z.infer<typeof FormSchema>) {
    console.log({ email })
    // TODO: Send email
    toast({
      title: "Sent!",
      description: "We'll get back to you shortly.",
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>...</FormLabel> */}
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </FormControl>
              {/* <FormDescription>...</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Email me a quotation</Button>
      </form>
    </Form>
  )
}
