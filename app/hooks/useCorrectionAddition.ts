import { useCallback, useState } from "react";
import { useLocation } from "react-router";
import { useMutation } from "@apollo/client/react";
import { SUBMIT_FLAG } from "~/services/flag";

export type CorrectionRow = { field: string; value: string };

export type CorrectionDomain =
    | "candidate"
    | "voter"
    | "party"
    | "election"
    | "constituency"
    | "unknown";

const EMPTY_ROW: CorrectionRow = { field: "", value: "" };

function detectDomain(pathname: string): CorrectionDomain {
    if (pathname.startsWith("/candidates")) return "candidate";
    if (pathname.startsWith("/voters")) return "voter";
    if (pathname.startsWith("/parties")) return "party";
    if (pathname.startsWith("/elections")) return "election";
    if (pathname.startsWith("/constituency")) return "constituency";
    return "unknown";
}

export function useCorrectionAddition(entityId: number) {
    const location = useLocation();
    const domain = detectDomain(location.pathname);
    const url = location.pathname;

    const [rows, setRows] = useState<CorrectionRow[]>([EMPTY_ROW]);
    const [note, setNote] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const addRow = useCallback(() => {
        setRows((r) => [...r, { ...EMPTY_ROW }]);
    }, []);

    const removeRow = useCallback((index: number) => {
        setRows((r) => (r.length <= 1 ? [EMPTY_ROW] : r.filter((_, i) => i !== index)));
    }, []);

    const updateRow = useCallback(
        (index: number, key: keyof CorrectionRow, val: string) => {
            setRows((r) =>
                r.map((row, i) => (i === index ? { ...row, [key]: val } : row))
            );
        },
        []
    );

    const reset = useCallback(() => {
        setRows([EMPTY_ROW]);
        setNote("");
    }, []);

    const [submitFlag, { loading: submitting, error: submitError }] =
        useMutation(SUBMIT_FLAG);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setSubmitted(false);

            const corrections = rows.filter((r) => r.field.trim() || r.value.trim());

            const payload = {
                domain,
                url,
                entity_id: entityId,
                corrections,
                note: note.trim(),
            };

            try {
                await submitFlag({ variables: { data: JSON.stringify(payload) } });
                reset();
                setSubmitted(true);
            } catch {
                // submitError from useMutation covers this
            }
        },
        [domain, url, entityId, rows, note, submitFlag, reset]
    );

    return {
        rows,
        addRow,
        removeRow,
        updateRow,
        note,
        setNote,
        handleSubmit,
        submitting,
        submitError: submitError ?? null,
        submitted,
    };
}
