import { useTranslation } from "react-i18next";

export default function Reports() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-black text-white py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-black text-purple-500 mb-16 text-center">
                    {t("reports")}
                </h1>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="p-8 border border-cyan-900/40 rounded-xl bg-black/30 backdrop-blur-sm">
                        <h3 className="text-3xl font-bold text-cyan-400 mb-6">{t("videoUpdatesTitle")}</h3>
                        <p className="text-lg opacity-90 mb-6">
                            {t("videoDesc")}
                        </p>
                        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mt-6">
                            <p className="text-gray-400">[Video Player Placeholder]</p>
                        </div>
                    </div>

                    <div className="p-8 border border-purple-900/40 rounded-xl bg-black/30 backdrop-blur-sm">
                        <h3 className="text-3xl font-bold text-purple-400 mb-6">{t("researchReportsTitle")}</h3>
                        <p className="text-lg opacity-90 mb-6">
                            {t("researchDesc")}
                        </p>
                        <div className="space-y-4 mt-6">
                            <div className="p-4 bg-black/50 rounded-lg border border-gray-800">
                                {t("q4Report")} – [PDF]
                            </div>
                            <div className="p-4 bg-black/50 rounded-lg border border-gray-800">
                                {t("defiReport")} – [PDF]
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}