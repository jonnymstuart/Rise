import localFont from "next/font/local";

/**
 * PP Eiko — the single typeface for the whole site (per brand direction:
 * "Eiko from the get-go"). Regular weight is used for all type, from 140px
 * display headings down to captions.
 */
export const eiko = localFont({
  src: [
    {
      path: "../fonts/PPEiko-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-eiko",
  display: "swap",
  preload: true,
});
