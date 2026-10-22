import { Fragment } from "react";

// Renders copy where *starred* words switch to the serif "art" voice —
// the brand rule that every headline crosses two typefaces.
export default function Crossed({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}
