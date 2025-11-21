import { useEffect, useState } from "react";

/**
 * Hook per garantire che le animazioni partano solo durante lo scroll,
 * non al mount della pagina
 *
 * Usage:
 * const controls = useScrollAnimation();
 * <motion.div animate={controls} variants={fadeInUp}>
 */
export function useScrollAnimation() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Considera "scrolled" se la pagina è stata scrollata di almeno 50px
    const handleScroll = () => {
      if (window.scrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    // Check iniziale
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return hasScrolled;
}
