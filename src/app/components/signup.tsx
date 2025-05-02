import React, { useState } from "react";
import "./homepage.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail && !validateEmail(newEmail)) {
      setErrorMessage("Please enter a valid email address");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Call our server-side API endpoint
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      console.log("response", response);

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setSubmitStatus("success");
      // Optional: Clear the form after successful submission
      setEmail("");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-container">
      <header>
        <div className="bookmark-icon">
          <svg
            width="64"
            height="144"
            viewBox="0 0 20 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0V48L10 39L20 48V0H0Z" fill="currentColor" />
          </svg>
        </div>
        <div className="page-number">02</div>
      </header>
      <div className="signup-container">
        <h1 className="signup-heading">join the waitlist</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="enter your email"
            required
            className={errorMessage ? "error" : ""}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" disabled={isSubmitting || !!errorMessage}>
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </form>
        {submitStatus === "success" && (
          <p className="success-message">thank you for joining the waitlist!</p>
        )}
        {submitStatus === "error" && !errorMessage && (
          <p className="error-message">
            something went wrong. please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
