import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    route("login", "routes/login.tsx"),
    // route("signup", "routes/signup.tsx"),
    layout("routes/protected-layout.tsx", [
        index("routes/home.tsx"),
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