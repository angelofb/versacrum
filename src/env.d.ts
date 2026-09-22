/// <reference types="astro/client" />

interface Window {
  dataLayer?: IArguments[];
  gtag?: (...args: unknown[]) => void;
  preparedEmail?: unknown;
  [key: `ga-disable-${string}`]: boolean | undefined;
}
