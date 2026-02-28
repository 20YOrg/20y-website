import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-black text-white py-24 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-black text-cyan-400 mb-12 text-center">
                    {t("about")}
                </h1>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-xl leading-relaxed mb-10">
                        {t("aboutIntro1")}
                    </p>

                    <p className="text-xl leading-relaxed mb-10">
                        {t("aboutIntro2")}
                    </p>

                    <div className="grid md:grid-cols-2 gap-12 mt-16">
                        <div className="p-8 border border-cyan-900/40 rounded-xl bg-black/30 backdrop-blur-sm">
                            <h3 className="text-3xl font-bold text-purple-400 mb-6">
                                {t("visionTitle")}
                            </h3>
                            <p className="text-lg opacity-90">
                                {t("visionText")}
                            </p>
                        </div>

                        <div className="p-8 border border-cyan-900/40 rounded-xl bg-black/30 backdrop-blur-sm">
                            <h3 className="text-3xl font-bold text-cyan-400 mb-6">
                                {t("coreBeliefTitle")}
                            </h3>
                            <p className="text-lg opacity-90">
                                {t("coreBeliefText")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}