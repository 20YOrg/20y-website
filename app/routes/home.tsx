import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 text-white">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[linear-gradient(to_right,#00ffff12_1px,transparent_1px),linear-gradient(to_bottom,#00ffff12_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6">
            <span className="text-cyan-400">2</span>
            <span className="text-white">Ø</span>
            <span className="text-purple-500">Y</span>
          </h1>
          <p className="text-3xl md:text-5xl font-light mb-8 text-cyan-300">
            {t("tagline")}
          </p>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-12 opacity-90">
            {t("heroSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/strategy"
              className="px-12 py-6 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full text-xl font-bold hover:brightness-110 transition transform hover:scale-105"
            >
              {t("learnMore")}
            </a>
            <a
              href="/investors"
              className="px-12 py-6 border-2 border-cyan-500 rounded-full text-xl font-bold hover:bg-cyan-500/20 transition transform hover:scale-105"
            >
              {t("investNow")}
            </a>
          </div>
        </div>
      </section>

      {/* Quick philosophy blocks */}
      <section className="py-24 px-6 bg-black/40">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div className="p-8 border border-cyan-900/50 rounded-xl bg-black/30 backdrop-blur-sm">
            <h3 className="text-4xl font-bold text-cyan-400 mb-4">{t("crypto")}</h3>
            <p className="text-lg opacity-80">{t("cryptoDesc")}</p>
          </div>
          <div className="p-8 border border-purple-900/50 rounded-xl bg-black/30 backdrop-blur-sm">
            <h3 className="text-4xl font-bold text-purple-400 mb-4">{t("ai")}</h3>
            <p className="text-lg opacity-80">{t("aiDesc")}</p>
          </div>
          <div className="p-8 border border-cyan-900/50 rounded-xl bg-black/30 backdrop-blur-sm">
            <h3 className="text-4xl font-bold text-cyan-400 mb-4">{t("flatSociety")}</h3>
            <p className="text-lg opacity-80">{t("flatSocietyDesc")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}