import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // English (default) - clean URLs
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("strategy", "routes/strategy.tsx"),
    route("team", "routes/team.tsx"),
    route("reports", "routes/reports.tsx"),
    route("investors", "routes/investors.tsx"),
    route("contact", "routes/contact.tsx"),

    // Spanish - prefixed with custom IDs
    route("es", "routes/home.tsx", { id: "es-home" }),
    route("es/about", "routes/about.tsx", { id: "es-about" }),
    route("es/strategy", "routes/strategy.tsx", { id: "es-strategy" }),
    route("es/team", "routes/team.tsx", { id: "es-team" }),
    route("es/reports", "routes/reports.tsx", { id: "es-reports" }),
    route("es/investors", "routes/investors.tsx", { id: "es-investors" }),
    route("es/contact", "routes/contact.tsx", { id: "es-contact" }),

    // Chinese - prefixed with custom IDs
    route("zh", "routes/home.tsx", { id: "zh-home" }),
    route("zh/about", "routes/about.tsx", { id: "zh-about" }),
    route("zh/strategy", "routes/strategy.tsx", { id: "zh-strategy" }),
    route("zh/team", "routes/team.tsx", { id: "zh-team" }),
    route("zh/reports", "routes/reports.tsx", { id: "zh-reports" }),
    route("zh/investors", "routes/investors.tsx", { id: "zh-investors" }),
    route("zh/contact", "routes/contact.tsx", { id: "zh-contact" }),
] satisfies RouteConfig;