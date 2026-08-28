import { describe, it, expect } from "vitest";
import { toPaise, fromPaise, formatRupees, formatPaise, calculateGst, formatGstRate } from "./money";

describe("toPaise", () => {
    it("converts the summit pass and nomination prices", () => {
        expect(toPaise(1499)).toBe(149900);
        expect(toPaise(2999)).toBe(299900);
        expect(toPaise(7500)).toBe(750000);
        expect(toPaise(14999)).toBe(1499900);
        expect(toPaise(24999)).toBe(2499900);
        expect(toPaise(9999)).toBe(999900);
        expect(toPaise(19999)).toBe(1999900);
        expect(toPaise(34999)).toBe(3499900);
    });

    /**
     * Float multiplication alone gives 2999 * 100 = 299900.00000000006 for some
     * values, and the API rejects a non-integer amount, so the rounding here is
     * load-bearing rather than cosmetic.
     */
    it("always returns an integer, including for fractional rupees", () => {
        for (const rupees of [0.1, 1.005, 19.99, 2999.99, 1234.567]) {
            expect(Number.isInteger(toPaise(rupees))).toBe(true);
        }
        expect(toPaise(19.99)).toBe(1999);
        expect(toPaise(0.1)).toBe(10);
    });

    it("handles zero", () => {
        expect(toPaise(0)).toBe(0);
    });
});

describe("fromPaise", () => {
    it("inverts toPaise for whole rupee amounts", () => {
        for (const rupees of [1499, 2999, 7500, 14999, 24999]) {
            expect(fromPaise(toPaise(rupees))).toBe(rupees);
        }
    });

    it("converts a paise amount back to rupees", () => {
        expect(fromPaise(599800)).toBe(5998);
        expect(fromPaise(0)).toBe(0);
    });
});

describe("formatRupees", () => {
    it("formats with the rupee sign and en-IN grouping", () => {
        expect(formatRupees(1499)).toBe("₹1,499");
        expect(formatRupees(24999)).toBe("₹24,999");
        expect(formatRupees(100000)).toBe("₹1,00,000");
    });

    it("handles zero", () => {
        expect(formatRupees(0)).toBe("₹0");
    });
});

describe("formatPaise", () => {
    it("renders an API amount as a rupee string", () => {
        expect(formatPaise(299900)).toBe("₹2,999");
        expect(formatPaise(599800)).toBe("₹5,998");
        expect(formatPaise(1999900)).toBe("₹19,999");
    });

    it("renders a two pass total the same way the admin list does", () => {
        expect(formatPaise(toPaise(2999) * 2)).toBe("₹5,998");
    });
});

describe("calculateGst (display mirror of the server calculation)", () => {
    it("adds 18% per pass and multiplies by quantity", () => {
        const gst = calculateGst(2999, 2);
        expect(gst.subtotalAmount).toBe(599800);
        expect(gst.unitGstAmount).toBe(53982);
        expect(gst.gstAmount).toBe(107964);
        expect(gst.totalAmount).toBe(707764);
        expect(formatPaise(gst.totalAmount)).toBe("₹7,077.64");
    });

    it("charges GST per pass, not on the lumped subtotal", () => {
        const gst = calculateGst(2999, 3);
        expect(gst.gstAmount).toBe(53982 * 3);
        expect(gst.totalAmount).toBe((299900 + 53982) * 3);
    });

    it("keeps total equal to subtotal plus GST for every listed price", () => {
        for (const price of [1499, 2999, 7500, 14999, 24999, 9999, 19999, 34999]) {
            for (const quantity of [1, 2, 10]) {
                const gst = calculateGst(price, quantity);
                expect(gst.subtotalAmount + gst.gstAmount).toBe(gst.totalAmount);
                expect(Number.isInteger(gst.totalAmount)).toBe(true);
            }
        }
    });

    it("matches the nomination plan totals", () => {
        expect(calculateGst(9999, 1).totalAmount).toBe(1179882);
        expect(calculateGst(19999, 1).totalAmount).toBe(2359882);
        expect(calculateGst(34999, 1).totalAmount).toBe(4129882);
    });
});

describe("formatGstRate", () => {
    it("renders the rate", () => {
        expect(formatGstRate(1800)).toBe("18%");
        expect(formatGstRate(500)).toBe("5%");
    });
});
