const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const handler = async (request: Request): Promise<Response> => {
  try {
    const req = await request.json();
    console.log(`req, ${JSON.stringify(req)}`);

    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not set');

    if (!req?.record?.id) throw new Error('Record not found');

    const { record } = req;
    const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px">
      <p style="margin-bottom: 10px; text-align: center">
        Please send ${record.email} a quotation for this vehicle and include a
        breakdown of all costs:
      </p>

      <div
        style="
          margin: 30px auto;
          color: #333;
          max-width: 500px;
          border-radius: 16px;
          background: rgb(2, 0, 36);
          background: linear-gradient(
            48deg,
            rgba(2, 0, 36, 1) 0%,
            rgba(244, 244, 249, 1) 0%,
            rgba(0, 212, 255, 1) 100%
          );
        "
      >
        <img
          style="
            width: 100%;
            height: 300px;
            border-radius: 16px;
            object-fit: cover;
          "
          src="${record.image_url}"
          alt="vehicle image"
        />
        <div style="padding: 24px">
          <h1 style="margin-bottom: 24px; margin-top: 0">${record.heading}</h1>
          <div style="margin-bottom: 10px">
            <strong>Year</strong>: ${record.year}
          </div>
          <div style="margin-bottom: 10px">
            <strong>Capacity</strong>: ${record.capacity}
          </div>
          <div style="margin-bottom: 10px">
            <strong>Model</strong>: ${record.model}
          </div>
          <div style="margin-bottom: 10px">
            <strong>Price</strong>: ${record.price}
          </div>
          <div style="margin-bottom: 10px">
            <strong>Tax</strong>: ${record.tax}
          </div>
          <div style="margin-bottom: 10px">
            <strong>UGX Rate</strong>: ${record.ugx_rate}
          </div>
          <div style="margin-bottom: 10px">
            <strong>Requested at</strong>: ${record.created_at}
          </div>
          <div>${record.url}</div>
        </div>
      </div>

      <div style="margin: 30px 0">
        <strong>Reply to</strong>: ${record.email}
      </div>

      <p>
        <i
          >This is an automated email sent from the MoQuote App. Do not reply to
          this email directly. Instead, use the "Reply to" email above.</i
        >
      </p>
    </div>
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
