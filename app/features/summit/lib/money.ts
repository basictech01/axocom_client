/** Amounts cross the API in paise, matching Razorpay. */

export const toPaise = (rupees: number) => Math.round(rupees * 100);

export const fromPaise = (paise: number) => paise / 100;

export const formatRupees = (rupees: number) => `₹${rupees.toLocaleString("en-IN")}`;

export const formatPaise = (paise: number) => formatRupees(fromPaise(paise));

/**
 * Display mirror of the server's GST calculation. The server recomputes it on
 * submit and its figure is charged, so the two must agree.
 */
export const DEFAULT_GST_RATE_BPS = 1800;

export function calculateGst(unitRupees: number, quantity: number, gstRateBps = DEFAULT_GST_RATE_BPS) {
  const unitAmount = toPaise(unitRupees);
  const unitGstAmount = Math.round((unitAmount * gstRateBps) / 10000);
  return {
    unitAmount,
    unitGstAmount,
    subtotalAmount: unitAmount * quantity,
    gstAmount: unitGstAmount * quantity,
    totalAmount: (unitAmount + unitGstAmount) * quantity,
    gstRateBps,
  };
}

export const formatGstRate = (gstRateBps: number) => {
  const percent = gstRateBps / 100;
  return `${Number.isInteger(percent) ? percent : percent.toFixed(2).replace(/0$/, "")}%`;
};
