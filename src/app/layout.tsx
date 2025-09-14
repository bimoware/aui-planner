import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./style.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Malik's AUI Planner",
  description: "Powerful calendar maker for AUI Students looking to spot possible overlaps, try out different section combinations, or simply visualize a possible schedule. Also allows for exporting to Google Calendar",
  openGraph: {
    images: "/calendar.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark`}>
        {children}
      </body>
    </html>
  );
}
