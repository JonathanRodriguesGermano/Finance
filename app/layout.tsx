import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Finance Control",
  description:
    "Have complete control over your spending in the palm of your hand... by Germano ",
  icons: {
    icon: "/financeLogo.svg",
  },
  openGraph: {
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finance Control",
      },
    ],
    title: "Finance Control",
    description: "Manage your finances with ease",
    url: "https://finance-control.vercel.app",
    siteName: "Finance Control",
    locale: "pt-BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${mulish.className} dark h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ClerkProvider
          appearance={{
            theme: dark,
          }}
        >
          <div className="flex h-full flex-col overflow-hidden">{children}</div>
        </ClerkProvider>
      </body>
    </html>
  );
}
