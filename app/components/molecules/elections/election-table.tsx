import * as React from "react";
import { Card } from "~/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";

export type ElectionTableColumn<T> = {
    key: string;
    label: string;
    align?: "left" | "right" | "center";
    render?: (row: T) => React.ReactNode;
};

type ElectionTableProps<T extends Record<string, unknown>> = {
    title: string;
    subtitle?: string;
    columns: ElectionTableColumn<T>[];
    rows: T[];
    className?: string;
};

export function ElectionTable<T extends Record<string, unknown>>({
    title,
    subtitle,
    columns,
    rows,
    className,
}: ElectionTableProps<T>) {
    return (
        <Card className={`border-none shadow-sm overflow-hidden ${className ?? ""}`}>
            <div className="p-6 flex flex-col gap-0.5 border-b border-gray-100">
                <h3 className="font-bold text-base">{title}</h3>
                {subtitle && (
                    <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
                )}
            </div>
            <Table>
                <TableHeader className="bg-gray-50/50">
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead
                                key={col.key}
                                className={`text-sm ${col.align === "right"
                                        ? "text-right"
                                        : col.align === "center"
                                            ? "text-center"
                                            : ""
                                    }`}
                            >
                                {col.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, rowIdx) => (
                        <TableRow key={rowIdx} className="hover:bg-gray-50/50">
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key}
                                    className={`text-sm py-3 ${col.align === "right"
                                            ? "text-right"
                                            : col.align === "center"
                                                ? "text-center"
                                                : ""
                                        }`}
                                >
                                    {col.render
                                        ? col.render(row)
                                        : (row[col.key] as React.ReactNode)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
