import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const filename = url.searchParams.get("filename");

    if (!filename) {
      return new Response(
        JSON.stringify({ error: "Filename parameter is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const siteUrl = Deno.env.get("SITE_URL") || "https://hnstudyabroad.com";
    const fileUrl = `${siteUrl}/${filename}`;

    const fileResponse = await fetch(fileUrl);

    if (!fileResponse.ok) {
      return new Response(
        JSON.stringify({ error: "File not found" }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const fileData = await fileResponse.arrayBuffer();
    const displayFilename = filename.split('/').pop() || 'brochure.pdf';

    return new Response(fileData, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${displayFilename}"`,
        "Content-Length": fileData.byteLength.toString(),
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
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
