export function formatLakh(n: number): string {
    if (n >= 1e7) return `${(n / 1e7).toFixed(1)} Cr`;
    if (n >= 1e5) return `${(n / 1e5).toFixed(1)} L`;
    return n.toLocaleString("en-IN");
}