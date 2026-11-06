import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-forest-900 px-4 text-center text-white">
      <div>
        <p className="font-display text-6xl font-black italic text-lime">404</p>
        <h1 className="mt-3 text-2xl font-extrabold">This page could not be found</h1>
        <Link href="/" className="btn btn-lime mt-6">Back to Home</Link>
      </div>
    </main>
  );
}
