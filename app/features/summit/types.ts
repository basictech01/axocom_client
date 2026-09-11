export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type RefundStatus =
  | "open"
  | "in_review"
  | "approved"
  | "rejected"
  | "refunded"
  | "resolved";

export type SupportRequestType = "refund" | "payment_not_reflected" | "other";

/**
 * The one definition of which thing a payment, refund or query belongs to.
 * Mirrors the RegistrationType enum in the API schema.
 */
export const REGISTRATION_TYPE = {
  DELEGATE_PASS: "delegate_pass",
  NOMINATION: "nomination",
} as const;

export type RegistrationType = (typeof REGISTRATION_TYPE)[keyof typeof REGISTRATION_TYPE];

/** Alias kept so refund code reads in its own terms; one definition underneath. */
export type RefundRegistrationType = RegistrationType;

export type RefundMessageAuthor = "user" | "admin";

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DelegatePassRegistration {
  id: string;
  fullName: string;
  designation: string;
  organisation: string;
  email: string;
  phone: string;
  passName: string;
  audience: string;
  quantity: number;
  unitAmount: number;
  unitGstAmount: number;
  subtotalAmount: number;
  gstRateBps: number;
  gstAmount: number;
  totalAmount: number;
  currency: string;
  gstNumber: string | null;
  startupDetails: string | null;
  contactConsentAt: string;
  paymentStatus: PaymentStatus;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  paidAt: string | null;
  adminNote: string | null;
  reviewedAt: string | null;
  reviewedByAdminId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface NominationRegistration {
  id: string;
  nomineeName: string;
  organisation: string;
  designation: string;
  email: string;
  phone: string;
  website: string | null;
  achievements: string;
  planName: string;
  baseAmount: number;
  gstRateBps: number;
  gstAmount: number;
  totalAmount: number;
  currency: string;
  contactConsentAt: string;
  paymentStatus: PaymentStatus;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  paidAt: string | null;
  adminNote: string | null;
  reviewedAt: string | null;
  reviewedByAdminId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface RefundRequestMessage {
  id: string;
  author: RefundMessageAuthor;
  message: string;
  createdAt: string;
}

export interface RefundRequest {
  id: string;
  requestType: SupportRequestType;
  fullName: string;
  email: string;
  phone: string;
  registrationType: RefundRegistrationType;
  registrationId: string | null;
  paymentReference: string | null;
  reason: string;
  status: RefundStatus;
  resolvedAt: string | null;
  reviewedByAdminId: number | null;
  createdAt: string;
  updatedAt: string;
  messages: RefundRequestMessage[];
}

/** Public ticket view - no email/phone/reviewer fields. */
export interface RefundTicket {
  id: string;
  requestType: SupportRequestType;
  fullName: string;
  registrationType: RefundRegistrationType;
  registrationId: string | null;
  paymentReference: string | null;
  status: RefundStatus;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  messages: RefundRequestMessage[];
}

export interface RegisterDelegatePassInput {
  fullName: string;
  designation: string;
  organisation: string;
  email: string;
  phone: string;
  /** Must match a pass name on the server's price list. */
  passName: string;
  quantity: number;
  gstNumber?: string | null;
  startupDetails?: string | null;
  contactConsent: boolean;
}

export interface RegisterNominationInput {
  nomineeName: string;
  organisation: string;
  designation: string;
  email: string;
  phone: string;
  website?: string | null;
  achievements: string;
  /** Must match a plan name on the server's price list. */
  planName: string;
  contactConsent: boolean;
}

export interface CreateRefundRequestInput {
  requestType: SupportRequestType;
  fullName: string;
  email: string;
  phone: string;
  registrationType: RefundRegistrationType;
  /** Required, and must belong to the email on the request. */
  registrationId: string;
  paymentReference?: string | null;
  reason: string;
}

export interface RegistrationResult {
  registrationId: string;
  subtotalAmount: number;
  gstAmount: number;
  gstRateBps: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
}

/** Alias kept so payment code reads in its own terms; one definition underneath. */
export type PaymentRegistrationType = RegistrationType;

export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  registrationId: string;
  registrationType: PaymentRegistrationType;
  prefillName: string;
  prefillEmail: string;
  prefillContact: string;
}

export interface PaymentVerificationResult {
  verified: boolean;
  registrationId: string;
  paymentStatus: PaymentStatus;
  razorpayPaymentId: string | null;
  razorpayOrderId: string | null;
}

export interface GatewayPayment {
  paymentId: string;
  status: string;
  amount: number;
  method: string | null;
  email: string | null;
  contact: string | null;
}

export interface PaymentReconciliation {
  registrationId: string;
  ourPaymentStatus: PaymentStatus;
  ourAmount: number;
  orderId: string;
  orderStatus: string;
  orderAmount: number;
  amountPaid: number;
  payments: GatewayPayment[];
  capturedPayment: GatewayPayment | null;
  settleable: boolean;
}

export interface PaymentReceipt {
  registrationId: string;
  razorpayPaymentId: string | null;
  razorpayOrderId: string | null;
}

export interface VerifyPaymentInput {
  registrationType: PaymentRegistrationType;
  registrationId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}
