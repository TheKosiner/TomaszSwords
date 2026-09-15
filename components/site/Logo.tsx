import Image from "next/image";
import logo from "@/assets/logo.webp";

/**
 * Znak firmowy: miecz z monogramem „TS".
 * Import statyczny, a nie ścieżka tekstowa — tylko wtedy Next dokłada
 * basePath, którego wymaga hosting w podkatalogu (GitHub Pages).
 */
export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logo}
      alt="Tomasz Swords"
      className={className}
      priority={priority}
      sizes="(max-width: 1024px) 80px, 200px"
    />
  );
}

export default Logo;
