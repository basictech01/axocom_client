import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    route("login", "routes/login.tsx"),
    route("careers", "routes/careers.tsx"),
    route("election-management", "routes/election-page.tsx"),
    route("nprweek2026", "routes/nprweek2026.tsx"),
    route("DevbhoomiAISummit", "routes/DevbhoomiAISummit.tsx"),
    route("UISHackathon", "routes/UISHackathon.tsx"),
    index("routes/app.tsx"),
    // route("signup", "routes/signup.tsx"),
    layout("routes/protected-layout.tsx", [
        route("dashboard", "routes/home.tsx"),
        route("candidates", "routes/candidates.tsx"),
        route("voters", "routes/voter-list.tsx"),
        route("voters/:id", "routes/voter-profile.tsx"),
        route("constituency", "routes/constituency.tsx"),
        route("candidates/:id", "routes/candidate-profile.tsx"),
        route("elections", "routes/election.tsx"),
        route("parties", "routes/parties.tsx"),
        route("parties/:id", "routes/party-profile.tsx"),
    ]),
] satisfies RouteConfig;