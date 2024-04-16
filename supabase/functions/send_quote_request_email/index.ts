const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const handler = async (_request: Request): Promise<Response> => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'MoQuote <onboarding@resend.dev>',
      to: 'brucemakallan@gmail.com',
      subject: 'A MoQuote user has requested a quote',
      html: '<strong>Please send me a quotation for this ...</strong>',
    }),
  })

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

Deno.serve(handler)
