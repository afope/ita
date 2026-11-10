"use client";

import React, { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  // Each form on a page needs its own id.
  id?: string;
  label?: string;
  button?: string;
  success?: string;
};

export default function Waitlist({
  id = "email",
  label = "email address",
  button = "join the list",
  success = "almost there. check your inbox and tap confirm.",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setErrorMessage("please enter a valid email address");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message.toLowerCase() : "failed to submit"
      );
    }
  };

  if (status === "success") {
    return (
      <p className="form-success" role="status">
        <span className="mono">[ok]</span> {success}
      </p>
    );
  }

  return (
    <form className="waitlist" onSubmit={handleSubmit} noValidate>
      <label htmlFor={id} className="mono form-label">
        {label}
      </label>
      <div className="waitlist-row">
        <input
          type="email"
          id={id}
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
          placeholder="you@somewhere.com"
          autoComplete="email"
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? `${id}-error` : undefined}
          required
        />
        <button
          type="submit"
          className="button button-signal"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "sending…" : button}
        </button>
      </div>
      {errorMessage && (
        <p id={`${id}-error`} className="form-error" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
