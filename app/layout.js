import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

// Load fonts from Google
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

// Website metadata (this appears in browser tab)
export const metadata = {
  title: "Movie Explorer",
  description: "Explore trending movies easily!",
};

// Root layout component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${robotoMono.variable}`}>
        {children}
      </body>
    </html>
  );
}