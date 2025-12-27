import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

interface LogoProps {
  src?: string | StaticImageData;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  href?: string;
}

import siteLogo from "@/assets/images/logo.png";
import Link from "next/link";

const Logo = ({
  src,
  alt = "Site Logo",
  width = 50,
  height = 50,
  className,
  priority = false,
  href = "/",
}: LogoProps) => {
  return (
    <Link href={href}>
      <Image
        src={src || siteLogo}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={clsx("object-contain cursor-pointer", className)}
      />
    </Link>
  );
};

export default Logo;
