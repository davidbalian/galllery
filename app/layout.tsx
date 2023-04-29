import Header from "./Header";
import { Context } from "./context";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Context>
          <Header />
          {children}
        </Context>
      </body>
    </html>
  );
}
