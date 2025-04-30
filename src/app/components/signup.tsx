import React, { useState } from "react";
import { submitToGoogleForm } from "../utils/submitToGoogleForm";
import "./homepage.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail && !validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const success = await submitToGoogleForm(email);
      if (success) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
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
        <h1 className="signup-heading">Join the Waitlist</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
            className={emailError ? "error" : ""}
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <button type="submit" disabled={isSubmitting || !!emailError}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
        {submitStatus === "success" && (
          <p className="success-message">Thank you for joining the waitlist!</p>
        )}
        {submitStatus === "error" && (
          <p className="error-message">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
