import NextImage, { type ImageProps } from "next/image";

/**
 * Site-wide Next/Image wrapper.
 * Default quality is higher than Next's 75 so UI screenshots and photography stay sharp.
 */
export function SiteImage({ quality = 95, ...props }: ImageProps) {
  return <NextImage quality={quality} {...props} />;
}
