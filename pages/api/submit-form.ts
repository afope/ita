import type { NextApiRequest, NextApiResponse } from "next";

// Sign-ups go to ita's Kit form ("ita website"), which adds them to the
// mailing list. The form ID is public (it appears in Kit's own embed code);
// set KIT_FORM_ID to use a different form. See README → "Mailing list".
const KIT_FORM_ID = process.env.KIT_FORM_ID || "10170531";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body ?? {};
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  try {
    const response = await fetch(
      `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email.trim() }),
      }
    );
    const data = await response.json().catch(() => ({}));

    if (!response.ok || data?.status === "failed") {
      console.error("Kit rejected sign-up:", response.status, data);
      return res.status(502).json({ error: "Failed to submit form" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Kit sign-up error:", error);
    return res.status(500).json({ error: "Failed to submit form" });
  }
}
