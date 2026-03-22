import * as React from "react";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { useCorrectionAddition } from "~/hooks/useCorrectionAddition";

export interface SuggestCorrectionProps {
    /** ID of the entity being corrected (voter id, candidate id, etc.). */
    entityId: number;
    className?: string;
}

export const SuggestCorrection: React.FC<SuggestCorrectionProps> = ({
    entityId,
    className = "",
}) => {
    const {
        rows,
        addRow,
        removeRow,
        updateRow,
        note,
        setNote,
        handleSubmit,
        submitting,
        submitError,
        submitted,
    } = useCorrectionAddition(entityId);

    return (
        <Card
            className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
        >
            <CardHeader className="space-y-2 px-8 pb-2 pt-8 sm:px-10 lg:px-12">
                <CardTitle className="text-xl font-bold text-slate-900">
                    Suggest a Correction / Add new data
                </CardTitle>
                <p className="text-sm leading-relaxed text-slate-500">
                    Flag incorrect data or add missing information for this record.
                    The page URL and record category are captured automatically.
                </p>
            </CardHeader>

            <CardContent className="px-8 pb-8 sm:px-10 lg:px-12 lg:pb-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Correction rows */}
                    <div className="space-y-4">
                        {rows.map((row, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4"
                            >
                                <div className="flex-1 space-y-1.5 min-w-0">
                                    <label className="text-sm font-semibold text-slate-600">
                                        Field name
                                    </label>
                                    <Input
                                        value={row.field}
                                        onChange={(e) =>
                                            updateRow(i, "field", e.target.value)
                                        }
                                        placeholder="e.g. Name, Age, Address…"
                                        className="h-10 border-slate-200 bg-white text-sm"
                                    />
                                </div>
                                <div className="flex-[2] space-y-1.5 min-w-0">
                                    <label className="text-sm font-semibold text-slate-600">
                                        Suggested value
                                    </label>
                                    <Input
                                        value={row.value}
                                        onChange={(e) =>
                                            updateRow(i, "value", e.target.value)
                                        }
                                        placeholder="Enter corrected value"
                                        className="h-10 border-slate-200 bg-white text-sm"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 shrink-0 text-slate-400 hover:text-red-600"
                                    onClick={() => removeRow(i)}
                                    aria-label="Remove row"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Note — optional */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-600">
                            Note{" "}
                            <span className="font-normal text-slate-400">(optional)</span>
                        </label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Add any additional context…"
                            rows={3}
                            className="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-10 px-4 text-sm font-semibold"
                            onClick={addRow}
                        >
                            <Plus className="mr-1.5 h-4 w-4" />
                            Add row
                        </Button>
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="h-10 px-4 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {submitting ? "Submitting…" : "Submit"}
                        </Button>
                    </div>

                    {/* Feedback */}
                    {submitted && (
                        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            Submission saved. Thank you!
                        </div>
                    )}
                    {submitError && (
                        <p className="text-sm font-medium text-red-700">
                            Failed to submit: {submitError.message}
                        </p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};
