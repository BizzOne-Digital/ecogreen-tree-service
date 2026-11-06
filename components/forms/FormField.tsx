export default function FormField({ label, required, children, className = "" }: { label: string; required?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-forest-950">
        {label}{required && <span className="text-red-700" aria-hidden="true"> *</span>}
      </span>
      {children}
    </label>
  );
}

/** Hidden from people; bots that fill every input get ignored by the API. */
export function Honeypot() {
  return (
    <div className="absolute -left-[9999px]" aria-hidden="true">
      <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}
