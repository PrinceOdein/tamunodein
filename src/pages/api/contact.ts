import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const company = formData.get("company");

  // Honeypot check
  if (company) {
    return new Response(null, { status: 204 });
  }

  if (!name || !email || !message) {
    return new Response("Missing fields", { status: 400 });
  }

  await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: [import.meta.env.CONTACT_EMAIL],
    replyTo: email.toString(),
    subject: `New message from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  const url = new URL("/?sent=true", request.url);
  return Response.redirect(url.toString(), 303);

};
