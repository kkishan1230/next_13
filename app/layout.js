import Footer from "./Footer";
import "./globals.css";
import Header from "./Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <div className="max-w-[1200px] mx-auto px-8">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
