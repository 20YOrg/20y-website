import { useTranslation } from "react-i18next";

export default function Investors() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-black text-white py-24 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-6xl md:text-8xl font-black text-cyan-400 mb-12">
                    {t("investors")}
                </h1>

                <div className="max-w-2xl mx-auto">
                    <p className="text-2xl mb-12 opacity-90">
                        {t("portalDesc")}
                    </p>

                    <div className="p-12 border border-cyan-900/50 rounded-2xl bg-black/30 backdrop-blur-sm">
                        <h2 className="text-4xl font-bold mb-8">{t("login")}</h2>
                        <input
                            type="password"
                            placeholder={t("accessCode")}
                            className="w-full max-w-md mx-auto block p-5 bg-black border border-cyan-800 rounded-lg text-white text-xl mb-6 focus:outline-none focus:border-cyan-400"
                        />
                        <button className="px-12 py-5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full text-xl font-bold hover:brightness-110 transition">
                            {t("enterPortal")}
                        </button>
                        <p className="mt-8 text-gray-400 text-sm">
                            {t("accessInquiries")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}