import "./globals.css";
import localFont from "next/font/local";

// Removed Google font imports (Geist) to avoid turbopack internal module import
// If you want to use Google fonts, add them via a <link> in metadata or use a supported font

export const metadata = {
  title: "Hiren Ray - Web App Developer",
  description: "Web App Developer",
};
const poppins = localFont({
  src: [
    {
      // layout.js lives in src/app — public lives at project root, so ../../public is correct
      path: "../../public/fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
