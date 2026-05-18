import { InstagramIcon, YoutubeIcon, FacebookIcon, TiktokIcon } from "@/components/ui/SocialIcons";

interface SocialLinksProps {
  dict: {
    social: {
      title: string;
      subtitle: string;
    };
  };
}

const socialLinks = [
  {
    name: "Instagram",
    handle: "@THECUPPINGFARMER",
    href: "https://www.instagram.com/THECUPPINGFARMER/",
    icon: InstagramIcon,
    color: "hover:text-pink-500",
  },
  {
    name: "YouTube",
    handle: "#thecuppingfarmer",
    href: "https://www.youtube.com/hashtag/thecuppingfarmer",
    icon: YoutubeIcon,
    color: "hover:text-red-500",
  },
  {
    name: "Facebook",
    handle: "TheCuppingFarmer",
    href: "https://www.facebook.com/TheCuppingFarmer",
    icon: FacebookIcon,
    color: "hover:text-blue-500",
  },
  {
    name: "TikTok",
    handle: "@thecuppingfarmer",
    href: "https://www.tiktok.com/@thecuppingfarmer",
    icon: TiktokIcon,
    color: "hover:text-brand-dark",
  },
];

export default function SocialLinks({ dict }: SocialLinksProps) {
  return (
    <section className="py-16 lg:py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-body text-brand-mid text-xs uppercase tracking-[0.25em] mb-3">
          {dict.social.subtitle}
        </p>
        <h2 className="font-heading font-bold text-brand-dark text-3xl sm:text-4xl mb-10">
          {dict.social.title}
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "group flex flex-col items-center gap-3 p-6 border border-brand-beige",
                "hover:border-brand-mid transition-all duration-200 hover:shadow-md w-36",
                "text-brand-mid",
                social.color,
              ].join(" ")}
            >
              {social.icon ? (
                <social.icon className="w-7 h-7" />
              ) : null}
              <div className="text-center">
                <p className="font-body font-semibold text-brand-dark text-sm group-hover:text-inherit">
                  {social.name}
                </p>
                <p className="font-body text-xs text-brand-mid/70 mt-0.5">
                  {social.handle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
