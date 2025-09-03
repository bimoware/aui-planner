import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { ReactNode } from "react";

import "@/style/main.css"
const font = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AUI Planner",
  description: "Plan your AUI calendar with this savior tool",
};

export default function RootLayout({ children }: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.variable} w-screen h-screen bg-neutral-900 text-white p-10`}>
        {children}
      </body>
    </html>
  );
}
