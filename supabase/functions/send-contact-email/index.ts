import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredCountry: string;
  message: string;
  jobTitle?: string;
  sourcePage?: string;
}

function formatDate(): string {
  return new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

function buildHtmlEmail(data: ContactPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>New Inquiry – HN Study Abroad</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f6;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#00BCD4,#00838F);padding:36px 40px;">
              <p style="margin:0;color:rgba(255,255,255,0.8);font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">HN STUDY ABROAD</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:26px;font-weight:700;line-height:1.2;">New Website Inquiry</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">Submitted on ${formatDate()}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <table width="100%" cellpadding="0" cellspacing="0">

                ${data.jobTitle ? `
                <tr>
                  <td style="padding:0 0 20px;">
                    <div style="background:#fff3e0;border-left:4px solid #ff9800;padding:12px 16px;border-radius:0 8px 8px 0;">
                      <p style="margin:0;font-size:12px;font-weight:700;color:#e65100;text-transform:uppercase;letter-spacing:1px;">Job Application</p>
                      <p style="margin:4px 0 0;color:#bf360c;font-size:15px;font-weight:600;">${data.jobTitle}</p>
                    </div>
                  </td>
                </tr>` : ''}

                <tr><td style="padding:0 0 8px;">
                  <p style="margin:0;font-size:12px;font-weight:700;color:#00BCD4;text-transform:uppercase;letter-spacing:1px;">Full Name</p>
                  <p style="margin:4px 0 16px;font-size:16px;color:#004D5C;font-weight:600;">${data.fullName}</p>
                </td></tr>

                <tr><td style="padding:0 0 8px;">
                  <p style="margin:0;font-size:12px;font-weight:700;color:#00BCD4;text-transform:uppercase;letter-spacing:1px;">Email Address</p>
                  <p style="margin:4px 0 16px;font-size:15px;color:#37474F;">
                    <a href="mailto:${data.email}" style="color:#00838F;text-decoration:none;">${data.email}</a>
                  </p>
                </td></tr>

                <tr><td style="padding:0 0 8px;">
                  <p style="margin:0;font-size:12px;font-weight:700;color:#00BCD4;text-transform:uppercase;letter-spacing:1px;">Phone Number</p>
                  <p style="margin:4px 0 16px;font-size:15px;color:#37474F;">
                    <a href="tel:${data.phoneNumber}" style="color:#00838F;text-decoration:none;">${data.phoneNumber}</a>
                  </p>
                </td></tr>

                <tr><td style="padding:0 0 8px;">
                  <p style="margin:0;font-size:12px;font-weight:700;color:#00BCD4;text-transform:uppercase;letter-spacing:1px;">Preferred Country</p>
                  <p style="margin:4px 0 16px;font-size:15px;color:#37474F;">${data.preferredCountry || "Not specified"}</p>
                </td></tr>

                <tr><td style="padding:0 0 8px;">
                  <p style="margin:0;font-size:12px;font-weight:700;color:#00BCD4;text-transform:uppercase;letter-spacing:1px;">Message</p>
                  <div style="margin:8px 0 0;background:#f4f7f6;border-radius:10px;padding:16px 20px;">
                    <p style="margin:0;font-size:15px;color:#37474F;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
                  </div>
                </td></tr>

              </table>
            </td>
          </tr>

          <!-- Quick reply buttons -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="mailto:${data.email}?subject=Re: Your Study Abroad Inquiry – HN Study Abroad" style="display:inline-block;background:#00BCD4;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">Reply via Email</a>
                  </td>
                  <td>
                    <a href="https://wa.me/${data.phoneNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(data.fullName)}%2C%20thank%20you%20for%20contacting%20HN%20Study%20Abroad!" style="display:inline-block;background:#25D366;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">Reply via WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f4f7f6;padding:24px 40px;border-top:1px solid #e0e0e0;">
              <p style="margin:0;font-size:12px;color:#90A4AE;text-align:center;">This email was sent automatically from the HN Study Abroad website contact form.<br>Source: ${data.sourcePage || "contact"}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildTextEmail(data: ContactPayload): string {
  return `New Website Inquiry – HN Study Abroad

Submitted On: ${formatDate()}
${data.jobTitle ? `Job Application: ${data.jobTitle}\n` : ""}
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phoneNumber}
Preferred Country: ${data.preferredCountry || "Not specified"}

Message:
${data.message}

---
Sent from HN Study Abroad Website (${data.sourcePage || "contact"})`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const data: ContactPayload = await req.json();

    console.log(`[send-contact-email] Received inquiry from: ${data.fullName} <${data.email}>`);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      console.warn("[send-contact-email] RESEND_API_KEY not set — email delivery skipped, data was saved to DB");
      return new Response(
        JSON.stringify({ success: false, reason: "no_api_key", message: "Email API key not configured. Inquiry saved to database." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailPayload = {
      from: "HN Study Abroad Website <onboarding@resend.dev>",
      to: ["info@hnstudyabroadpvtltd.com"],
      reply_to: data.email,
      subject: `New Inquiry from Website – ${data.fullName} | HN Study Abroad`,
      html: buildHtmlEmail(data),
      text: buildTextEmail(data),
    };

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("[send-contact-email] Resend API error:", JSON.stringify(resendResult));
      return new Response(
        JSON.stringify({ success: false, reason: "resend_error", details: resendResult }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[send-contact-email] Email sent successfully. Resend ID: ${resendResult.id}`);

    return new Response(
      JSON.stringify({ success: true, emailId: resendResult.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[send-contact-email] Unexpected error:", err);
    return new Response(
      JSON.stringify({ success: false, reason: "exception", message: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
