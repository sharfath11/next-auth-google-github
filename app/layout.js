import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./componants/headr/Header";
import AuthProvider from "../app/componants/AuthProvider"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JDT SHOPE",
  description: "JDT STUDENT SHOPE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
      <body className={inter.className}>
        
        <div className="min-h-screen flex flex-col">
          <Header />
          {children}
          <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <p>Copyright © 2024 - All right reserved by JDT V3.0</p>
          </footer>
        </div>
        
      </body>
      </AuthProvider>
    </html>
  );
}
