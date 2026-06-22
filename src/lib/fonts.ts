import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";

/**
 * PP Eiko — the display face, used only for headlines (the value proposition).
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

/**
 * Roboto Mono — everything that isn't a headline (labels, index, footer, menu).
 */
export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
  display: "swap",
});
