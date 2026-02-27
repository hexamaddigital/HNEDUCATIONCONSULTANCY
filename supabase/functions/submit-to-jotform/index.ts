import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SubmissionData {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  message?: string;
  course?: string;
  formType?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const JOTFORM_API_KEY = Deno.env.get("JOTFORM_API_KEY");
    const JOTFORM_FORM_ID = Deno.env.get("JOTFORM_FORM_ID");

    if (!JOTFORM_API_KEY || !JOTFORM_FORM_ID) {
      throw new Error("JotForm API credentials not configured");
    }

    const data: SubmissionData = await req.json();

    const submissionData: Record<string, string> = {};

    if (data.name) submissionData['submission[1]'] = data.name;
    if (data.email) submissionData['submission[2]'] = data.email;
    if (data.phone) submissionData['submission[3]'] = data.phone;
    if (data.country) submissionData['submission[4]'] = data.country;
    if (data.message) submissionData['submission[5]'] = data.message;
    if (data.course) submissionData['submission[6]'] = data.course;
    if (data.formType) submissionData['submission[7]'] = data.formType;

    const formBody = new URLSearchParams(submissionData);

    const jotformResponse = await fetch(
      `https://api.jotform.com/form/${JOTFORM_FORM_ID}/submissions?apiKey=${JOTFORM_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      }
    );

    const responseData = await jotformResponse.json();

    if (!jotformResponse.ok) {
      console.error("JotForm API Error:", responseData);
      throw new Error(responseData.message || "Failed to submit to JotForm");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Form submitted successfully to JotForm",
        data: responseData,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error submitting to JotForm:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
