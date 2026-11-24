import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const bioLine =
  "BI Developer and Reporting Analyst with 10+ years in enterprise reporting, building automated reporting pipelines and Power BI dashboards in production environments for clients including British American Tobacco Bangladesh, Arnott's Australia and TOLL Australia.";

const siteTitle = "Siam Sadman — Power BI Developer & Fabric Analytics Engineer";

const shortDescription =
  "10+ years in enterprise reporting, delivering Power BI dashboards and reporting pipelines in production for British American Tobacco, Arnott's Australia and TOLL Australia.";

export const metadata: Metadata = {
  metadataBase: new URL("https://siamsadman.vercel.app"),
  title: siteTitle,
  description: bioLine,
  openGraph: {
    title: siteTitle,
    description: shortDescription,
    url: "/",
    siteName: "Siam Sadman",
    images: [
      {
        url: "/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: shortDescription,
    images: ["/og-image-v2.jpg"],
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-[10px] focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-on-accent"
        >
          Skip to content
        </a>
        <Header />
        {children}
      </body>
    </html>
  );
}
