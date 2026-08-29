import type { Metadata } from "next";
import { Geist, Geist_Mono, Corinthia } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const corinthia = Corinthia({
  variable: "--font-corinthia",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const bioLine =
  "BI Developer and Reporting Analyst with 12+ years of experience building automated reporting pipelines and Power BI dashboards in production environments for clients including British American Tobacco Bangladesh, Arnott's Australia and TOLL Australia.";

const siteTitle = "Siam Sadman — Power BI Developer & Fabric Analytics Engineer";

const shortDescription =
  "12+ years building Power BI dashboards and reporting pipelines in production for British American Tobacco, Arnott's Australia and TOLL Australia.";

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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${corinthia.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
