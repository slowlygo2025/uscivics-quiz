import type { ReactNode } from "react";
import Image from "next/image";
import type { SiteImage } from "@/lib/site-images";

/** Full-bleed marketing hero with brand-blue overlay (home). */
export default function HeroWithPhoto({
  image,
  children,
  priority = false,
}: {
  image: SiteImage;
  children: ReactNode;
  priority?: boolean;
}) {
  return (
    <section className="gw-hero gw-hero--photo -mx-4 border border-line sm:-mx-6">
      <Image
        src={image.src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="gw-hero__photo"
        aria-hidden
      />
      <div className="gw-hero__glow gw-hero__glow--photo" aria-hidden />
      <div className="gw-hero__stripes" aria-hidden />
      <div className="gw-hero__sheen" aria-hidden />
      <div className="gw-hero__inner">{children}</div>
      <span className="sr-only">{image.alt}</span>
    </section>
  );
}
