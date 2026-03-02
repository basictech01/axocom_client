import { describe, it, expect } from "vitest";
import { formatLakh } from "./formatLakh";

describe("formatLakh", () => {
    it("formats >= 1e7 as Crore with 1 decimal", () => {
        expect(formatLakh(10_000_000)).toBe("1.0 Cr");
        expect(formatLakh(12_300_000)).toBe("1.2 Cr");
    });

    it("formats >= 1e5 and < 1e7 as Lakh with 1 decimal", () => {
        expect(formatLakh(100_000)).toBe("1.0 L");
        expect(formatLakh(250_000)).toBe("2.5 L");
        expect(formatLakh(9_999_999)).toBe("100.0 L"); // 9,999,999 / 1e5 = 99.99999 -> 100.0
    });

    it("formats < 1e5 with en-IN grouping", () => {
        expect(formatLakh(0)).toBe("0");
        expect(formatLakh(999)).toBe("999");
        expect(formatLakh(12_345)).toBe("12,345");
        expect(formatLakh(99_999)).toBe("99,999");
    });

    it("handles negative numbers via locale formatting", () => {
        expect(formatLakh(-12_345)).toBe("-12,345");
    });
});