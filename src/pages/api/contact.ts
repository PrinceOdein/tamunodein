import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return new Response("Missing fields", { status: 400 });
  }

  // For now, just log it
  console.log({ name, email, message });

  return new Response(null, {
    status: 302,
    headers: { Location: "/" },
  });
};
