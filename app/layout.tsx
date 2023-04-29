import Header from "./components/Header";
import { ImagesState } from "./contexts/ImagesContext";
import { SearchState } from "./contexts/SearchContext";
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
        <ImagesState>
          <SearchState>
            <Header />
            {children}
          </SearchState>
        </ImagesState>
      </body>
    </html>
  );
}
