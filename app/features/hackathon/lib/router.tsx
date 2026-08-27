import type { ComponentProps } from "react";
import {
  Link as ReactRouterLink,
  useLocation as useReactRouterLocation,
  useMatch,
  useNavigate,
} from "react-router";
import { HACKATHON_BASE_PATH } from "~/features/hackathon/lib/public-routes";

export { HACKATHON_BASE_PATH } from "~/features/hackathon/lib/public-routes";

function resolveHackathonPath(path: string): string {
  if (path === "/") return HACKATHON_BASE_PATH;
  if (path.startsWith(HACKATHON_BASE_PATH)) return path;
  return `${HACKATHON_BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

type LinkProps = Omit<ComponentProps<typeof ReactRouterLink>, "to"> & {
  href: string;
};

export function Link({ href, ...props }: LinkProps) {
  return <ReactRouterLink to={resolveHackathonPath(href)} {...props} />;
}

export function useLocation(): [string, (path: string) => void] {
  const { pathname } = useReactRouterLocation();
  const navigate = useNavigate();
  const relativePath = pathname.startsWith(HACKATHON_BASE_PATH)
    ? pathname.slice(HACKATHON_BASE_PATH.length) || "/"
    : pathname;

  return [relativePath, (path) => navigate(resolveHackathonPath(path))];
}

export function useRoute<Params extends Record<string, string>>(pattern: string): [boolean, Params | null] {
  const match = useMatch(resolveHackathonPath(pattern));
  return [Boolean(match), (match?.params as Params | undefined) ?? null];
}
