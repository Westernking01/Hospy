"use client";

import { useEffect } from "react";
import { logger } from "@hopsy/utils";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Global Error Caught", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{ padding: "4rem", textAlign: "center", fontFamily: "sans-serif" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Something went wrong!
          </h2>
          <p style={{ color: "gray", marginBottom: "2rem" }}>
            We've been notified and are looking into the issue.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.5rem 1rem",
              background: "#ea580c",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
