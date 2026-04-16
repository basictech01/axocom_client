import type { Route } from "./+types/home";
import ConstituencyPage from "./constituency";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Axocom Political Dashboard" },
    { name: "description", content: "Welcome to Axocom Political Dashboard!" },
  ];
}

export default function Home() {
  return <ConstituencyPage />;
}
