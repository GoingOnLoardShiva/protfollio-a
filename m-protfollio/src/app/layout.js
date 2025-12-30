import "./globals.css";
import localFont from "next/font/local";

// Removed Google font imports (Geist) to avoid turbopack internal module import
// If you want to use Google fonts, add them via a <link> in metadata or use a supported font

export const metadata = {
  title: "Hiren Ray | Full Stack Developer | MERN & Next.js",
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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PZQQSTFF');
            `,
          }}
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PZQQSTFF"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
