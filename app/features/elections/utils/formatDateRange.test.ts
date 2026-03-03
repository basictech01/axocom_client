import { describe, it, expect } from "vitest";
import { formatDateRange } from "./formatDateRange";

describe("formatDateRange", () => {
    it("returns em dash for empty input", () => {
        expect(formatDateRange([])).toBe("—");
    });

    it("returns a single formatted date when all dates resolve to same day", () => {
        expect(formatDateRange(["2024-05-01"])).toBe("1 May 2024");
        expect(formatDateRange(["2024-05-01", "2024-05-01"])).toBe("1 May 2024");
    });

    it("sorts inputs and returns start – end for multiple distinct dates", () => {
        expect(formatDateRange(["2024-05-03", "2024-05-01"])).toBe("1 May 2024 – 3 May 2024");
    });

    it("works with ISO datetimes too", () => {
        expect(
            formatDateRange([
                "2024-05-01T10:00:00.000Z",
                "2024-05-03T10:00:00.000Z",
            ])
        ).toContain("May 2024");
    });
});