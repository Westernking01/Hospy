"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-muted-foreground mb-8">A critical error occurred in the application.</p>
          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
