import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico, Inter, Poppins } from "next/font/google";
import "./globals.css";
<link
  href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
  rel="stylesheet"
></link>;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anglo swiss watch co.",
  description: "Designed & devloped by - Inrec",
  icons: {
    icon: "/images/logomain.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/*<link 
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" 
          rel="stylesheet" 
        />*/}
      </head>

      <body
        className={`${inter.variable} ${poppins.variable} ${pacifico.variable} font-inter antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
