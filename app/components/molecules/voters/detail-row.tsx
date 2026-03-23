export function DetailRow({
    label,
    value,
    className = "",
}: {
    label: string;
    value: string;
    className?: string;
}) {
    return (
        <div className={className}>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {label}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
        </div>
    );
}