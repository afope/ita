export const submitToGoogleForm = async (email: string) => {
  const formId = process.env.NEXT_PUBLIC_GOOGLE_FORM_ID;
  const entryId = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_ID;

  if (!formId || !entryId) {
    console.error("Missing Google Form configuration");
    return false;
  }

  const formUrl = `https://docs.google.com/forms/d/${formId}/formResponse`;

  try {
    const formData = new URLSearchParams();
    formData.append(entryId, email);
    formData.append("submit", "Submit");
    formData.append("fvv", "1");
    formData.append("partialResponse", "[]");
    formData.append("pageHistory", "0");
    formData.append("fbzx", "-1");

    await fetch(formUrl, {
      method: "POST",
      body: formData,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        Origin: window.location.origin,
      },
    });

    // Since we're using no-cors mode, we can't check response.ok
    // Instead, we'll assume success if no error was thrown
    return true;
  } catch (error) {
    console.error("Error submitting to Google Form:", error);
    return false;
  }
};
