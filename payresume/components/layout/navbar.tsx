"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b-4 border-black bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          id="navbar-logo"
        >
          <div className="w-10 h-10 bg-blue border-3 border-black flex items-center justify-center font-display font-bold text-white text-lg shadow-brutal">
            P
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            PAYRESUME
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/about"
            className="font-display font-medium hover:text-blue transition-colors"
            id="nav-about"
          >
            About
          </Link>
          <Link
            href="/#faq"
            className="font-display font-medium hover:text-blue transition-colors"
            id="nav-faq"
          >
            FAQ
          </Link>
          <Link
            href="/create-cv"
            className="brutal-btn brutal-btn-primary text-sm py-2 px-4"
            id="nav-cta"
          >
            Mulai Gratis
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 border-3 border-black bg-yellow"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t-4 border-black bg-white animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-3">
            <Link
              href="/about"
              className="font-display font-medium py-2 border-b-2 border-black/10"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#faq"
              className="font-display font-medium py-2 border-b-2 border-black/10"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/create-cv"
              className="brutal-btn brutal-btn-primary text-center mt-2"
              onClick={() => setIsOpen(false)}
            >
              Mulai Gratis
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
