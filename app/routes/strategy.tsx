import { useTranslation } from "react-i18next";

export default function Strategy() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-black text-white py-24 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-black text-purple-500 mb-12 text-center">
                    {t("strategy")}
                </h1>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-xl leading-relaxed mb-10">
                        {t("strategyIntro")}
                    </p>

                    <ul className="list-disc pl-8 text-lg opacity-90 space-y-4 mb-12">
                        <li>{t("strategyList1")}</li>
                        <li>{t("strategyList2")}</li>
                        <li>{t("strategyList3")}</li>
                        <li>{t("strategyList4")}</li>
                        <li>{t("strategyList5")}</li>
                    </ul>

                    <div className="p-10 border border-cyan-900/40 rounded-2xl bg-black/30 backdrop-blur-sm text-center">
                        <p className="text-2xl font-light italic opacity-90">
                            {t("strategyQuote")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}