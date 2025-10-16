import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  links?: FooterLink[];
  socials?: { icon: string; label: string; href: string }[];
}

const defaultLinks: FooterLink[] = [
  { label: "About", href: "/#" },
  { label: "Careers", href: "/#" },
  { label: "Stores", href: "/#" },
  { label: "Support", href: "/#" },
  { label: "Privacy", href: "/#" },
];

const defaultSocials = [
  { icon: "/facebook.svg", label: "Facebook", href: "/#" },
  { icon: "/instagram.svg", label: "Instagram", href: "/#" },
  { icon: "/x.svg", label: "X", href: "/#" },
];

export default function Footer({ links = defaultLinks, socials = defaultSocials }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-[var(--color-light-300)] bg-[var(--color-light-100)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Logo" width={28} height={28} />
            <span className="text-[var(--text-heading-3)] leading-[var(--text-heading-3--line-height)] font-semibold text-[var(--color-dark-900)]">
              Sneakers
            </span>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[var(--text-body)] leading-[var(--text-body--line-height)] text-[var(--color-dark-900)] hover:text-[var(--color-dark-700)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <Link key={s.label} href={s.href} aria-label={s.label} className="hover:opacity-80">
                <Image src={s.icon} alt={s.label} width={22} height={22} />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-caption)] leading-[var(--text-caption--line-height)] text-[var(--color-dark-700)]">
            © {new Date().getFullYear()} Sneakers Inc. All rights reserved.
          </p>
          <p className="text-[var(--text-caption)] leading-[var(--text-caption--line-height)] text-[var(--color-dark-700)]">
            Built with Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}


