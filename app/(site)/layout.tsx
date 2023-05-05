import StateContext from "@/context/StateContext";
import { Footer, Navbar } from "../components";
import "../globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Tech Store",
  description: "Tech Ecommerce Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="p-[10px]">
      <Head>
        <title>Tech Store</title>
      </Head>
      <body>
        <StateContext>
          <Toaster />
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </StateContext>
      </body>
    </html>
  );
}
