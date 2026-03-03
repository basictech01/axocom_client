export function formatDateRange(dates: string[]): string {
    if (!dates.length) return "—";
    const sorted = [...dates].sort();
    const fmt = (d: string) =>
        new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    const start = fmt(sorted[0]);
    const end = fmt(sorted[sorted.length - 1]);
    return start === end ? start : `${start} – ${end}`;
}