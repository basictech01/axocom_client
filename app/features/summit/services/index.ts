import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
  CreateRefundRequestInput,
  PaymentOrder,
  PaymentRegistrationType,
  PaymentVerificationResult,
  VerifyPaymentInput,
  DelegatePassRegistration,
  NominationRegistration,
  Pagination,
  PaymentStatus,
  RefundRegistrationType,
  RefundRequest,
  RefundRequestMessage,
  RefundStatus,
  RefundTicket,
  RegisterDelegatePassInput,
  RegisterNominationInput,
  RegistrationResult,
} from "~/features/summit/types";

/* -------------------------------------------------------------------------- */
/* Public registration                                                         */
/* -------------------------------------------------------------------------- */

export const REGISTER_DELEGATE_PASS_MUTATION: TypedDocumentNode<
  { registerDelegatePass: RegistrationResult },
  { input: RegisterDelegatePassInput }
> = gql`
  mutation RegisterDelegatePass($input: RegisterDelegatePassInput!) {
    registerDelegatePass(input: $input) {
      registrationId
      subtotalAmount
      gstAmount
      gstRateBps
      totalAmount
      paymentStatus
    }
  }
`;

export const REGISTER_NOMINATION_MUTATION: TypedDocumentNode<
  { registerNomination: RegistrationResult },
  { input: RegisterNominationInput }
> = gql`
  mutation RegisterNomination($input: RegisterNominationInput!) {
    registerNomination(input: $input) {
      registrationId
      subtotalAmount
      gstAmount
      gstRateBps
      totalAmount
      paymentStatus
    }
  }
`;

/* -------------------------------------------------------------------------- */
/* Refund tickets - public                                                     */
/* -------------------------------------------------------------------------- */

export const CREATE_REFUND_REQUEST_MUTATION: TypedDocumentNode<
  { createRefundRequest: { ticketId: string; status: RefundStatus } },
  { input: CreateRefundRequestInput }
> = gql`
  mutation CreateRefundRequest($input: CreateRefundRequestInput!) {
    createRefundRequest(input: $input) {
      ticketId
      status
    }
  }
`;

export const REFUND_TICKET_QUERY: TypedDocumentNode<
  { refundTicket: RefundTicket | null },
  { ticketId: string; email: string }
> = gql`
  query RefundTicket($ticketId: ID!, $email: String!) {
    refundTicket(ticketId: $ticketId, email: $email) {
      id
      fullName
      registrationType
      registrationId
      paymentReference
      status
      createdAt
      updatedAt
      resolvedAt
      messages {
        id
        author
        message
        createdAt
      }
    }
  }
`;

export const REPLY_TO_REFUND_TICKET_MUTATION: TypedDocumentNode<
  { replyToRefundTicket: RefundRequestMessage },
  { ticketId: string; email: string; message: string }
> = gql`
  mutation ReplyToRefundTicket($ticketId: ID!, $email: String!, $message: String!) {
    replyToRefundTicket(ticketId: $ticketId, email: $email, message: $message) {
      id
      author
      message
      createdAt
    }
  }
`;

/* -------------------------------------------------------------------------- */
/* Admin                                                                       */
/* -------------------------------------------------------------------------- */

export const ADMIN_DELEGATE_PASS_REGISTRATIONS_QUERY: TypedDocumentNode<
  { adminDelegatePassRegistrations: { data: DelegatePassRegistration[]; pagination: Pagination } },
  { paymentStatus?: PaymentStatus; search?: string; page?: number; limit?: number }
> = gql`
  query AdminDelegatePassRegistrations(
    $paymentStatus: PaymentStatus
    $search: String
    $page: Int
    $limit: Int
  ) {
    adminDelegatePassRegistrations(
      paymentStatus: $paymentStatus
      search: $search
      page: $page
      limit: $limit
    ) {
      data {
        id
        fullName
        designation
        organisation
        email
        phone
        passName
        audience
        quantity
        unitAmount
        unitGstAmount
        subtotalAmount
        gstRateBps
        gstAmount
        totalAmount
        currency
        gstNumber
        contactConsentAt
        paymentStatus
        razorpayOrderId
        razorpayPaymentId
        paidAt
        adminNote
        reviewedAt
        reviewedByAdminId
        createdAt
        updatedAt
      }
      pagination {
        total
        page
        limit
        totalPages
      }
    }
  }
`;

export const ADMIN_NOMINATION_REGISTRATIONS_QUERY: TypedDocumentNode<
  { adminNominationRegistrations: { data: NominationRegistration[]; pagination: Pagination } },
  { paymentStatus?: PaymentStatus; search?: string; page?: number; limit?: number }
