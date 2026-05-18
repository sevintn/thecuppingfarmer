"use client";

import { useState } from "react";
import { Mail, Send, MapPin } from "lucide-react";
import { InstagramIcon, YoutubeIcon, FacebookIcon, TiktokIcon } from "@/components/ui/SocialIcons";
import Button from "@/components/ui/Button";

interface ContactPageClientProps {
  lang: string;
  dict: {
    contact: {
      title: string;
      subtitle: string;
      name: string;
      email: string;
      subject: string;
      message: string;
      send: string;
      success: string;
      follow_us: string;
      info_title: string;
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

export default function ContactPageClient({ lang, dict }: ContactPageClientProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:info@thecuppingfarmer.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
      `${dict.contact.name}: ${form.name}\n${dict.contact.email}: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-white border border-brand-beige focus:border-brand-mid focus:outline-none font-body text-brand-dark text-sm px-4 py-3 transition-colors placeholder:text-brand-mid/40";

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-dark text-brand-cream py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-body text-brand-beige/60 text-xs uppercase tracking-[0.25em] mb-3">
            {dict.contact.subtitle}
          </p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl">
            {dict.contact.title}
          </h1>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-brand-green/10 border border-brand-green text-brand-green p-6 font-body text-base">
                  {dict.contact.success}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-body text-brand-dark text-xs uppercase tracking-wider mb-1.5">
                        {dict.contact.name}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className={inputClass}
                        placeholder={lang === "es" ? "Tu nombre" : "Your name"}
                      />
                    </div>
                    <div>
                      <label className="block font-body text-brand-dark text-xs uppercase tracking-wider mb-1.5">
                        {dict.contact.email}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className={inputClass}
                        placeholder={
                          lang === "es" ? "tu@email.com" : "you@email.com"
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-brand-dark text-xs uppercase tracking-wider mb-1.5">
                      {dict.contact.subject}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className={inputClass}
                      placeholder={
                        lang === "es"
                          ? "¿En qué podemos ayudarte?"
                          : "How can we help?"
                      }
                    />
                  </div>

                  <div>
                    <label className="block font-body text-brand-dark text-xs uppercase tracking-wider mb-1.5">
                      {dict.contact.message}
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className={`${inputClass} resize-none`}
                      placeholder={
                        lang === "es"
                          ? "Escribe tu mensaje aquí..."
                          : "Write your message here..."
                      }
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg">
                    <Send className="w-4 h-4" />
                    {dict.contact.send}
                  </Button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading font-semibold text-brand-dark text-xl mb-4">
                  {dict.contact.info_title}
                </h2>
                <div className="flex items-start gap-3 text-brand-mid">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p className="font-body text-sm">
                    info@thecuppingfarmer.com
                  </p>
                </div>
                <div className="flex items-start gap-3 text-brand-mid mt-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p className="font-body text-sm">Colombia</p>
                </div>
              </div>

              <div>
                <h2 className="font-heading font-semibold text-brand-dark text-xl mb-4">
                  {dict.contact.follow_us}
                </h2>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-brand-mid hover:text-brand-dark transition-colors"
                    >
                      <social.icon className="w-4 h-4" />
                      <span className="font-body text-sm">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
