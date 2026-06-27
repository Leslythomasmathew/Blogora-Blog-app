import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Blogora - Design, SaaS & Tech Insights",
    template: "%s | Blogora",
  },
  description: "Discover deep dives, strategies, and tutorials on SaaS, UI/UX design systems, modern front-end architectures, and development practices.",
  keywords: ["Design System", "Next.js", "React Query", "Tailwind CSS", "UI/UX", "SaaS", "Productivity"],
  authors: [{ name: "Blogora Team" }],
  openGraph: {
    title: "Blogora - Design, SaaS & Tech Insights",
    description: "Discover deep dives, strategies, and tutorials on SaaS, UI/UX design systems, and development practices.",
    type: "website",
    locale: "en_US",
    siteName: "Blogora",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogora - Design, SaaS & Tech Insights",
    description: "Discover deep dives, strategies, and tutorials on SaaS, UI/UX design systems, and development practices.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} font-sans h-full antialiased`}
    >
      <body className="h-full bg-slate-50/40 text-slate-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300 flex flex-col">
        <Providers>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

