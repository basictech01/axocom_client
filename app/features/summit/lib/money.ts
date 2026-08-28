/**
 * Amounts cross the API in the smallest currency unit (paise), matching what
 * Razorpay expects, so no rounding can happen in transit.
 */

export const toPaise = (rupees: number) => Math.round(rupees * 100);

export const fromPaise = (paise: number) => paise / 100;

export const formatRupees = (rupees: number) => `₹${rupees.toLocaleString("en-IN")}`;

export const formatPaise = (paise: number) => formatRupees(fromPaise(paise));
