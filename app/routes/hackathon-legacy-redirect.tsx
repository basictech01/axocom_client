import { redirect } from "react-router";

export function clientLoader() {
  return redirect("/UKISHackathon");
}

export default function LegacyHackathonRedirect() {
  return null;
}