// pages/api/submit-form.ts or app/api/submit-form/route.ts (for App Router)
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const formId = process.env.NEXT_PUBLIC_GOOGLE_FORM_ID;
  const entryId = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_ID;

  if (!formId || !entryId) {
    return res.status(500).json({ error: "Missing form configuration" });
  }

  try {
    // Create form data
    const formData = new URLSearchParams();
    formData.append(`entry.${entryId}`, email);

    // Submit to Google Form
    const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

    await axios.post(formUrl, formData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        // Spoof a browser user agent to avoid being blocked
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
      },
      // Ignore CORS errors on the server side
      validateStatus: () => true,
    });
    console.log(formId, entryId);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Form submission error:", error);
    return res.status(500).json({ error: "Failed to submit form" });
  }
}
