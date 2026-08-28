export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type RefundStatus = "open" | "in_review" | "approved" | "rejected" | "refunded";

export type RefundRegistrationType = "delegate_pass" | "nomination";

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
  totalAmount: number;
  currency: string;
  gstNumber: string | null;
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
  passName: string;
  audience: string;
  quantity: number;
  unitAmount: number;
  gstNumber?: string | null;
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
  planName: string;
  totalAmount: number;
  contactConsent: boolean;
}

export interface CreateRefundRequestInput {
  fullName: string;
  email: string;
  phone: string;
  registrationType: RefundRegistrationType;
  registrationId?: string | null;
  paymentReference?: string | null;
  reason: string;
}

export interface RegistrationResult {
  registrationId: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
}
