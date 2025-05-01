// You can use these ones from Cloudflare CDN:

export const submitToGoogleForm = async (email: string) => {
  const formId = process.env.NEXT_PUBLIC_GOOGLE_FORM_ID;
  const entryId = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_ID;

  if (!formId || !entryId) {
    console.error("Missing Google Form configuration");
    return false;
  }

  // Use the direct form submission URL
  const formUrl = `https://docs.google.com/forms/d/${formId}/formResponse`;

  try {
    const formData = new URLSearchParams();
    formData.append(entryId, email);
    formData.append("submit", "Submit");

    await fetch(formUrl, {
      method: "POST",
      body: formData,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
      },
    });

    return true;
  } catch (error) {
    console.error("Error submitting to Google Form:", error);
    return false;
  }
};
