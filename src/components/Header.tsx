import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FormattedMessage } from "react-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Sun, Moon, X } from "lucide-react";

interface HeaderProps {
  currentLocale: string;
  setLocale: (lang: string) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
    />
  </svg>
);

export const Header = ({ currentLocale, setLocale, theme, toggleTheme }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setIsOpen(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { id: "header.home", to: `/${currentLocale}` },
    { id: "header.projects", to: `/${currentLocale}#projects` },
    { id: "header.contact", to: `/${currentLocale}/contact` },
    { id: "header.resume", to: `/${currentLocale}/resume` },
  ];

  const handleHomeClick = (e: React.MouseEvent) => {
    const isHomePath = window.location.pathname === `/${currentLocale}` || window.location.pathname === `/${currentLocale}/`;
    if (isHomePath) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleProjectsClick = (e: React.MouseEvent) => {
    const isHomePath = window.location.pathname === `/${currentLocale}` || window.location.pathname === `/${currentLocale}/`;
    if (isHomePath) {
      e.preventDefault();
      const element = document.getElementById("projects");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const checkIsActive = (linkId: string) => {
    const currentPath = location.pathname;
    const currentHash = location.hash;
    const isHome = currentPath === `/${currentLocale}` || currentPath === `/${currentLocale}/` || currentPath === "/";

    if (linkId === "header.home") {
      return isHome && !currentHash;
    }
    if (linkId === "header.projects") {
      return isHome && currentHash === "#projects";
    }
    if (linkId === "header.contact") {
      return currentPath.includes("/contact");
    }
    if (linkId === "header.resume") {
      return currentPath.includes("/resume");
    }
    return false;
  };

  return (
    <header className="sticky top-0 w-full text-text-h z-50 border-b border-white/10 bg-bg/85 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link to={`/${currentLocale}`} onClick={(e) => { closeMenu(); handleHomeClick(e); }}>
            <FormattedMessage id="header.logo" defaultMessage="diogo.translation" />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const active = checkIsActive(link.id);
            return (
              <NavLink
                key={link.id}
                to={link.to}
                onClick={(e) => {
                  if (link.id === "header.home") handleHomeClick(e);
                  if (link.id === "header.projects") handleProjectsClick(e);
                }}
                className={`cursor-pointer text-sm transition-all duration-200 ${
                  active
                    ? "text-accent font-bold"
                    : "text-gray-300 hover:text-white font-medium"
                }`}
              >
                <FormattedMessage id={link.id} />
              </NavLink>
            );
          })}

          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/10">
            <LanguageSwitcher
              currentLocale={currentLocale}
              setLocale={setLocale}
              variant="icon"
            />
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-300 hover:text-accent rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center select-none"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-300 hover:text-accent rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center select-none"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 relative hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-white"
            aria-label="Open menu"
          >
            <MenuIcon isOpen={false} />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay via Portal */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-50 md:hidden bg-bg/95 backdrop-blur-xl flex flex-col animate-fade-in">
          {/* Mobile Overlay Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
            <div className="text-lg font-bold">
              <Link to={`/${currentLocale}`} onClick={(e) => { closeMenu(); handleHomeClick(e); }}>
                <FormattedMessage id="header.logo" defaultMessage="diogo.translation" />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-300 hover:text-accent rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={closeMenu}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Links and content */}
          <div className="flex flex-col pt-6 px-6 pb-8 flex-1 overflow-y-auto justify-between">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = checkIsActive(link.id);
                return (
                  <NavLink
                    key={link.id}
                    to={link.to}
                    onClick={(e) => {
                      closeMenu();
                      if (link.id === "header.home") handleHomeClick(e);
                      if (link.id === "header.projects") handleProjectsClick(e);
                    }}
                    className={`text-lg font-semibold px-5 py-3.5 rounded-xl transition-all flex items-center justify-between ${
                      active
                        ? "bg-accent/10 text-accent font-bold border border-accent/20"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <FormattedMessage id={link.id} />
                  </NavLink>
                );
              })}
            </div>

            {/* Menu footer */}
            <div className="border-t border-white/10 pt-6 text-center space-y-4 shrink-0">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                <FormattedMessage id="header.language" defaultMessage="Idioma" />
              </div>
              <div className="flex justify-center">
                <LanguageSwitcher
                  currentLocale={currentLocale}
                  setLocale={(lang) => {
                    setLocale(lang);
                    closeMenu();
                  }}
                  variant="text"
                />
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
