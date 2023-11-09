import { Inter } from "next/font/google";
import "./globals.css";
import { GithubIcon, Linkedin } from "lucide-react";
import Link from "next/link";
import EmailDialogBtn from "@/components/EmailDialog";
import { Toaster } from "@/components/toaster";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-neutral-900"}>
        <div className="max-w-7xl w-full mx-auto lg:flex relative">
          <div className="flex-1 hidden lg:flex items-end justify-center h-screen ">
            <Socials />
          </div>

          <div className="max-w-3xl w-full mx-auto px-4">
            <Header />
            <main>{children}</main>
          </div>

          <div className="flex-1 h-screen relative flex justify-center items-end">
            <Email />
          </div>
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

const Header = () => {
  return (
    <div className="flex justify-between">
      <h1 className="py-8">
        <Link
          href="/"
          className="text-neutral-100 font-semibold hover:underline text-xl"
        >
          Noel Vega
        </Link>
      </h1>

      <EmailDialogBtn>
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <div className="bg-green-500 blur-sm h-2.5 w-2.5 rounded-full animate-pulse" />
            <div className="bg-green-500/20 h-1.5 w-1.5 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-neutral-100 text-sm group-hover:underline group-hover:text-white">
            Available for hire
          </p>
        </div>
      </EmailDialogBtn>
    </div>
  );
};

const Socials = () => {
  return (
    <div className="flex flex-col items-center gap-6 text-neutral-400">
      <Link
        href="https://github.com/codeforkdev"
        target="_blank"
        className="group"
      >
        <GithubIcon
          size={24}
          className="group-hover:text-amber-300 group-hover:-translate-y-1 transition-all"
        />
      </Link>
      <Link
        href="https://www.linkedin.com/in/noelvegajr/"
        target="_blank"
        className="group"
      >
        <Linkedin
          size={24}
          className="group-hover:text-amber-300 group-hover:-translate-y-1 transition-all"
        />
      </Link>
      <div className="h-32 w-[1px] bg-neutral-400" />
    </div>
  );
};

const Email = () => {
  return (
    <div
      className="hidden lg:flex items-center gap-6 "
      style={{ writingMode: "vertical-rl" }}
    >
      <EmailDialogBtn>
        <button className="group">
          <div className="text-neutral-400 group-hover:text-amber-300 group-hover:-translate-y-1 transition-all tracking-wide">
            codeforkdev@gmail.com
          </div>
        </button>
      </EmailDialogBtn>
      <div className="h-32 w-[1px] shrink-0 bg-neutral-400" />
    </div>
  );
};
