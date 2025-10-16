import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center group relative z-10">
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <span className="relative block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-bold text-2xl tracking-tight group-hover:scale-105 transition-transform duration-300">
          SWAGGERZ
        </span>
      </div>
    </Link>
  );
}
