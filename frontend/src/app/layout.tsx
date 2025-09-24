import "./globals.css";
import { ReactNode } from "react";
import Header from "../components/Header";

export const metadata = {
  title: "Rentkar Delivery Management",
  description: "Admin & Delivery partner dashboards",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
      </body>
    </html>
  );
}
