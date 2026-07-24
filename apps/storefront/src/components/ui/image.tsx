import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useState } from "react";

export interface ImageProps extends Omit<NextImageProps, 'alt'> {
  alt: string; // Enforce alt tags for accessibility
  fallbackSrc?: string;
  containerClassName?: string;
}

export function Image({ 
  className, 
  alt, 
  fallbackSrc,
  containerClassName,
  src,
  ...props 
}: ImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // If width/height are not provided and layout isn't fill, Next.js requires them.
  // We'll pass through props to NextImage.
  
  return (
    <NextImage
      className={`transition-opacity duration-300 ${!loaded ? 'opacity-0' : 'opacity-100'} ${className || ''}`}
      alt={alt}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setError(true);
        setLoaded(true);
      }}
      src={error && fallbackSrc ? fallbackSrc : src}
      {...props}
    />
  );
}
