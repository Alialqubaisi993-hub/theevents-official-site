import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "TheEvents UAE", description: "UAE exhibitions and booth booking platform" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
