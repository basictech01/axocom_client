/**
 * Navbar - Uttarakhand Innovation & Solutions Hackathon
 * Theme-aware bar with brand logo tile and day/night toggle
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "~/features/hackathon/lib/router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "~/features/hackathon/contexts/ThemeContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/problems", label: "Problems" },
  { href: "/solutions", label: "Solutions" },
  { href: "/mentors", label: "Mentors" },
  { href: "/register/mentor", label: "Register Mentor" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-page/90 backdrop-blur-xl border-b border-border"
          : "bg-gradient-to-b from-page/80 via-page/40 to-transparent border-b border-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="w-fit flex items-center gap-1.5 shrink-0 group">
          <img
            src="/itda_without_background.png"
            alt="Information Technology Development Agency"
            className="h-[29px] sm:h-[34px] lg:h-[39px] w-auto shrink-0 object-contain"
            width={39}
            height={39}
          />
          <img
            src="/hackathon/logo.png"
            alt="Uttarakhand Innovation & Solutions Hackathon"
            className="h-10 sm:h-12 lg:h-14 w-auto max-w-[200px] sm:max-w-[260px] lg:max-w-[320px] object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
            width={320}
            height={56}
          />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location === link.href
                    ? "text-primary bg-surface-subtle"
                    : "text-muted-foreground hover:text-primary hover:bg-surface-subtle/60"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
            className="p-2.5 rounded-lg border border-border bg-secondary text-foreground hover:bg-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/problems">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary-hover transition-colors overflow-hidden"
            >
              <span className="relative z-10">Explore Problems</span>
            </motion.button>
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
            className="p-2 rounded-lg border border-border bg-secondary text-foreground hover:bg-accent transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden bg-page/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link href={link.href}>
                    <span
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        location === link.href
                          ? "text-primary bg-surface-subtle"
                          : "text-muted-foreground hover:text-primary hover:bg-accent"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
