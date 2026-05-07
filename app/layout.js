import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#f43f5e"
};

export const metadata = {
  title: "Happiest Birthday Babu ILU - Birthday Celebration App",
  description: "A special birthday celebration app with 13 chapters, interactive cake, gifts, and more. Designed with love for the most precious person.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Happiest Birthday"
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="theme-color" content="#f43f5e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Happiest Birthday" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="description" content="A special birthday celebration app with 13 chapters, interactive cake, gifts, and more." />
        <meta name="keywords" content="birthday, celebration, interactive, love, special" />
        <meta property="og:title" content="Happiest Birthday Babu ILU" />
        <meta property="og:description" content="A special birthday celebration app with love" />
        <meta property="og:type" content="website" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect fill='%23f43f5e' width='180' height='180'/><text x='50%' y='50%' font-size='60' text-anchor='middle' dominant-baseline='central' fill='white' font-family='system-ui'>❤️</text></svg>" />
        <meta name="color-scheme" content="light dark" />
        <meta name="author" content="Your Devoted Heart" />
      </head>
      <body className="min-h-full flex flex-col bg-gradient-to-br from-pink-50 via-white to-rose-50">{children}</body>
    </html>
  );
}
