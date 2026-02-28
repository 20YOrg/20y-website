import "./i18n/config"; // First - init i18next

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  Link,
} from "react-router";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  // Detect current language from URL path
  const pathParts = location.pathname.split("/").filter(Boolean);
  const langFromPath = pathParts[0] && ["es", "zh"].includes(pathParts[0]) ? pathParts[0] : "en";

  // Force language sync + re-render on path change
  useEffect(() => {
    console.log("Path changed:", location.pathname, "Detected lang:", langFromPath);
    if (i18n.language !== langFromPath) {
      i18n.changeLanguage(langFromPath).then(() => {
        setRenderKey(prev => prev + 1); // Force re-render after change
        console.log("Language changed to:", i18n.language);
      });
    }
  }, [location.pathname, i18n]);

  const currentLang = i18n.language as "en" | "es" | "zh";

  const prefixedPath = (path: string) => {
    return currentLang === "en" ? path : `/${currentLang}${path}`;
  };

  const switchToLang = (lang: "en" | "es" | "zh") => {
    const cleanPath = location.pathname.replace(/^\/(es|zh)/, "") || "/";
    return lang === "en" ? cleanPath : `/${lang}${cleanPath}`;
  };

  return (
    <html lang={currentLang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google" content="notranslate" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-black text-white flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-900/50">
          <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <Link
              to={currentLang === "en" ? "/" : `/${currentLang}`}
              className="text-4xl font-black tracking-tight"
            >
              <span className="text-cyan-400">2</span>
              <span className="text-white">Ø</span>
              <span className="text-purple-400">Y</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12">
              <div className="flex gap-10 text-lg font-medium">
                <Link to={prefixedPath("/")} className="hover:text-cyan-400 transition">{t("home")}</Link>
                <Link to={prefixedPath("/about")} className="hover:text-cyan-400 transition">{t("about")}</Link>
                <Link to={prefixedPath("/strategy")} className="hover:text-cyan-400 transition">{t("strategy")}</Link>
                <Link to={prefixedPath("/team")} className="hover:text-cyan-400 transition">{t("team")}</Link>
                <Link to={prefixedPath("/reports")} className="hover:text-cyan-400 transition">{t("reports")}</Link>
                <Link to={prefixedPath("/investors")} className="hover:text-cyan-400 transition">{t("investors")}</Link>
                <Link to={prefixedPath("/contact")} className="hover:text-cyan-400 transition">{t("contact")}</Link>
              </div>

              <div className="flex gap-5 text-2xl">
                <Link to={switchToLang("en")} className={currentLang === "en" ? "text-cyan-400" : "opacity-60 hover:opacity-100"}>EN</Link>
                <Link to={switchToLang("es")} className={currentLang === "es" ? "text-cyan-400" : "opacity-60 hover:opacity-100"}>ES</Link>
                <Link to={switchToLang("zh")} className={currentLang === "zh" ? "text-cyan-400" : "opacity-60 hover:opacity-100"}>ZH</Link>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-4xl"
            >
              ☰
            </button>
          </nav>

          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-cyan-900/50">
              <div className="flex flex-col items-center py-10 gap-8 text-xl">
                <Link to={prefixedPath("/")} onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">{t("home")}</Link>
                <Link to={prefixedPath("/about")} onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">{t("about")}</Link>
                <Link to={prefixedPath("/strategy")} onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">{t("strategy")}</Link>
                <Link to={prefixedPath("/team")} onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">{t("team")}</Link>
                <Link to={prefixedPath("/reports")} onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">{t("reports")}</Link>
                <Link to={prefixedPath("/investors")} onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">{t("investors")}</Link>
                <Link to={prefixedPath("/contact")} onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">{t("contact")}</Link>

                <div className="flex gap-8 text-3xl pt-6">
                  <Link to={switchToLang("en")} onClick={() => setMobileMenuOpen(false)} className={currentLang === "en" ? "text-cyan-400" : "opacity-60"}>EN</Link>
                  <Link to={switchToLang("es")} onClick={() => setMobileMenuOpen(false)} className={currentLang === "es" ? "text-cyan-400" : "opacity-60"}>ES</Link>
                  <Link to={switchToLang("zh")} onClick={() => setMobileMenuOpen(false)} className={currentLang === "zh" ? "text-cyan-400" : "opacity-60"}>ZH</Link>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Force re-render on language change */}
        <main className="flex-1" key={currentLang + location.pathname}>
          <Outlet />
        </main>

        <footer className="bg-black border-t border-cyan-900/30 py-12 text-center text-gray-400">
          <p className="text-lg mb-2">© {new Date().getFullYear()} 2ØY – All Rights Reserved</p>
          <p className="text-sm opacity-70">Building a flatter, more equitable future through cryptocurrency, AI, and advanced technology</p>
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}