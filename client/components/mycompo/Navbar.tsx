"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { UserButton } from "@daveyplate/better-auth-ui";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { data: session } = useSession();

  return (
    <>
      {/* NAVBAR */}
      <nav className="z-50 flex items-center justify-between w-full py-4 px-4 md:px-16 lg:px-24 xl:px-32 backdrop-blur border-b text-white border-slate-800">
        {/* Logo */}
        <Link href="/">
          <h3>
            Build.<span className="text-[#4f39f6]">web</span>
          </h3>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link href="/" className="hover:text-slate-300 transition">
            Home
          </Link>
          <Link href="/my_projects" className="hover:text-slate-300 transition">
            My Projects
          </Link>
          <Link href="/community" className="hover:text-slate-300 transition">
            Community
          </Link>
          <Link href="/pricing" className="hover:text-slate-300 transition">
            Pricing
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:block space-x-3">
          {!session?.user ? (
            <Link href="/auth/sign-up">
              <button className="px-6 py-2 bg-indigo-600 active:scale-95 hover:bg-indigo-700 transition rounded-md">
                Get started
              </button>
            </Link>
          ) : (
            <UserButton size="icon" />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden active:scale-90 transition"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="26" height="26" stroke="currentColor">
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* MOBILE OVERLAY MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-100 bg-black/60 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden">
          <Link href="#products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link href="#resources" onClick={() => setMenuOpen(false)}>
            Resources
          </Link>
          <Link href="#stories" onClick={() => setMenuOpen(false)}>
            Stories
          </Link>
          <Link href="#pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>

          <button
            className="active:ring-3 active:ring-white size-10 p-1 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-black rounded-md"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="24" height="24" stroke="currentColor">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
