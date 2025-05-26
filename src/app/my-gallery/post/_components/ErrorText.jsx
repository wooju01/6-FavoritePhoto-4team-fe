import React from "react";

export default function ErrorText({ error }) {
  if (!error) return;

  if (typeof error === "string")
    return <p className="text-my-red text-300-14 lg:text-300-16">{error}</p>;

  if (typeof error === "object")
    return Object.values(error).map((text, i) => (
      <p key={i} className="text-my-red text-300-14 lg:text-300-16">
        {text}
      </p>
    ));

  return null;
}
