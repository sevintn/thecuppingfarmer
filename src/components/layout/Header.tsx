"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  lang: string;
  dict: {
    nav: {
      home: string;
      shop: string;
      experiences: string;
      about: string;
      blog: string;
      contact: string;
      cart: string;
    };
  };
}

export default function Header({ lang, dict }: HeaderProps) {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const otherLang = lang === "es" ? "en" : "es";

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/tienda`, label: dict.nav.shop },
    { href: `/${lang}/experiencias`, label: dict.nav.experiences },
    { href: `/${lang}/nosotros`, label: dict.nav.about },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: `/${lang}/contacto`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur border-b border-brand-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 group"
            aria-label="The Cupping Farmer — Inicio"
          >
            <div className="w-9 h-9 bg-brand-dark rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-brand-cream text-sm font-heading font-bold">
                CF
              </span>
            </div>
            <span className="font-heading font-bold text-brand-dark text-lg leading-tight hidden sm:block">
              The Cupping
              <br />
              <span className="text-brand-mid">Farmer</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-body text-brand-dark hover:text-brand-mid transition-colors duration-150 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <Link
              href={`/${otherLang}`}
              className="hidden sm:block text-xs font-body uppercase tracking-widest text-brand-mid hover:text-brand-dark border border-brand-mid px-2.5 py-1 transition-colors duration-150"
            >
              {otherLang}
            </Link>

            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative p-2 text-brand-dark hover:text-brand-mid transition-colors duration-150"
              aria-label={`${dict.nav.cart}${itemCount > 0 ? ` (${itemCount})` : ""}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-brand-mid text-brand-cream text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-brand-dark"
              aria-label="Menú"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-beige px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-base font-body text-brand-dark hover:text-brand-mid border-b border-brand-beige/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${otherLang}`}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-sm font-body text-brand-mid uppercase tracking-widest"
            >
              {otherLang === "es" ? "Español" : "English"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
