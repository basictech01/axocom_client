import { describe, it, expect } from "vitest";
import { parseColTable, buildColTableColumns, type ColTableRow } from "./parseColTable";

describe("parseColTable", () => {
    it("returns empty headers and rows for null", () => {
        expect(parseColTable(null)).toEqual({ headers: [], rows: [] });
    });

    it("returns empty headers and rows for undefined", () => {
        expect(parseColTable(undefined)).toEqual({ headers: [], rows: [] });
    });

    it("returns empty headers and rows for empty array", () => {
        expect(parseColTable([])).toEqual({ headers: [], rows: [] });
    });

    it("parses header row only and returns no data rows", () => {
        const raw = [
            { col_1: "Asset", col_2: "Value", col_3: "" },
        ];
        const result = parseColTable(raw);
        expect(result.headers).toEqual(["Asset", "Value"]);
        expect(result.rows).toEqual([]);
    });

    it("sorts columns by col_ number and skips non-col keys", () => {
        const raw = [
            { col_2: "B", col_1: "A", id: "x" },
            { col_2: "b", col_1: "a", id: "1" },
        ];
        const result = parseColTable(raw);
        expect(result.headers).toEqual(["A", "B"]);
        expect(result.rows).toHaveLength(1);
        expect(result.rows[0].cells).toEqual(["a", "b"]);
    });

    it("marks total row when first cell contains 'total'", () => {
        const raw = [
            { col_1: "Item", col_2: "Amount" },
            { col_1: "Total", col_2: "Rs 1,00,000" },
        ];
        const result = parseColTable(raw);
        expect(result.rows[0].isTotal).toBe(true);
        expect(result.rows[0].cells[1]).toBe("₹1,00,000");
    });

    it("marks total row when first cell contains 'gross total'", () => {
        const raw = [
            { col_1: "Item", col_2: "Amount" },
            { col_1: "Gross Total", col_2: "50,000 50 Thou+" },
        ];
        const result = parseColTable(raw);
        expect(result.rows[0].isTotal).toBe(true);
    });

    it("cleans Nil and empty cells as Nil", () => {
        const raw = [
            { col_1: "A", col_2: "B" },
            { col_1: "", col_2: "Nil" },
        ];
        const result = parseColTable(raw);
        expect(result.rows[0].cells).toEqual(["Nil", "Nil"]);
    });

    it("cleans simple Rs amount", () => {
        const raw = [
            { col_1: "Label", col_2: "Value" },
            { col_1: "X", col_2: "Rs 2,70,004" },
        ];
        const result = parseColTable(raw);
        expect(result.rows[0].cells[1]).toBe("₹2,70,004");
    });

    it("cleans 0*(Value Not Given) as em dash", () => {
        const raw = [
            { col_1: "A", col_2: "B" },
            { col_1: "0*(Value Not Given)", col_2: "x" },
        ];
        const result = parseColTable(raw);
        expect(result.rows[0].cells[0]).toBe("—");
    });

    it("cleans multi-entry cell with description and amount", () => {
        const raw = [
            { col_1: "Bank", col_2: "Amount" },
            {
                col_1: "Item",
                col_2:
                    "SBI Bank No 3052259xxxxx 2,70,004 2 Lacs+ Almora Urban Bank 34,175 34 Thou+",
            },
        ];
        const result = parseColTable(raw);
        expect(result.rows[0].cells[1]).toContain("SBI Bank");
        expect(result.rows[0].cells[1]).toContain("2,70,004");
        expect(result.rows[0].cells[1]).toContain("Almora Urban Bank");
        expect(result.rows[0].cells[1]).toContain("34,175");
        expect(result.rows[0].cells[1]).toContain("\n");
    });

    it("cleans bare amount with suffix (e.g. 50,000 50 Thou+)", () => {
        const raw = [
            { col_1: "A", col_2: "B" },
            { col_1: "X", col_2: "50,000 50 Thou+" },
        ];
        const result = parseColTable(raw);
        expect(result.rows[0].cells[1]).toBe("₹50,000");
    });

    it("uses only columns that have non-empty headers", () => {
        const raw = [
            { col_1: "A", col_2: "", col_3: "C" },
            { col_1: "1", col_2: "2", col_3: "3" },
        ];
        const result = parseColTable(raw);
        expect(result.headers).toEqual(["A", "C"]);
        expect(result.rows[0].cells).toHaveLength(2);
        expect(result.rows[0].cells).toEqual(["1", "3"]);
    });
});

describe("buildColTableColumns", () => {
    it("returns one column per header with correct keys", () => {
        const cols = buildColTableColumns(["Name", "Value"]);
        expect(cols).toHaveLength(2);
        expect(cols[0].key).toBe("col_0");
        expect(cols[1].key).toBe("col_1");
    });

    it("sets header text from headers array", () => {
        const cols = buildColTableColumns(["Asset", "Amount"]);
        expect(cols[0].header).toBe("Asset");
        expect(cols[1].header).toBe("Amount");
    });

    it("sets headerAlign: right for last column, left for others", () => {
        const cols = buildColTableColumns(["A", "B", "C"]);
        expect(cols[0].headerAlign).toBe("left");
        expect(cols[1].headerAlign).toBe("left");
        expect(cols[2].headerAlign).toBe("right");
    });

    it("sets variant: bold for first, right-bold for last, default for middle", () => {
        const cols = buildColTableColumns(["A", "B", "C"]);
        expect(cols[0].variant).toBe("bold");
        expect(cols[1].variant).toBe("default");
        expect(cols[2].variant).toBe("right-bold");
    });

    it("render returns string for single-line cell", () => {
        const cols = buildColTableColumns(["A"]);
        const row: ColTableRow = { cells: ["Hello"], isTotal: false };
        const rendered = cols[0].render(row, 0);
        expect(rendered).toBeDefined();
        // React element; in a real DOM test you'd assert on text content
        expect(rendered).toHaveProperty("type");
    });

    it("render uses row.isTotal for styling", () => {
        const cols = buildColTableColumns(["A"]);
        const totalRow: ColTableRow = { cells: ["Total"], isTotal: true };
        const normalRow: ColTableRow = { cells: ["Normal"], isTotal: false };
        const totalRendered = cols[0].render(totalRow, 0);
        const normalRendered = cols[0].render(normalRow, 0);
        expect(totalRendered).toBeDefined();
        expect(normalRendered).toBeDefined();
        expect(JSON.stringify(totalRendered)).toContain("font-bold");
        expect(JSON.stringify(normalRendered)).not.toContain("font-bold");
    });
});