> = gql`
  query AdminNominationRegistrations(
    $paymentStatus: PaymentStatus
    $search: String
    $page: Int
    $limit: Int
  ) {
    adminNominationRegistrations(
      paymentStatus: $paymentStatus
      search: $search
      page: $page
      limit: $limit
    ) {
      data {
        id
        nomineeName
        organisation
        designation
        email
        phone
        website
        achievements
        planName
        baseAmount
        gstRateBps
        gstAmount
        totalAmount
        currency
        contactConsentAt
        paymentStatus
        razorpayOrderId
        razorpayPaymentId
        paidAt
        adminNote
        reviewedAt
        reviewedByAdminId
        createdAt
        updatedAt
      }
      pagination {
        total
        page
        limit
        totalPages
      }
    }
  }
`;

export const ADMIN_REFUND_REQUESTS_QUERY: TypedDocumentNode<
  { adminRefundRequests: { data: RefundRequest[]; pagination: Pagination } },
  {
    status?: RefundStatus;
    registrationType?: RefundRegistrationType;
    search?: string;
    page?: number;
    limit?: number;
  }
> = gql`
  query AdminRefundRequests(
    $status: RefundStatus
    $registrationType: RefundRegistrationType
    $search: String
    $page: Int
    $limit: Int
  ) {
    adminRefundRequests(
      status: $status
      registrationType: $registrationType
      search: $search
      page: $page
      limit: $limit
    ) {
      data {
        id
        fullName
        email
        phone
        registrationType
        registrationId
        paymentReference
        reason
        status
        resolvedAt
        reviewedByAdminId
        createdAt
        updatedAt
        messages {
          id
          author
          message
          createdAt
        }
      }
      pagination {
        total
        page
        limit
        totalPages
      }
    }
  }
`;

export const UPDATE_DELEGATE_PASS_PAYMENT_STATUS_MUTATION: TypedDocumentNode<
  { updateDelegatePassPaymentStatus: boolean },
  { id: string; input: { paymentStatus: PaymentStatus; adminNote?: string | null } }
> = gql`
  mutation UpdateDelegatePassPaymentStatus($id: ID!, $input: UpdatePaymentStatusInput!) {
    updateDelegatePassPaymentStatus(id: $id, input: $input)
  }
`;

export const UPDATE_NOMINATION_PAYMENT_STATUS_MUTATION: TypedDocumentNode<
  { updateNominationPaymentStatus: boolean },
  { id: string; input: { paymentStatus: PaymentStatus; adminNote?: string | null } }
> = gql`
  mutation UpdateNominationPaymentStatus($id: ID!, $input: UpdatePaymentStatusInput!) {
    updateNominationPaymentStatus(id: $id, input: $input)
  }
`;

export const REPLY_TO_REFUND_REQUEST_MUTATION: TypedDocumentNode<
  { replyToRefundRequest: RefundRequestMessage },
  { id: string; message: string }
> = gql`
  mutation ReplyToRefundRequest($id: ID!, $message: String!) {
    replyToRefundRequest(id: $id, message: $message) {
      id
      author
      message
      createdAt
    }
  }
`;

export const UPDATE_REFUND_REQUEST_STATUS_MUTATION: TypedDocumentNode<
  { updateRefundRequestStatus: boolean },
  { id: string; status: RefundStatus }
> = gql`
  mutation UpdateRefundRequestStatus($id: ID!, $status: RefundStatus!) {
    updateRefundRequestStatus(id: $id, status: $status)
  }
`;

/* -------------------------------------------------------------------------- */
/* Payments                                                                    */
/* -------------------------------------------------------------------------- */

export const CREATE_PAYMENT_ORDER_MUTATION: TypedDocumentNode<
  { createPaymentOrder: PaymentOrder },
  { registrationType: PaymentRegistrationType; registrationId: string }
> = gql`
  mutation CreatePaymentOrder(
    $registrationType: PaymentRegistrationType!
    $registrationId: ID!
  ) {
    createPaymentOrder(
      registrationType: $registrationType
      registrationId: $registrationId
    ) {
      orderId
      amount
      currency
      keyId
      registrationId
      registrationType
      prefillName
      prefillEmail
      prefillContact
    }
  }
`;

export const VERIFY_PAYMENT_MUTATION: TypedDocumentNode<
  { verifyPayment: PaymentVerificationResult },
  { input: VerifyPaymentInput }
> = gql`
  mutation VerifyPayment($input: VerifyPaymentInput!) {
    verifyPayment(input: $input) {
      verified
      registrationId
      paymentStatus
    }
  }
`;
