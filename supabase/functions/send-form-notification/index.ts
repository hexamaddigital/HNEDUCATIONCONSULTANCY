import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const WHATSAPP_NUMBERS = ["919860667552", "917709476192"];

interface FormSubmission {
  type: "contact" | "brochure" | "application";
  data: Record<string, string>;
}

function generateWhatsAppMessage(submission: FormSubmission): string {
  const { type, data } = submission;

  switch (type) {
    case "contact":
      return `🎓 *New Contact Form Submission*\n\n` +
        `*Name:* ${data.fullName}\n` +
        `*Email:* ${data.email}\n` +
        `*Phone:* ${data.phoneNumber}\n` +
        `*Preferred Country:* ${data.preferredCountry || "Not specified"}\n` +
        `*Message:* ${data.message}\n\n` +
        `_From HN Study Abroad Website_`;

    case "brochure":
      return `📥 *Brochure Download Request*\n\n` +
        `*Name:* ${data.name}\n` +
        `*Email:* ${data.email}\n` +
        `*Phone:* ${data.phone}\n` +
        `*Country:* ${data.country}\n\n` +
        `_From HN Study Abroad Website_`;

    case "application":
      return `📝 *New University Application*\n\n` +
        `*Student:* ${data.studentName}\n` +
        `*Email:* ${data.email}\n` +
        `*Country:* ${data.country}\n` +
        `*University:* ${data.university}\n` +
        `*Course:* ${data.course}\n` +
        `*Intake:* ${data.intake}\n\n` +
        `_From HN Study Abroad Website_`;

    default:
      return "New form submission received";
  }
}

function generateWhatsAppUrls(message: string): string[] {
  const encodedMessage = encodeURIComponent(message);

  return WHATSAPP_NUMBERS.map((number) => {
    return `https://wa.me/${number}?text=${encodedMessage}`;
  });
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const submission: FormSubmission = await req.json();

    const whatsappMessage = generateWhatsAppMessage(submission);

    const whatsappUrls = generateWhatsAppUrls(whatsappMessage);

    console.log(`Form submission received: ${submission.type}`);
    console.log(`WhatsApp notification URLs prepared for both numbers`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Form submission logged and WhatsApp URLs generated",
        whatsappUrls: whatsappUrls
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error processing form submission:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process form submission" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
