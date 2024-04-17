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
import {
  useSetQuotationRequest,
  type QuotationRequest,
} from "~lib/supabase/useSetQuotationRequest"
import { ErrorAlert } from "~sidepanel/ErrorAlert"

interface Props {
  close: () => void
  quotationRequest: QuotationRequest
}

const FormSchema = z.object({
  email: z.string().email(),
})

export function QuotationForm(props: Props) {
  const { quotationRequest, close } = props

  const { toast } = useToast()

  const onSuccess = () => {
    close()

    toast({
      title: "Sent!",
      description: "We'll get back to you shortly.",
      duration: 3000,
    })
  }

  const createQuotationRequest = useSetQuotationRequest(onSuccess)
  const { mutate, isPending, isError, error } = createQuotationRequest

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit({ email }: z.infer<typeof FormSchema>) {
    mutate({
      ...quotationRequest,
      email,
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
                  disabled={isPending}
                />
              </FormControl>
              {/* <FormDescription>...</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {isError && <ErrorAlert error={error} />}

        <Button type="submit" isLoading={isPending}>
          Email me a quotation
        </Button>
      </form>
    </Form>
  )
}
