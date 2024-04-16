const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const handler = async (request: Request): Promise<Response> => {
  try {
    const req = await request.json();
    console.log(`req, ${JSON.stringify(req)}`);

    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not set');

    if (!req?.record?.id) throw new Error('Record not found');

    const { record } = req;
    const html = `
    <strong>Please send me a quotation for this ...</strong>
    Email: ${record.email}
    URL: ${record.url}
    Image url: ${record.image_url}
    Heading: ${record.heading}
    Year: ${record.year}
    Capacity: ${record.capacity}
    Model: ${record.model}
    Price: ${record.price}
    Tax: ${record.tax}
    Ugx rate: ${record.ugx_rate}
    Requested at: ${record.created_at}
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'MoQuote <onboarding@resend.dev>',
        to: 'brucemakallan@gmail.com',
        subject: 'A MoQuote user has requested a quotation',
        html,
      }),
    });

    const data = await res.json();
    console.log(`response, ${JSON.stringify(data)}`);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Error processing request: ${error.message}`);

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

Deno.serve(handler);
