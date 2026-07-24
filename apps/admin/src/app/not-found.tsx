import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-4">Could not find requested resource</p>
      <Link href="/" className="text-primary hover:underline">
        Return Home
      </Link>
    </div>
  );
}
