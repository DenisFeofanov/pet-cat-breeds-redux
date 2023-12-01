import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cat breeds",
  description:
    "List of cat breeds, with description and key personality traits for each",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${inter.className} min-h-screen bg-[#fef9ec] flex flex-col justify-between`}
        >
          <main className="p-6 md:p-12">{children}</main>

          <footer className="border-t border-black text-right p-8">
            Loading animation by{" "}
            <a target="_blank" href="https://www.alwinjolliffe.com/">
              Alwin Jolliffe
            </a>
            , placeholder images by{" "}
            <a target="_blank" href="https://www.freepik.com/">
              Freepik
            </a>
          </footer>
        </body>
      </html>
    </Providers>
  );
}
