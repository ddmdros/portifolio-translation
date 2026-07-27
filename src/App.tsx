import { useState, useEffect } from "react";
import { IntlProvider, FormattedMessage } from "react-intl";
import { BrowserRouter, Routes, Route, useParams, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowUp } from "lucide-react";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { ProjectsPage } from "./pages/ProjectsPage";
import { Contact } from "./pages/Contact";
import { Resume } from "./pages/Resume";

import ptbrMessages from "./i18n/messages/ptbr.json";
import enMessages from "./i18n/messages/en.json";
import { DocsPage } from "./content/pages/DocsPage";
import { DevMode } from "./pages/DevMode";

const messagesMap: Record<string, Record<string, string>> = {
  pt: ptbrMessages,
  en: enMessages,
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

// Component to handle layout and sync language from URL
const LanguageLayout = ({ setLocale }: { setLocale: (lang: string) => void }) => {
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isValidLang = lang === "pt" || lang === "en";

  useEffect(() => {
    if (isValidLang && lang) {
      setLocale(lang);
    }
  }, [lang, isValidLang, setLocale]);

  useEffect(() => {
    if (!isValidLang) {
      const browserLang = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage || "";
      const detectedLang = browserLang.toLowerCase().startsWith("pt") ? "pt" : "en";
      const path = location.pathname;
      navigate(`/${detectedLang}${path}${location.hash}${location.search}`, { replace: true });
    }
  }, [isValidLang, location, navigate]);

  if (!isValidLang) {
    return null;
  }

  return <Outlet />;
};

// Fallback component to redirect non-prefixed root and subroutes
const LanguageRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const browserLang = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage || "";
    const detectedLang = browserLang.toLowerCase().startsWith("pt") ? "pt" : "en";
    const path = location.pathname === "/" ? "" : location.pathname;
    navigate(`/${detectedLang}${path}${location.hash}${location.search}`, { replace: true });
  }, [navigate, location]);

  return null;
};

function App() {
  const [locale, setLocale] = useState("en");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <IntlProvider locale={locale} messages={messagesMap[locale]}>
        <div className="min-h-screen bg-bg text-text transition-colors duration-300 flex flex-col justify-between">
          <div>
            <Header
              currentLocale={locale}
              setLocale={setLocale}
              theme={theme}
              toggleTheme={toggleTheme}
            />

            <Routes>
              {/* Multi-language parent route */}
              <Route path="/:lang" element={<LanguageLayout setLocale={setLocale} />}>
                <Route index element={<Home />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:id" element={<BlogPost />} />
                <Route path="contact" element={<Contact />} />
                <Route path="resume" element={<Resume />} />
                <Route path="docs/:slug" element={<DocsPage />} />
                <Route path="dev-mode" element={<DevMode />} />
              </Route>

              {/* Fallback for paths without language prefix */}
              <Route path="*" element={<LanguageRedirect />} />
            </Routes>
          </div>

          <footer className="max-w-5xl w-full mx-auto px-6 py-8 flex justify-center border-t border-white/5 mt-12">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-accent transition-colors cursor-pointer select-none"
            >
              <ArrowUp size={14} />
              <FormattedMessage id="footer.backToTop" defaultMessage="Back to Top" />
            </button>
          </footer>
        </div>
      </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
