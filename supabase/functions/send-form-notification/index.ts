import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface FormSubmission {
  type: "contact" | "brochure" | "application";
  data: Record<string, string>;
}

function generateEmailHTML(submission: FormSubmission): string {
  const { type, data } = submission;

  let subject = "";
  let content = "";

  switch (type) {
    case "contact":
      subject = `New Contact Form Submission from ${data.fullName}`;
      content = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phoneNumber}</p>
        <p><strong>Preferred Country:</strong> ${data.preferredCountry || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `;
      break;

    case "brochure":
      subject = `Brochure Download Request from ${data.name}`;
      content = `
        <h2>New Brochure Download Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Country:</strong> ${data.country}</p>
      `;
      break;

    case "application":
      subject = `New University Application from ${data.studentName}`;
      content = `
        <h2>New University Application</h2>
        <p><strong>Student Name:</strong> ${data.studentName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Country:</strong> ${data.country}</p>
        <p><strong>University:</strong> ${data.university}</p>
        <p><strong>Course:</strong> ${data.course}</p>
        <p><strong>Intake:</strong> ${data.intake}</p>
      `;
      break;
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          h2 { color: #2D3748; border-bottom: 2px solid #00CFC8; padding-bottom: 10px; }
          p { margin: 10px 0; }
          strong { color: #2D3748; }
        </style>
      </head>
      <body>
        ${content}
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #E2E8F0;">
        <p style="color: #718096; font-size: 12px;">
          This email was automatically generated from the HN Study Abroad website form submission.
        </p>
      </body>
    </html>
  `;
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

    const emailHTML = generateEmailHTML(submission);
    const subject = submission.type === "contact"
      ? `New Contact Form Submission from ${submission.data.fullName}`
      : submission.type === "brochure"
      ? `Brochure Download Request from ${submission.data.name}`
      : `New University Application from ${submission.data.studentName}`;

    console.log(`Form submission received: ${submission.type}`);
    console.log(`Subject: ${subject}`);
    console.log(`Recipient: info@hnstudyabroad.com`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Form submission logged successfully",
        note: "Email integration ready - configure SMTP or email service as needed"
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
