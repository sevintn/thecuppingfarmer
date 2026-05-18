import Link from "next/link";
import { InstagramIcon, YoutubeIcon, FacebookIcon, TiktokIcon } from "@/components/ui/SocialIcons";

interface FooterProps {
  lang: string;
  dict: {
    nav: {
      home: string;
      shop: string;
      experiences: string;
      about: string;
      blog: string;
      contact: string;
    };
    footer: {
      tagline: string;
      links_title: string;
      social_title: string;
      rights: string;
    };
  };
}

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/THECUPPINGFARMER/",
    icon: InstagramIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/hashtag/thecuppingfarmer",
    icon: YoutubeIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/TheCuppingFarmer",
    icon: FacebookIcon,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@thecuppingfarmer",
    icon: TiktokIcon,
  },
];

export default function Footer({ lang, dict }: FooterProps) {
  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/tienda`, label: dict.nav.shop },
    { href: `/${lang}/experiencias`, label: dict.nav.experiences },
    { href: `/${lang}/nosotros`, label: dict.nav.about },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: `/${lang}/contacto`, label: dict.nav.contact },
  ];

  return (
    <footer className="bg-brand-dark text-brand-beige mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo-mark.svg`}
                alt="The Cupping Farmer"
                width={56}
                height={56}
                className="flex-shrink-0 brightness-0 invert"
              />
              <span className="font-heading font-bold text-brand-cream text-lg leading-tight">
                The Cupping
                <br />
                <span className="text-brand-beige/80">Farmer</span>
              </span>
            </div>
            <p className="text-brand-beige/70 text-sm font-body leading-relaxed">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-heading text-brand-cream font-semibold text-sm uppercase tracking-widest">
              {dict.footer.links_title}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-beige/70 hover:text-brand-cream text-sm font-body transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-heading text-brand-cream font-semibold text-sm uppercase tracking-widest">
              {dict.footer.social_title}
            </h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-brand-beige/70 hover:text-brand-cream transition-colors duration-150 group"
                >
                  <social.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-body">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-mid/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-brand-beige/50 text-xs font-body">
            © {new Date().getFullYear()} The Cupping Farmer.{" "}
            {dict.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/es"
              className="text-brand-beige/50 hover:text-brand-cream text-xs font-body transition-colors"
            >
              Español
            </Link>
            <Link
              href="/en"
              className="text-brand-beige/50 hover:text-brand-cream text-xs font-body transition-colors"
            >
              English
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
