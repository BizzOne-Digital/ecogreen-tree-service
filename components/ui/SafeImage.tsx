"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { PLACEHOLDER_IMAGE, resolveImage } from "@/lib/image";

type Props = Omit<ImageProps, "src"> & { src?: string | null; fallback?: string };

/** next/image that never breaks the page: bad URLs and failed loads show a placeholder. */
export default function SafeImage({ src, fallback = PLACEHOLDER_IMAGE, alt, ...props }: Props) {
  const resolved = resolveImage(src, fallback);
  const [failed, setFailed] = useState<string | null>(null);
  return (
    <Image {...props} alt={alt} src={failed === resolved ? fallback : resolved} onError={() => setFailed(resolved)} />
  );
}
