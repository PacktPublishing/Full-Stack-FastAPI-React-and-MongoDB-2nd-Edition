import "./globals.css";

import Navbar from "@/components/Navbar";



export const metadata = {
  title: "Farm Cars App",
  description: "Next.js + FastAPI + MongoDB App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="p-4  min-h-[calc(100vh-56px)]">
          {children}
        </div>
      </body>
    </html>
  );
}
