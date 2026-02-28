import { useTranslation } from "react-i18next";

export default function Contact() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-black text-white py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-6xl md:text-8xl font-black text-purple-500 mb-12">
                    {t("contact")}
                </h1>

                <p className="text-2xl mb-16 opacity-90 max-w-3xl mx-auto">
                    {t("getInTouch")}
                </p>

                <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
                    <div className="p-10 border border-cyan-900/40 rounded-xl bg-black/30 backdrop-blur-sm">
                        <h3 className="text-3xl font-bold text-cyan-400 mb-6">{t("email")}</h3>
                        <p className="text-xl">contact@20y.org</p>
                    </div>

                    <div className="p-10 border border-purple-900/40 rounded-xl bg-black/30 backdrop-blur-sm">
                        <h3 className="text-3xl font-bold text-purple-400 mb-6">{t("telegram")}</h3>
                        <p className="text-xl">@2ØY_official</p>
                    </div>
                </div>
            </div>
        </div>
    );
}