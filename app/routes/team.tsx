import { useTranslation } from "react-i18next";

export default function Team() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-black text-white py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-black text-cyan-400 mb-16 text-center">
                    {t("team")}
                </h1>

                <div className="grid md:grid-cols-2 gap-16">
                    <div className="p-8 border border-purple-900/40 rounded-xl bg-black/30 backdrop-blur-sm">
                        <h2 className="text-4xl font-bold text-purple-400 mb-6">{t("founderTitle")}</h2>
                        <p className="text-xl opacity-90 mb-6">
                            {t("founderBio")}
                        </p>
                        <p className="text-lg opacity-70 italic">
                            {t("founderQuote")}
                        </p>
                    </div>

                    <div className="p-8 border border-cyan-900/40 rounded-xl bg-black/30 backdrop-blur-sm">
                        <h2 className="text-4xl font-bold text-cyan-400 mb-6">{t("riskManagerTitle")}</h2>
                        <p className="text-xl opacity-90 mb-6">
                            {t("riskManagerBio")}
                        </p>
                        <p className="text-lg opacity-70 italic">
                            {t("riskManagerQuote")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}