import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Waitlist sign-ups. Formspree emails each one to the inbox set on the
// Formspree form (hello@ita.ng); the Google Form is a fallback for when
// Formspree isn't configured yet. See README → "Waitlist".
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const formspreeId = process.env.FORMSPREE_FORM_ID;
  const googleFormId = process.env.NEXT_PUBLIC_GOOGLE_FORM_ID;
  const googleEntryId = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_ID;

  try {
    if (formspreeId) {
      const response = await axios.post(
        `https://formspree.io/f/${formspreeId}`,
        { email, _subject: "New ita waitlist sign-up" },
        {
          headers: { Accept: "application/json" },
          validateStatus: () => true,
        }
      );
      if (response.status >= 400) {
        console.error("Formspree rejected sign-up:", response.status, response.data);
        return res.status(502).json({ error: "Failed to submit form" });
      }
      return res.status(200).json({ success: true });
    }

    if (googleFormId && googleEntryId) {
      const formData = new URLSearchParams();
      formData.append(`entry.${googleEntryId}`, email);
      await axios.post(
        `https://docs.google.com/forms/d/e/${googleFormId}/formResponse`,
        formData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Google blocks requests that don't look like a browser.
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
          },
          // Google answers with an HTML page; any response means it arrived.
          validateStatus: () => true,
        }
      );
      return res.status(200).json({ success: true });
    }

    return res.status(500).json({ error: "Missing form configuration" });
  } catch (error) {
    console.error("Form submission error:", error);
    return res.status(500).json({ error: "Failed to submit form" });
  }
}
