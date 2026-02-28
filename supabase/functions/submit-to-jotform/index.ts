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

    console.log('Environment check - API Key exists:', !!JOTFORM_API_KEY);
    console.log('Environment check - Form ID:', JOTFORM_FORM_ID);

    if (!JOTFORM_API_KEY || !JOTFORM_FORM_ID) {
      throw new Error("JotForm API credentials not configured");
    }

    const data: SubmissionData = await req.json();

    console.log('Received data:', data);
    console.log('Using Form ID:', JOTFORM_FORM_ID);

    // First, get the form fields to know the correct field IDs
    const formInfoResponse = await fetch(
      `https://api.jotform.com/form/${JOTFORM_FORM_ID}/questions?apiKey=${JOTFORM_API_KEY}`
    );

    const formInfo = await formInfoResponse.json();
    console.log('Form fields:', JSON.stringify(formInfo, null, 2));

    const submissionData: Record<string, string> = {};

    if (data.name) {
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      submissionData['q2_fullname0[first]'] = firstName;
      submissionData['q2_fullname0[last]'] = lastName;
    }
    if (data.email) submissionData['q3_email1'] = data.email;
    if (data.phone) submissionData['q4_phone2[full]'] = data.phone;

    console.log('Submitting to JotForm with data:', submissionData);

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
