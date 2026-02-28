import { Outlet, useParams } from "react-router";
import { useEffect } from "react";
import i18n from "~/i18n/config";

export default function AppLayout() {
    const { lang } = useParams();

    const currentLang = lang && ["es", "zh"].includes(lang) ? lang : "en";

    useEffect(() => {
        if (i18n.language !== currentLang) {
            i18n.changeLanguage(currentLang);
        }
    }, [currentLang]);

    return <Outlet />;
}