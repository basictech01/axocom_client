import { Building2, ExternalLink } from "lucide-react";
import {
  getProblemOwner,
  type ProblemOwnerId,
} from "~/features/hackathon/lib/problem-owners";

interface ProblemOwnerProps {
  ownerId: ProblemOwnerId;
  linked?: boolean;
}

export function ProblemOwner({ ownerId, linked = false }: ProblemOwnerProps) {
  const owner = getProblemOwner(ownerId);
  const labelClasses =
    "inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1.5 text-xs font-medium text-primary";

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2 text-xs font-medium text-muted-foreground">
        <Building2 className="w-3.5 h-3.5 text-brand-ai-azure" aria-hidden />
        <span>Problem Owner</span>
      </div>
      {linked && owner.url ? (
        <a
          href={owner.url}
          target="_blank"
          rel="noreferrer"
          className={`${labelClasses} hover:border-primary/40 hover:bg-primary/10 transition-colors`}
        >
          {owner.name}
          <ExternalLink className="w-3 h-3 shrink-0" aria-hidden />
        </a>
      ) : (
        <span title={owner.name} className={`${labelClasses} text-foreground`}>
          {owner.name}
        </span>
      )}
      {linked ? (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          UKIS can help facilitate an introduction and conversation with this problem owner.
        </p>
      ) : null}
    </div>
  );
}