import Image from "next/image";
import type { SiteImage } from "@/lib/site-images";

/** Editorial cover under page titles (learn / about / english). */
export default function EditorialCover({
  image,
  priority = false,
  className = "",
}: {
  image: SiteImage;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`gw-cover ${className}`.trim()}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 768px"
        className="gw-cover__img"
      />
    </figure>
  );
}

/** Compact thumb for learn hub list. */
export function LearnThumb({ image }: { image: SiteImage }) {
  return (
    <div className="gw-learn-thumb" aria-hidden>
      <Image
        src={image.src}
        alt=""
        fill
        sizes="112px"
        className="gw-learn-thumb__img"
      />
    </div>
  );
}
