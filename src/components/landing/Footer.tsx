import Link from "next/link";

const navGroups = [
  {
    title: "Product",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Our Food", href: "/our-food" },
      { label: "Wellness Tracker", href: "/wellness" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)]" style={{ padding: "4rem 0 2rem" }}>
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Pupsy Logo" className="h-8 md:h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
              Fresh, personalised meals for your dog. Cooked daily. Delivered to your door across India.
            </p>
            <div className="mt-6 space-y-1 text-sm text-muted-foreground">
              <p><a href="mailto:apoorv@pupsy.in" className="hover:text-foreground">apoorv@pupsy.in</a> · <a href="mailto:jaskaran@pupsy.in" className="hover:text-foreground">jaskaran@pupsy.in</a></p>
              <p>+91 9811808217 · +91 88007 47439</p>
              <p>A10/12 Jhilmil Industrial Area, New Delhi</p>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-pill-bg)] text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-pill-bg)] text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {group.title}
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <span className="text-sm text-muted-foreground cursor-default">
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Pupsy. All rights reserved.</div>
          <div>Made with 🧡 in New Delhi</div>
        </div>
      </div>
    </footer>
  );
}
