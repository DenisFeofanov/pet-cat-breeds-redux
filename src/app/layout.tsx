import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Star Wars characters",
  description:
    "List of characters from Star Wars universe, fetched from API and displayed using Redux",
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
            Loading animation by Alwin Jolliffe
          </footer>
        </body>
      </html>
    </Providers>
  );
}
