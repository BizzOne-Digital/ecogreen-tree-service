import { Mail, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/ui/icons";
import { telHref } from "@/lib/format";

export default function TopBar({ phone, email, facebookUrl }: { phone: string; email: string; facebookUrl: string }) {
  return (
    <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-leaf text-sm text-white">
      <div className="container-site flex min-h-10 items-center justify-between gap-4 py-1.5">
        <div className="flex items-center gap-6">
          <a href={telHref(phone)} className="flex items-center gap-2 font-semibold hover:text-lime">
            <Phone className="h-4 w-4" aria-hidden="true" />{phone}
          </a>
          <a href={`mailto:${email}`} className="hidden items-center gap-2 hover:text-lime sm:flex">
            <Mail className="h-4 w-4" aria-hidden="true" />{email}
          </a>
        </div>
        <a href={facebookUrl || "/contact"} {...(facebookUrl && { target: "_blank", rel: "noopener noreferrer" })} className="flex items-center gap-2 hover:text-lime">
          <FacebookIcon className="h-4 w-4" /><span className="hidden sm:inline">Follow Us on Facebook</span><span className="sr-only sm:hidden">Facebook</span>
        </a>
      </div>
    </div>
  );
}
