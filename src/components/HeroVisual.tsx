"use client";

import { useState } from "react";
import Image from "next/image";
import { RoomMotif } from "./RoomMotif";

/**
 * Client component so it can fall back gracefully if the photo hasn't been added yet:
 * next/image doesn't check the file exists at build time (only at request time), so without
 * this, a missing public/images/hero.jpg would just render as a broken image instead of the
 * original line-art illustration.
 */
export function HeroVisual({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md text-navy/80 lg:max-w-none">
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-sage/60">
        {!failed && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
            className="object-cover"
            priority
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {failed && <RoomMotif className="relative h-full w-full p-8" />}
    </div>
  );
}
