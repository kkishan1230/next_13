import Footer from "./Footer";
import "./globals.css";
import Header from "./Header";
import { Providers } from "./provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
