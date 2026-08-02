import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1c2c" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://uscivics-quiz.com"),
  title: {
    default:
      "USCivics Quiz — Free US Citizenship Civics Test Practice (2008 & 2025)",
    template: "%s | USCivics Quiz",
  },
  description:
    "Free USCIS naturalization civics test practice. Official 100 and 128 questions in multiple languages, no sign-up. Prep for the citizenship interview.",
  keywords: [
    "US citizenship test",
    "US civics quiz",
    "civics test practice",
    "USCIS civics questions",
    "naturalization test",
    "128 civics questions",
    "2008 civics test",
    "2025 civics test",
    "examen de ciudadanía",
    "preguntas de civismo",
    "اختبار المواطنة",
    "시민권 시험",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-dvh font-sans text-ink">
        <FirebaseAnalytics />
        {children}
      </body>
    </html>
  );
}
